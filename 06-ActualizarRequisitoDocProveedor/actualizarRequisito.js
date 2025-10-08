// Datos a actualizar
var vIdRequisitoAux = SourceIndexData.GetField("IdRequisitoAux");
var vFechaCargaAux = SourceIndexData.GetField("fechaCargaAux");
var vFechaVigenciaAux = SourceIndexData.GetField("fechaCaducidad_Aux");

// Recuperamos los datos de la tabla Requisitos
var arrayIdRequisitoReq = SourceIndexData.GetField("idRequisito");
var arrayNoProcesoReq = SourceIndexData.GetField("nProceso");
var arrayIdSociedadReq = SourceIndexData.GetField("idSociedadReq");
var arrayIdResponsableReq = SourceIndexData.GetField("id_Responsable");
var arrayFechaCarga = SourceIndexData.GetField("Fecha_Carga");
var arrayFechaCaducidad = SourceIndexData.GetField("Fecha_Caducidad");
var arrayIdServcioReqAux = SourceIndexData.GetField("idTipoServicioReq");

// Limpiar el campo de la tabla para actualización
IndexData.SetField("tbRequisitos", undefined);

// Buscar el índice del requisito que coincida con vIdRequisitoAux
var indexToUpdate = arrayIdRequisitoReq.indexOf(vIdRequisitoAux);

// Si se encuentra el índice, actualizar las fechas
if (indexToUpdate !== -1) {
    arrayFechaCarga[indexToUpdate] = vFechaCargaAux;
    arrayFechaCaducidad[indexToUpdate] = vFechaVigenciaAux;
}