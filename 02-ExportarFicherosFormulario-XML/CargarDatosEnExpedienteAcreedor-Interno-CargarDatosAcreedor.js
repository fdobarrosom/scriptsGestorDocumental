/*
-----------------------------------------------------------------------------
Este scipt construye el cuerpo de la request para lanzar la request POST
en la que se cargan los campos de datos de Proveedor/Acreedor/Subcontratista
en su correspondiente expediente de homologación para proveedores
-----------------------------------------------------------------------------
*/
//Carga de variables del formulario
var personaContacto = IndexData.GetField("personaContactoAcreedor") || "";
var correoElectornico = IndexData.GetField("correoElectronicoAcreedor") || "";
var telefono = IndexData.GetField("TelefonoAcreedor3") || "";
var paginaWeb = IndexData.GetField("paginaWebAcreedor") || "";
var nombreFirmante =  IndexData.GetField("nombreFirmanteAcreedores") || "";
var cargoFirmante = IndexData.GetField("cargoFirmanteAcreedor") || "";
var numExpediente = IndexData.GetField("numExpediente");

//Comprobar si pagina web es vacio y rellenar 
if(!paginaWeb){
    paginaWeb = "No tiene / No contesta";
}

// Creamos el cuerpo de la request POST
var requestBody = {
    "CaseNo": numExpediente,
    "CheckInComments": "Actualización de varios campos fuera de tabla",
    "IndexData": {
        "IndexDataItems": [
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