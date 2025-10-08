/*Recuperamos Requisitos del Servicio del Inicio del Proceso*/
var vProcess = SourceIndexData.GetField("NoProcessAux");
var vIdServicio = SourceIndexData.GetField("IdTipoServicioAux");
var vIdSociedad = SourceIndexData.GetField("IdSociedadAux");
var vIdResponsable = SourceIndexData.GetField("IdResponsableAux");
var vRequisitos = SourceIndexData.GetField("requisitosAdicionalesAux");
var requisitosArray = [];

// Verificamos si vRequisitos tiene contenido
if (vRequisitos && typeof vRequisitos === "string") {
    // Dividimos la cadena por ";" y convertimos a array
    requisitosArray = vRequisitos.split(";");
}

/*********************************************************************/

//Recuperamos los datos de la tabla Requisitos TABLA**********************/
var arrayIdRequisitoReq = SourceIndexData.GetField("idRequisito");
var arrayNoProcesoReq = SourceIndexData.GetField("nProceso");
var arrayIdSociedadReq = SourceIndexData.GetField("idSociedadReq");
var arrayIdResponsableReq = SourceIndexData.GetField("id_Responsable");
var arrayFechaCarga = SourceIndexData.GetField("Fecha_Carga");
var arrayFechaCaducidad = SourceIndexData.GetField("Fecha_Caducidad");
var arrayIdServcioReqAux = SourceIndexData.GetField("idTipoServicioReq");


// Recorremos los requisitos adicionales y agregamos los datos correspondientes
for (var i = 0; i < requisitosArray.length; i++) {
    var item = requisitosArray[i].trim();
    if (item) {
        arrayIdRequisitoReq.push(item);
        arrayNoProcesoReq.push(vProcess);
        arrayIdSociedadReq.push(vIdSociedad);
        arrayIdResponsableReq.push(vIdResponsable);
    }
}


IndexData.SetField("tbRequisitos", undefined)

IndexData.SetField("NoProcessAux", null);
IndexData.SetField("IdTipoServicioAux", null);
IndexData.SetField("IdSociedadAux", null);
IndexData.SetField("IdResponsableAux", null);
IndexData.SetField("requisitosAdicionalesAux", null);