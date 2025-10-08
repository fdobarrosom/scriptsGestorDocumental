//Recuperamos la tabla de Proceso de homologación 
var arrayNoProcesoH = SourceIndexData.GetField("NoProcesoH");
var arrayLstHomologado = SourceIndexData.GetField("Homologado");
var arrayEstado = SourceIndexData.GetField("estado");
var arrayFechaVigencia = SourceIndexData.GetField("fechaVigencia");
var debug = "inicia \n";
var arrayCaduca = [];

// Limpiar el campo de la tabla para actualización
IndexData.SetField("tbHomologacionEmpresa", undefined);

// Recorrer arrayNoProcesoH
for (var i = 0; i < arrayNoProcesoH.length; i++) {
     // Llamar a la función para obtener los nuevos valores
    var nuevosValores = obtenerNuevosValores(arrayNoProcesoH[i]);
    
    // Actualizar los arrays con los valores devueltos por la función
    arrayLstHomologado[i] = nuevosValores.lstHomologado;
    arrayEstado[i] = nuevosValores.estado;
    arrayFechaVigencia[i] = nuevosValores.fechaVigencia;
    debug += nuevosValores.debug;
    arrayCaduca = nuevosValores.arrayCaduca;
}