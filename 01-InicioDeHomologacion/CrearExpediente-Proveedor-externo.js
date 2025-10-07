var nCase = CreatCase.GetValue("CaseNo");
var vIdProveedor = IndexData.GetField("idProveedor");
var pais = IndexData.GetField("PaisProveedor")
var vDocIni = IndexData.GetField("DocNum");
var vServicio = IndexData.GetField("TR__Tipo_de_Servicio");

if(pais == "SPAIN"){
	var nForm = vServicio === 38 ? 4 : 2;
}
else{
	var nForm = vServicio === 38 ? 10 : 11;
}

var vURL = "https://therefore.inima.com:8080/TWA/eForms/#/embed/"+nForm+"?allowanonymous=1&tbProveedores=" + vIdProveedor + "&nExpediente=" + nCase + "&nProceso=" + vDocIni + "&tipoDeFormulario=" + vServicio;