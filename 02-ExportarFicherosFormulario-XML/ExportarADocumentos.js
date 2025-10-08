// Obtener los valores de la tabla directamente como listas
var arrayCases = IndexData.GetField("nCase");
var arrayFilesTypes = IndexData.GetField("FileName");
var arrayDocIni = IndexData.GetField("DocInicioH");
var arrayNum = IndexData.GetField("Num");


// Validar que las listas tengan datos
if (arrayCases && arrayFilesTypes && arrayDocIni && arrayNum) {
    for (var i = 0; i < arrayCases.length; i++) {
        // Generar el nombre del archivo usando los valores correspondientes
        var fileName = arrayCases[i] + "_" + arrayFilesTypes[i] + "_" + arrayDocIni[i] + "_" + arrayNum[i] + ".pdf";
         // Exportar el archivo con el nombre generado
        ExportFile(fileName); // Ajusta esta función según tu entorno
       
    }
} else {
   
}


function ExportFile(fileName) {
    // Ruta del directorio donde deseas guardar el archivo
    var exportDirectory = "C:\\Therefore\\eForm Files\\Export XML\\";

    // Crear la ruta completa del archivo
    var fullFilePath = exportDirectory + fileName;
}