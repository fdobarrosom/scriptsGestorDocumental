/*Recuperamos Requisitos del Servicio del Inicio del Proceso*/
var vProcess = SourceIndexData.GetField("NoProcessAux");
var vIdServicio = SourceIndexData.GetField("IdTipoServicioAux");
var vIdSociedad = SourceIndexData.GetField("IdSociedadAux");
var vIdResponsable = SourceIndexData.GetField("IdResponsableAux");
/*********************************************************************/


/*****Actualizamos Tabla Procesos de Homologación*******/
var arrayProcess = SourceIndexData.GetField("NoProcesoH");     
var arrayHomologadoNo = SourceIndexData.GetField("Homologado");  
var arrayEstadoNo = SourceIndexData.GetField("estado");           
var arrayFechaVigencia = SourceIndexData.GetField("fechaVigencia");

IndexData.SetField("tbHomologacionEmpresa", undefined)

arrayProcess.push(SourceIndexData.GetField("NoProcessAux"));
arrayHomologadoNo.push(2);
arrayEstadoNo.push(1);

/*********************************************************************/

//Recuperamos los datos de la tabla Requisitos TABLA
var arrayIdRequisitoReq = SourceIndexData.GetField("idRequisito");
var arrayNoProcesoReq = SourceIndexData.GetField("nProceso");
var arrayIdSociedadReq = SourceIndexData.GetField("idSociedadReq");
var arrayIdResponsableReq = SourceIndexData.GetField("id_Responsable");
var arrayFechaCarga = SourceIndexData.GetField("Fecha_Carga");
var arrayFechaCaducidad = SourceIndexData.GetField("Fecha_Caducidad");
var arrayIdServcioReqAux = SourceIndexData.GetField("idTipoServicioReq");

//Declaramos el nuevo array para los nuevos Requisitos
var arrayIdRequisitos_New = []; 

// Flags de verificación
var servicioEncontrado = false;
var sociedadEncontrada = false;
var requisitosDeEmpresa = false;

// Verificamos si el IdServicio está en la tabla de requisitos
if (arrayIdServcioReqAux && Array.isArray(arrayIdServcioReqAux)) {
    servicioEncontrado = arrayIdServcioReqAux.indexOf(vIdServicio) !== -1;
}

// Si no existe el servicio en la tabla, agregamos todos los requisitos
if (!servicioEncontrado) {
	agregarTodosLosRequisitos();
	
	
}else {
	// Si el servicio está en la tabla, verificamos si la sociedad está asociada al servicio
    if (arrayIdSociedadReq && Array.isArray(arrayIdSociedadReq)) {
    
        // Buscamos si la sociedad está asociada al servicio actual
        sociedadEncontrada = arrayIdSociedadReq.some(function(sociedad, index) {
            return sociedad === vIdSociedad && arrayIdServcioReqAux[index] === vIdServicio;
        });
    }

    // Si el servicio está en la tabla, pero no está homologado para esta sociedad, agregamos los requisitos con Tipo_Texto = '01 Empresa'
    if (servicioEncontrado && !sociedadEncontrada) {
        agregarRequisitosEmpresa(); 
        
    }  else if (servicioEncontrado && sociedadEncontrada) {
        /*El servicio y la sociedad ya están homologados. No es necesario agregar requisitos*/
        }
     }

  

// Funciones pendientes
function agregarTodosLosRequisitos() {  
     arrayIdRequisitos_New = GetAllRequisitosServicio(vIdServicio); 
     }

function agregarRequisitosEmpresa() {
    // Aquí iría la implementación para agregar solo los requisitos tipo "Empresa"
    arrayIdRequisitos_New = GetAllRequisitosServicio(vIdServicio, true);
    }

// Creamos los arrays de los nuevos registros con valores predeterminados
	var arrayNoProcesoReq_New = [];
	var arrayIdSociedadReq_New = [];
	var arrayIdResponsableReq_New = [];

// Llenamos los arrays con los valores deseados CONSTANTES
	for (var i = 0; i < arrayIdRequisitos_New.length; i++) {
    	arrayNoProcesoReq_New.push(vProcess);
    	arrayIdSociedadReq_New.push(vIdSociedad);
    	arrayIdResponsableReq_New.push(vIdResponsable);
	}



// Unimos los datos antiguos con los nuevos para actualizar la tabla
if (Array.isArray(arrayIdRequisitoReq) && Array.isArray(arrayIdRequisitos_New)) {
    	// Usar un bucle para agregar los elementos de arrayIdRequisitos_New a arrayIdRequisitoReq
    	for (var i = 0; i < arrayIdRequisitos_New.length; i++) {
        	arrayIdRequisitoReq.push(arrayIdRequisitos_New[i]);
    	}
    }

if (Array.isArray(arrayNoProcesoReq) && Array.isArray(arrayNoProcesoReq_New)) {
    	// Usar un bucle para agregar los elementos de arrayNoProcesoReq_New a arrayNoProcesoReq
    	for (var i = 0; i < arrayNoProcesoReq_New.length; i++) {
        	arrayNoProcesoReq.push(arrayNoProcesoReq_New[i]);
    	}
    }
    
if (Array.isArray(arrayIdSociedadReq) && Array.isArray(arrayIdSociedadReq_New)) {
    	// Usar un bucle para agregar los elementos de arrayIdSociedadReq_New a arrayIdSociedadReq
    	for (var i = 0; i < arrayIdSociedadReq_New.length; i++) {
        	arrayIdSociedadReq.push(arrayIdSociedadReq_New[i]);
    	}  
    } 
    
if (Array.isArray(arrayIdResponsableReq) && Array.isArray(arrayIdResponsableReq_New)) {
    for (var i = 0; i < arrayIdResponsableReq_New.length; i++) {
        arrayIdResponsableReq.push(arrayIdResponsableReq_New[i]);
    }
}


IndexData.SetField("tbRequisitos", undefined)