var vNumExp = IndexData.GetField("nExpediente");
var vProceso = IndexData.GetField("DocNum");
var vIdTipoServicio = IndexData.GetField("TR__Tipo_de_Servicio");
var vIdSociedad = IndexData.GetField("TR__Id_Sociedades");
var vIdResponsable = IndexData.GetField("TRResponsableId");

//Requisitos Adicionales
var vReqAdicionalesArray = IndexData.GetField("RequisitoId") || [];
var vReqAdicionalesTxt = "";

if (vReqAdicionalesArray.length > 0) {
    vReqAdicionalesTxt = vReqAdicionalesArray.join(";");
}
//Requisitos Adicionales

var myobj = {
    "CaseNo": vNumExp,
    "CheckInComments": "Actualización de varios campos fuera de tabla",
    "IndexData": {
        "IndexDataItems": [
            {
                "IntIndexData": {
                    "FieldNo": 1067,
                    "FieldName": "NoProcessAux",
                    "DataValue": vProceso
                }
            },
            {
                "IntIndexData": {
                    "FieldNo": 1080,
                    "FieldName": "IdTipoServicioAux",
                    "DataValue": vIdTipoServicio
                }
            },
            {
                "IntIndexData": {
                    "FieldNo": 1081,
                    "FieldName": "IdSociedadAux",
                    "DataValue": vIdSociedad
                }
            },
            {
                "IntIndexData": {
                    "FieldNo": 1082,
                    "FieldName": "IdResponsableAux",
                    "DataValue": vIdResponsable
                }
            },
            {
                "StringIndexData": {
                    "FieldNo": 2976,
                    "FieldName": "requisitosAdicionalesAux",
                    "DataValue": vReqAdicionalesTxt
                }
            }
        ]
    }
};


RESTCall.BodyJsonContent = JSON.stringify(myobj);