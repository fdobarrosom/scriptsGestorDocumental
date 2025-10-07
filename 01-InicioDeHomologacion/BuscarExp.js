// Variable para almacenar el resultado de la consulta
var resultado = 0;
var idProveedor = SourceIndexData.GetField("idProveedor");
var nExpediente = SourceIndexData.GetField("nExpediente");
var vIdServicio = IndexData.GetField("TR__Tipo_de_Servicio")

// Verificar si el valor es vacío, undefined o no es un número
if (!nExpediente || isNaN(nExpediente)) {
    nExpediente = 0;
}


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

    // Consulta SQL para obtener el valor de CaseNo
    var query = "SELECT CaseNo FROM TheCase2 WHERE idProveedor =  " + idProveedor;

    // Ejecutar la consulta
    myRecordSet.Open(query, myConn);

    // Verificar si se obtuvo algún resultado
    if (!myRecordSet.EOF) {
        // Leer el valor de CaseNo
        resultado = myRecordSet.Fields("CaseNo").Value;
    } else {
        debug += "No se encontraron resultados\n";
        resultado = 0;
    }
} catch (e) {
    // Manejar errores
    debug += "linea 59 Error al ejecutar la consulta: " + e.message + "\n";
    resultado = 0;
} finally {
    // Cerrar la conexión y el Recordset
    if (myRecordSet) {
        myRecordSet.Close();
    }
    if (myConn) {
        myConn.Close();
    }
    debug += "Conexión cerrada\n";
}

nExpediente = resultado === 0 ? nExpediente : resultado;


var cuerpoCorreoProveedor = "Estimado Proveedor / Subcontratista,\n\n" +
"Como parte de nuestro proceso de homologación, le invitamos a completar su registro en nuestra plataforma digital. Para ello, le solicitamos que acceda al siguiente enlace, donde podrá responder un breve cuestionario y cargar la documentación requerida:\n\n" +
"- Tarjeta Identificación Fiscal CIF\n" +
"- Escritura Constitución Empresa\n" +
"- Escritura Apoderamiento del Firmante\n" +
"- Certificado de Titularidad Bancaria\n" +
"- Referencias Técnicas últimos 5 años\n" +
"- Cuentas Anuales Registro Mercantil\n" +
"- Pólizas de Seguro\n" +
"- Certificado Nominativo de la AEAT de Contratistas y Subcontratistas\n" +
"- Certificado Negativo por descubierto Seg. Social\n" +
"- Certificado de inscripción en el REA - (Solo si es usted Subcontratista perteneciente al Sector de la Construcción o Ingeniería Civil)\n" +
"- Código ético o de conducta y Política anticorrupción - (Sólo en caso de estar en posesión de dicho documento)\n" +
"- Certificado ISO 9001 - (Solo en caso de estar en posesión de dicho documento)\n" +
"- Documento Evidencia de algún CONTROL EXTRA sobre SUS PROCESOS PRODUCTIVOS (recepción/trazabilidad de materiales, control a proveedores, etc.), y/o la gestión de RECLAMACIONES de CLIENTE y/o cómo mide su SATISFACCIÓN y/o, en caso de que aplique, cómo gestiona el material defectuoso (servicio POST-VENTA) - (Solo en el caso de no tener el certificado ISO 9001 y estar en posesión de dicho documento)\n" +
"- Certificado ISO 14001 (o Reglamento EMAS) - (Solo en caso de estar en posesión de dicho documento)\n" +
"- Documento Evidencia de que CUENTA CON DIRECTRICES O BUENAS PRÁCTICAS relacionadas con la GESTIÓN DE SUS ASPECTOS AMBIENTALES - (Solo en el caso de no tener el certificado ISO 14001 (o Reglamento EMAS) y estar en posesión de dicho documento)\n" +
"- Documento Acreditativo de REGISTRO, CERTIFICADO O CALCULO DE SU HUELLA DE CARBONO - (Sólo en caso de estar en posesión de dicho documento)\n" +
"- Documento Acreditativo del CUMPLIMIENTO DE LA DECLARACIÓN DE LOS DERECHOS HUMANOS - (Sólo en caso de estar en posesión de dicho documento)\n" +
"- Certificado ISO 45001 - (Solo en caso de estar en posesión de dicho documento)\n" +
"- Documento Acreditativo de ORGANIZACIÓN DE SEGURIDAD Y SALUD LABORAL según legislación en vigor - (Sólo en caso de estar en posesión de dicho documento)\n" +
"- Certificado ISO 50001 - (Solo en caso de estar en posesión de dicho documento)\n" +
"- Certificados en materia de Gestión Calidad, Gestión Ambiental, Gestión Energética y Gestión de Seguridad y Salud en el trabajo, otorgados por entidades reconocidas - (Solo en caso de estar en posesión de dichos documentos)\n\n" +
"Rogamos tenga preparada dicha documentación antes de iniciar el proceso.";



var cuerpoCorreoAcreedor = "Estimado Acreedor,\n\n" +
"Como parte de nuestro proceso de homologación, le invitamos a completar su registro en nuestra plataforma digital. Para ello, le solicitamos que acceda al siguiente enlace, donde podrá cargar la documentación requerida:\n\n" +
"- Tarjeta de Identificación Fiscal CIF\n" +
"- Certificado de Titularidad Bancaria\n\n" +
"Rogamos tenga preparada dicha documentación antes de iniciar el proceso.";



// Selección del cuerpo según vServicio
var cuerpoCorreoFinal = "";
if (vIdServicio == 38) {
    cuerpoCorreoFinal = cuerpoCorreoAcreedor;
} else if (vIdServicio == 37 || vIdServicio == 36) {
    cuerpoCorreoFinal = cuerpoCorreoProveedor;
}
cuerpoCorreoFinal += "\n idServicio" + vIdServicio;