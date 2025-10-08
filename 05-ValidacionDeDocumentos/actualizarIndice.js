// Crear el objeto de conexión SQL
var conn = new ActiveXObject("ADODB.Connection");
var rs = new ActiveXObject("ADODB.Recordset");

// Configurar la cadena de conexión
var dbServer = "THEREFORESERVER\\THEREFORE";
var database = "Therefore";
var connectionString = "Provider=SQLOLEDB.1;Data Source=" + dbServer + ";Initial Catalog=" + database + ";Integrated Security=SSPI;";

// Obtener los valores desde los campos del índice
var varCase = SourceIndexData.GetField("id_Expediente");
var varNProceso = SourceIndexData.GetField("Id_Proceso");
var varIdTipoDoc = SourceIndexData.GetField("idTipoDocumental");
var varSubTipo = SourceIndexData.GetField("IdSubtipoDocumental");
var varIdRequisito = null;
var debug = "";

try {
    // Abrir la conexión
    conn.Open(connectionString);

    // Verificar que los valores no sean nulos o vacíos
    if (varCase && varNProceso && varIdTipoDoc) {
        // Construir la consulta SQL
        var sqlQuery = "SELECT TOP 1 idRequisito FROM TheCaseIxTable951 " +
                       "WHERE CaseNo = '" + varCase + "' " +
                       "AND nProceso = '" + varNProceso + "' " +
                       "AND (subTipoOpc1 = '" + varSubTipo + "' OR subTipoOpc2 = '" + varSubTipo + "')";
                       //"AND idTipoDoc = '" + varIdTipoDoc + "'";

        // Ejecutar la consulta
        rs.Open(sqlQuery, conn);

        // Verificar si hay resultados
        if (!rs.EOF) {
            varIdRequisito = rs.Fields("idRequisito").Value;
            debug = varIdRequisito;
        } else {
           debug = "No se encontró ningún requisito.";
        }

        // Cerrar el recordset
        rs.Close();
    } else {
        debug = "Faltan valores requeridos para la consulta.";
    }
} catch (e) {
    debug += "Error catch: " + e.message;
} finally {
    // Cerrar la conexión
    if (conn.State === 1) {
        conn.Close();
    }
}

debug += " Id Requisito:" + varIdRequisito + "\n";

debug += "varCase: "+ varCase + "\n" + "varNProceso: " + varNProceso + "\n" + "varIdTipoDoc: "  + varIdTipoDoc;