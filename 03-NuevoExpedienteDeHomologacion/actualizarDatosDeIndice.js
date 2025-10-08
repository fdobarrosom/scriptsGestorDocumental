var arrayIdRequisito = SourceIndexData.GetField("idRequisito");
var arrayNoProceso = SourceIndexData.GetField("nProceso");
var arrayIdResponsableServicio = SourceIndexData.GetField("trIdResponsableServicioAux");
var arrayIdResponsableRequisito = SourceIndexData.GetField("trIdResponsableRequisitoAux");
var arrayIdResponsable = [];

// Validamos que los arrays existan y sean de la misma longitud
var totalRegistros = arrayIdRequisito.length;

for (var i = 0; i < totalRegistros; i++) {
    // Si TR_IdResponsableRequisito tiene valor, usarlo. Si no, usar TR_IdResponsableServicio
    var idResponsable = arrayIdResponsableRequisito[i] ? arrayIdResponsableRequisito[i] : arrayIdResponsableServicio[i];
    
    arrayIdResponsable.push(idResponsable);
}