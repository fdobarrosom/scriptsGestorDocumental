/*
-----------------------------------------------------------------------------
Este scipt construye el cuerpo de la request para lanzar la request POST
en la que se cargan los campos de datos de Proveedor/Acreedor/Subcontratista
en su correspondiente expediente de homologación
-----------------------------------------------------------------------------
*/

// Cargamos todos los valores que vamos a cargar en el expediente desde la categoría formulario
var numeroEmpleadosID = IndexData.GetField("lstNumeroEmpleados");
var fechaConstitucion = IndexData.GetField("Fecha_de_Constitucion");
var telefono = IndexData.GetField("Telefono");
var personaContacto = IndexData.GetField("personaContacto");
var paginaWeb = IndexData.GetField("paginaWeb");
var correoElectornico = IndexData.GetField("correoElectronico");
var nombreFirmante =  IndexData.GetField("nombreFirmante") || "";
var cargoFirmante = IndexData.GetField("Cargo") || "";
var nDocForm = IndexData.GetField("nDoc");
//cargamos las variables que se van a usar para identificar el expediente
var numExpediente = IndexData.GetField("numExpediente");
/*Como el campo de numeroEmpleados es un campo de palabra clave antes nos ha devuelto 
 el indice no el valor real. Caragamos el valor real
*/
var numeroEmpleadosMap = {
    1: "De 1 a 49",
    2: "De 50 a 249",
    3: "De 250 a 499",
    4: "De 500 a 999",
    5: "De 1.000 a 4.999",
    6: "De 5.000 a 9.999",
    7: "De 10.000 a 49.999",
    8: "Más de 50.000"
};

// -----------------------------------------------------------------------------
// Función para obtener el texto legible del ID
// -----------------------------------------------------------------------------

function getNumeroEmpleadosString(numero) {
  return numeroEmpleadosMap[numero];
}

var numeroEmpleadosTexto = getNumeroEmpleadosString(numeroEmpleadosID);
//Comprobarmos si pagina web es vacia
if(!paginaWeb){
    paginaWeb = "No tiene / No contesta";
}

// Convert the date to the required Microsoft JSON format
var fechaConstitucionFormatted = "";
if (fechaConstitucion) {
    // Get the timestamp in milliseconds since the Unix epoch
    var unixTimestamp = fechaConstitucion.getTime();

    // Format the string as "/Date(timestamp)/"
    fechaConstitucionFormatted = "/Date(" + unixTimestamp + ")/";
}

// Creamos el cuerpo de la request POST
var requestBody = {
    "CaseNo": numExpediente,
    "CheckInComments": "Actualización de varios campos fuera de tabla",
    "IndexData": {
        "IndexDataItems": [
            /*{
                "SingleKeywordData": {
                    "FieldNo": 1819,
                    "DataValue": numeroEmpleadosTexto
                }
            },*/
            {
                "DateIndexData": {
                    "FieldNo": 1818,
                    "DataValue": fechaConstitucionFormatted
                }
            },
            {
                "StringIndexData": {
                    "FieldNo": 1821,
                    "DataValue": telefono
                }
            },
            {
                "StringIndexData": {
                    "FieldNo": 1820,
                    "DataValue": personaContacto
                }
            },
            {
                "StringIndexData": {
                    "FieldNo": 1823,
                    "DataValue": paginaWeb
                }
            },
            {
                "StringIndexData": {
                    "FieldNo": 1822,
                    "DataValue": correoElectornico
                }
            },
                        {
                "StringIndexData":{
                    "FieldNo":4402 ,
                    "DataValue": nombreFirmante
                }
            },
            {
                "StringIndexData":{
                    "FieldNo":4403,
                    "DataValue": cargoFirmante
                }
            }
        ]
    }
}

try {
    RESTCall.BodyJsonContent = JSON.stringify(requestBody);
}
catch(e){
    debug.log("Ha ocurrido un error durante la solicitud: " + e.message);
}