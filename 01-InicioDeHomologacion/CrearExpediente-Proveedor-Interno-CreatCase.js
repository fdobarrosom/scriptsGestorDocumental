var vIdProveedor = IndexData.GetField("idProveedor");
var vIdServicio = IndexData.GetField("TR__Tipo_de_Servicio");
var docInicioHomologacion = IndexData.GetField("DocNum");
vIdSociedad = IndexData.GetField("TR__Id_Sociedades");

var arrayIdRequisitos = IndexData.GetField("IdRequisito");

var myobj = {
    "CaseDefNo": 2,
    "IndexDataItems": [
        {
            "IntIndexData": {
                "FieldNo": 947,
                "DataValue": vIdProveedor
            }
        },
        {
            "TableIndexData": {
                "FieldNo": 955,  // Campo de la tabla
                "DataValue": [
                    {
                        "DataRowItems": [
                            {
                                "SingleKeywordData": {
                                    "FieldNo": 961,  // Campo dentro de la tabla
                                    "DataValue": "02 No"
                                }
                            },
                            {
                                "IntIndexData": {
                                    "FieldNo": 956,  // Campo 653 dentro de la tabla
                                    "DataValue": docInicioHomologacion
                                }
                            }
                            
                        ],
                        "RowNo": 1,
                        "AccessIsEditableRow": true
                    }
                ],
                "FieldName": "TheCaseIxTable955"  // Asegúrate de que el nombre del campo sea correcto
            }
        }
    ]
};

// Agregar cada valor del arrayIdRequisitos como una fila nueva en TheCaseIxTable720
var table951 = {
    "TableIndexData": {
        "FieldNo": 951,  // Tabla TheCaseIxTable720
        "DataValue": [], // Inicializar un array vacío para las filas
        "FieldName": "TheCaseIxTable951"  // Asegúrate de que el nombre del campo sea correcto
    }
};

arrayIdRequisitos.forEach(function (idRequisito, index) {
    table951.TableIndexData.DataValue.push({
        "DataRowItems": [
            {
                "IntIndexData": {
                    "FieldNo": 1045,  // Columna TR_IdRequisito
                    "DataValue": idRequisito
                }
            },
            {
                "IntIndexData": {
                    "FieldNo": 954,  // Columna TR_IdRequisito
                    "DataValue": docInicioHomologacion
                }
            },
            {
                "IntIndexData": {
                    "FieldNo": 1061,  // Columna TR_IdRequisito
                    "DataValue": vIdSociedad
                }
            },
        ],
        "RowNo": index + 1,  // Número de fila, empieza en 1
        "AccessIsEditableRow": true
    });
});

// Agregar la tabla TheCaseIxTable720 al objeto principal
myobj.IndexDataItems.push(table951);



// Convertir el objeto a formato JSON
RESTCall.BodyJsonContent = JSON.stringify(myobj);
