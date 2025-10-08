//Cargamos todos los valores que vamos a cargar en el expediente desde la categoría formulario
var numeroEmpleados = IndexData.GetField("lstNumeroEmpleados");
var fechaConstitucion = IndexData.GetField("Fecha_de_Constitucion");
var telefono = IndexData.GetField("Telefono");
var personaContacto = IndexData.GetField("personaContacto");
var paginaWeb = IndexData.GetField("paginaWeb");
var correoElectornico = IndexData.GetField("correoElectronico");

//cargamos las variables que se van a usar para identificar el expediente
var numExpediente = IndexData.GetField("numExpediente");

if(!paginaWeb){
    paginaWeb = "No tiene / No contesta";
}
//Creamos el cuerpo de la request POST
/*
Las request de modificación de casos tienen que contener:
CaseNo: El id del caso // Expediente que se quiere modificar
IndexData:
    Value: valor con el que se va a rellenar el campo
    Field:
        ID:ID numerico del campo en Therefore
        Nombre: Opcional en el que se puede colocar el nombre del campo (ID String en Therefore)
*/  
var requestBody = {
    "CaseNo":numExpediente,
    "IndexData":{
        "IndexDataItems":[
        {
            "Value": numeroEmpleados,
            "Field":{
                "Id":1819
            }
        },
        {
            "Value": fechaConstitucion,
            "Field":{
                "Id":1818
            }
        },
        {
            "Value":telefono,
            "Field":{
                "Id":1821
            }
        },
        {
            "Value":personaContacto,
            "Field":{
                "Id":1820
            }
        },
        {
            "Value":paginaWeb,
            "Field":{
                "Id":1823
            }
        },
        {
            "Value":correoElectornico,
            "Field":{
                "Id":1822
            }
        }
    ]
    }
}
try{
    RESTCall.BodyJsonContent = JSON.stringify(requestBody);
}
catch(e){
    debug.log("Ha ocurrido un error durante loa solicitud");
}