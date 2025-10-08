var vNumExp = IndexData.GetField("id_Expediente");
var vProceso = IndexData.GetField("Id_Proceso");
var vIdRequisito = IndexData.GetField("IdRequisitoExp");
var vFechaVigencia = IndexData.GetField("Fecha_Vigencia");

// Verificar si vFechaVigencia es vacío, NaN o undefined
if (!vFechaVigencia || isNaN(new Date(vFechaVigencia)) || vFechaVigencia === undefined) {
    vFechaVigencia = "12/31/2100"; // Asignar el valor por defecto
}

// Convertir la fecha de vigencia a formato correcto
vFechaVigencia = toJSONDate(vFechaVigencia);

var vFechaCarga = IndexData.GetField("Fecha_de_Carga");
var vTipoDoc = IndexData.GetField("idTipoDocumental");

function toJSONDate(dateString) {
    // Verificar si la fecha es válida
    var date = new Date(dateString);
    
    // Si la fecha no es válida, establecer como 31/12/2100
    if (isNaN(date.getTime())) {
        date = new Date("2100-12-31"); // Fecha predeterminada
    }

    // Convertir la fecha a formato "/Date(<timestamp>)/", sin la zona horaria
    return "/Date(" + date.getTime() + ")/";
}

var myobj = {
    "CaseNo": vNumExp,
    "CheckInComments": "Actualización de varios campos fuera de tabla" + vFechaVigencia,
    "IndexData": {
        "IndexDataItems": [
            {
                "IntIndexData": {
                    "FieldNo": 1371,
                    "FieldName": "NoProceso_Aux",
                    "DataValue": vProceso
                }
            },
            {
                "IntIndexData": {
                    "FieldNo": 1372,
                    "FieldName": "idTipoDoc_Aux",
                    "DataValue": vTipoDoc
                }
            },
            {
                "IntIndexData": {
                    "FieldNo": 1382,
                    "FieldName": "IdRequisitoAux ",
                    "DataValue": vIdRequisito
                }
            },
            {
                "DateIndexData": {
                    "FieldNo": 1375,
                    "FieldName": "fechaCargaAux",
                    "DataValue": toJSONDate(vFechaCarga)
                }
            },
            {
                "DateIndexData": {
                    "FieldNo": 1376,
                    "FieldName": "fechaCaducidad_Aux",
                    "DataValue": vFechaVigencia
                }
            }
        ]
    }
};

RESTCall.BodyJsonContent = JSON.stringify(myobj);