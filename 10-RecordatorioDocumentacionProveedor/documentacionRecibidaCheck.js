// Variable para almacenar el resultado de la consulta.
var resultado = 0;
var idProveedor = SourceIndexData.GetField("idProveedor");
var nExpediente = SourceIndexData.GetField("nExpediente");
var vIdServicio = IndexData.GetField("TR__Tipo_de_Servicio");

// The following line is not needed in the new logic since we are no longer checking for CaseNo, so it can be safely removed.
// if (!nExpediente || isNaN(nExpediente)) {
//     nExpediente = 0;
// }

// Conexión con la base de datos Trocadero
var dbServer = "THEREFORESERVER\\THEREFORE"; // Ajustar según tu configuración
var database = "Therefore"; // Ajustar según tu configuración
var connString = "Provider=SQLOLEDB.1;Data Source=" + dbServer + ";Initial Catalog= " + database + ";Integrated Security=SSPI;";

// Crear objetos para la conexión y el recordset
var myConn = new ActiveXObject("ADODB.Connection");
var debug = "";

try {
 // Abrir la conexión
 debug += "Intento de abrir conexión.... \n";
 myConn.Open(connString);
 debug += "Conexión abierta con éxito\n";

 // Crear el Recordset
 var myRecordSet = new ActiveXObject("ADODB.Recordset");
 myRecordSet.CursorLocation = 3; // adUseClient
 myRecordSet.CursorType = 1; // adOpenKeyset
 myRecordSet.LockType = 3; // adLockOptimistic

 // Consulta SQL para obtener el valor de Persona_de_Contacto
 // We use the TheIndexData table, which contains the values of index fields. 
 // "IndexDataName" is the internal name of the field.
 var query = "SELECT IndexDataValue FROM TheIndexData WHERE ParentDocNo = (SELECT CaseNo FROM TheCase2 WHERE idProveedor = " + idProveedor + ") AND IndexDataName = 'Persona_de_Contacto'";

 // Ejecutar la consulta
 myRecordSet.Open(query, myConn);

 // Verificar si se obtuvo algún resultado
 if (!myRecordSet.EOF) {
 // Leer el valor de Persona_de_Contacto
 var contactPerson = myRecordSet.Fields("IndexDataValue").Value;

 // Comprobar si el valor no está vacío o nulo
 if (contactPerson && contactPerson.trim() !== "") {
 resultado = 1;
 } else {
 resultado = 0;
 }
 } else {
 debug += "No se encontraron resultados o el campo está vacío\n";
 resultado = 0;
 }
} catch (e) {
 // Manejar errores
 debug += "Error al ejecutar la consulta: " + e.message + "\n";
 resultado = 0;
} finally {
 // Cerrar la conexión y el Recordset
 if (myRecordSet) {
 //myRecordSet.Close();
 }
 if (myConn) {
 myConn.Close();
 }
 debug += "Conexión cerrada\n";
}