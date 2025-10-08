// Variable para almacenar el resultado de la consulta
var resultado = 0;
var idProveedor = SourceIndexData.GetField("idProveedor");
//Carga de fecha de siguiente notificaicón
var fechaNotificacion = SourceIndexData.GetField("Fecha_Recordatorio");
var fechaSuperada = 0;

 function convertirFechas(fecha,offset){
    /*
    Función encargada de convertir el formato DATE nativo de JS 
    a formato Therefore.
    */ 
    fecha.setDate(fecha.getDate() + offset);
    var año = fecha.getFullYear();
    var mes = fecha.getMonth() + 1; //+1 porque en JS Enero es el mes 0
    var dia = fecha.getDate();
    
    var mesFormateado = mes < 10 ? '0' + mes : mes;
    var diaFormateado = dia <10 ? '0' + dia : dia;

    //Almacenamos la fecha actual formateada
	fechaFormateada = año + '-' + mesFormateado + '-' + diaFormateado;
	return fechaFormateada
}

//Carga de un objeto date que por defecto se coloca con la fecha actual
var fechaActual =  new Date();
fechaActualFormateada = convertirFechas(fechaActual,0);


// Si no existe fecha de notificación previa se coloca como dentro de 5 dias
if (!fechaNotificacion) {
    debug = '0'
    fechaNotificacion = convertirFechas(fechaActual,5);
}

if(fechaActualFormateada == fechaNotificacion){
	debug = '1'
    fechaSuperada =  1;
    fechaNotificacion = convertirFechas(fechaActual,5); 
}