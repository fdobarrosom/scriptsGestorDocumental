// Variable para almacenar los índices idRequisito
var arrayIdRequisito = [];
var idServicio = SourceIndexData.GetField("TR__Tipo_de_Servicio");

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

    // Consulta SQL para obtener los índices idRequisito
    var query = "SELECT Documento_No FROM Vista_Mtro_Requisitos WHERE Tipo_Servicio_ID = " + idServicio;

    // Ejecutar la consulta
    myRecordSet.Open(query, myConn);

    // Recorrer los resultados y llenar el array
    while (!myRecordSet.EOF) {
        arrayIdRequisito.push(myRecordSet.Fields("Documento_No").Value);
        myRecordSet.MoveNext();
    }

    if (arrayIdRequisito.length === 0) {
        debug += "No se encontraron resultados\n";
    }
} catch (e) {
    // Manejar errores
    debug += "Error al ejecutar la consulta: " + e.message + "\n";
} finally {
    // Cerrar la conexión y el Recordset
    if (myRecordSet) {
       
    }
    if (myConn) {
        myConn.Close();
    }
    debug += "Conexión cerrada\n";
}

// Mostrar los resultados (opcional)
debug += "Array de idRequisito: " + arrayIdRequisito.join(", ") + "\n";