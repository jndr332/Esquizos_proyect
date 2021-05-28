const axios = require( 'axios' );
const prompt = require( 'prompt-sync' )();

const accionesRespuesta = [
    "Estamos en matenimiento disculpa...",
    "servicio de letecomunicaciones en el piso 4",
    "Los policias se encuentran en el area 3",
    "La area de comida se encuentra en el piso 5",
    "La unidad se dirige a tu ubicacion, porfavor espere", // 
    "El baño se encuentra al fondo a la derecha", // donde esta el baño 
    "https://drive.google.com/file/d/1wj_f1ftWw8spm-m2HUjFsGcAKswDs26O/view?usp=sharing" //default xD
]
//SULUDO EN ES Y ENG
console.log( "Hola, ¿Cuál es tu duda?" );
console.log("Hello, what is your question?" ); 


var pregunta = prompt("===>");


//Función principal encargada de la deteccion de idiomas
function deteccion( texto, callback,  ){
    var datosDeteccion = [{ "Text": texto }];
    var direccionDeteccion = 'https://api.cognitive.microsofttranslator.com/detect?api-version=3.0';
    axios.post( direccionDeteccion, datosDeteccion, {
        headers : {
            'Ocp-Apim-Subscription-Key': '58f9f4075c9c46bca61a78cfc71a45b6',
            'Ocp-Apim-Subscription-Region' : 'southcentralus',
            'Content-Type' : 'application/json'  
        }
    })
    // se manda el resultado a traves del parametro de la funcion (callback)
    .then( respuesta => {callback = ( respuesta.data[0].language, texto ) })
    .catch( error => console.log( error ));
    
}

// esta funcion es la encargada de analizar el texto ingrasado y enviar a la peticion traduccion solo la entidad detectada en el texto 
function analisis (idioma, texto){

  function deteccion( texto, callback,  ){
    var datosDeteccion = [{ "Text": texto }];
    var direccionDeteccion = 'https://api.cognitive.microsofttranslator.com/detect?api-version=3.0';
    axios.post( direccionDeteccion, datosDeteccion, {
        headers : {
            'Ocp-Apim-Subscription-Key': '58f9f4075c9c46bca61a78cfc71a45b6',
            'Ocp-Apim-Subscription-Region' : 'southcentralus',
            'Content-Type' : 'application/json'  
        }
    })
    .then( respuesta => {callback = ( respuesta.data[0].language, texto ) })
    .catch( error => console.log( error ));

    
}
}




function traduccion( idioma, texto ){
   
// esta Primera parte de la funcion adapta el texto analizado al español para que pueda ser enviado al switch  

var datosAdaptacion = [{"Text": texto}]
var direccionAdaptacion = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=es';

axios.post( direccionAdaptacion, datosAdaptacion,{
    headers : {
        'Ocp-Apim-Subscription-Key' : '58f9f4075c9c46bca61a78cfc71a45b6'
        , 'Ocp-Apim-Subscription-Region': 'southcentralus',
        'Content-Type':'application/json'
    }

} )// el resultado es guardado en la variabel(adap1)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       c5254R254R254R254R254R254R254R254R254R254R254R254R2                                                                                               
.then(respuesta => { callback(respuesta.data[0].translations[0].text) 

    switch(adap1){
     
        case "baño":            
            var respuestaIdioma = [ { "Text": accionesRespuesta[5] } ];          
            break;      
        case "Comunicacion?":           
            var respuestaIdioma = [ { "Text": accionesRespuesta[1] } ];          
            break;
        case "transporte":           
        var respuestaIdioma = [ { "Text": accionesRespuesta[4] } ];
            break;    
        case "police":           
        var respuestaIdioma = [ { "Text": accionesRespuesta[2] } ];    
            break;
         default :
        var respuestaIdioma = [{"Text" : accionesRespuesta [6]}  ];         
            break;
    } 
    // luego de salir del switch se envia su correspondiente respuesta al idioma ya previamente detectado
 
    var direccionTraduccion = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to='+idioma;

    axios.post( direccionTraduccion, respuestaIdioma, {
      
        headers : {
            'Ocp-Apim-Subscription-Key': '58f9f4075c9c46bca61a78cfc71a45b6',       
            'Ocp-Apim-Subscription-Region' : 'southcentralus',          
            'Content-Type' : 'application/json'  
        }
    })
  
    .then( respuesta => console.log( respuesta.data[0].translations[0].text ))

    .catch( error => console.log( error ));

}) 
.catch(error => console.log("INTENTA RESOLVIENDO EL "+error) );
//en caso de tener error con el .then .catch enviara un console.log 
}



//llamada a las funciones 
deteccion(pregunta, traduccion)