var nCase = IndexData.GetField("nExpediente");
var vIdProveedor = IndexData.GetField("idProveedor");
var vDocIni = IndexData.GetField("DocNum");
var vServicio = IndexData.GetField("TR__Tipo_de_Servicio");
//var nForm = vServicio === 38 ? 4 : 2;
var nForm = 8;



//Requisitos Adicionales
/*
var vReqAdicionalesArray = IndexData.GetField("RequisitoId") || [];
var vReqAdicionalesTxt = "";

if (vReqAdicionalesArray.length > 0) {
    vReqAdicionalesTxt = vReqAdicionalesArray.join(";");
}*/



// Documentos Adicionales
var vDocAdicionalesArray1 = IndexData.GetField("trOpc1Doc") || [];
var vDocAdicionalesArray2 = IndexData.GetField("trOpc2Doc") || [];

var vDocAdicionalesTxt = "";
var vDocAdicionalesCombinado = [];

var i;
for (i = 0; i < vDocAdicionalesArray1.length; i++) {
    if (vDocAdicionalesArray1[i] && vDocAdicionalesArray1[i] !== "") {
        vDocAdicionalesCombinado.push(vDocAdicionalesArray1[i]);
    }
}

for (i = 0; i < vDocAdicionalesArray2.length; i++) {
    if (vDocAdicionalesArray2[i] && vDocAdicionalesArray2[i] !== "") {
        vDocAdicionalesCombinado.push(vDocAdicionalesArray2[i]);
    }
}


// Nuevos arrays con valores fijos
var arrayRequisitosEmpresaProveedor = ["9", "8"];
var arrayRequisitosEmpresaAcreedor = ["",""];
var arrayRequisitosSubcontratista = [""];




// Añadir el array correspondiente según el valor de vServicios
if (vServicio == 37) {
    vDocAdicionalesCombinado = vDocAdicionalesCombinado.concat(arrayRequisitosEmpresaProveedor);
} else if (vServicio == 38) {
    vDocAdicionalesCombinado = vDocAdicionalesCombinado.concat(arrayRequisitosEmpresaAcreedor);
} else if (vServicio == 36) {
    vDocAdicionalesCombinado = vDocAdicionalesCombinado.concat(arrayRequisitosSubcontratista);
}



// Convertimos a string separado por ";"
if (vDocAdicionalesCombinado.length > 0) {
    vDocAdicionalesTxt = vDocAdicionalesCombinado.join(";");
}





var vURL = "https://therefore.inima.com:8080/TWA/eForms/#/embed/"+nForm+"?allowanonymous=1&tbProveedores=" + vIdProveedor + "&nExpediente=" + nCase + "&nProceso=" + vDocIni + "&tipoDeFormulario=" + vServicio + "&solicitudDeDocumentos=" +vDocAdicionalesTxt;

/*
// Construimos la URL
var vURL = "https://therefore.inima.com:8080/TWA/eForms/#/embed/" + nForm +
    "?allowanonymous=1" +
    "&tbProveedores=" + encodeURIComponent(vIdProveedor) +
    "&nExpediente=" + encodeURIComponent(nCase) +
    "&nProceso=" + encodeURIComponent(vDocIni) +
    "&tipoDeFormulario=" + encodeURIComponent(vServicio) +
    "&solicitudDeDocumentos=" + encodeURIComponent(vDocAdicionalesTxt);
*/