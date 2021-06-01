//Tenemos registrado que quieren realizar: La idea que tenemos para el proyecto, es un programa que ayude a la gente 
//a orientarse dentro de algún establecimiento como una escuela, hospital, etc. Pero si se quisiera se pudiera ampliar 
//para una ciudad, también habría la opción de traductor con trasliterador para mejorar la experiencia y ayudar en caso de 
//que sean turistas y no hablen el idioma nativo del lugar


const axios = require('axios');
const prompt = require('prompt-sync')();


//acciones respuesta asignadas para las respuestas predeterminadas 
const accionesRespuesta = [
    /*0 */
    "La cabina telefónica se encuentra al final del segundo bloque.",
    /*1 */
    "El comedor se encuentra detrás de las canchas de basquet.",
    /*2 */
    'La oficina del director se encuentra en el segundo piso del bloque de la derecha de la entrada principal.',
    /*3 */
    "La biblioteca se encuentra en el lado al este de la entrada principal, junto a los juegos infantiles de los grados iniciales.",
    /*4 */
    'Hay 2 salidas, una en la parte de atras de los bloques, y otra al frente del garaje.',
    /*5 */
    'El laboratorio de química se encuentra en la planta baja al frente del bloque "C".',
    /*6 */
    'Puedes solicitar un taxi en el siguiente link https://sweb.ktaxi.com.ec/azutaxicliente/',
    /*7 */
    'El laboratorio de computación se encuentra al lado del de química.',
    /*8 */
    'El regreso a clases sera el 29 de noviembre del 2021',
    /*9 */
    'No seas sapo.',

]
const saludoIngles = [

    "    █░█░█ █▀▀ █░░ █▀▀ █▀█ █▀▄▀█ █▀▀",
    "    ▀▄▀▄▀ ██▄ █▄▄ █▄▄ █▄█ █░▀░█ ██▄",
    "",
    "  |[]+++[]|     [____]      |/  \/  \|   ",
    "  |+ ___ +|     ]()()[      |\__/\__/|  ",
    "  |:|   |:|   ___|__/___    |[][][][]|  ",
    "  |:|___|:|  |__|    |__|   |++++++++|   ",
    "  |[]===[]|   |_|_/\_|_|    | ______ |   ",
    "_ ||||||||| _ | | __ | | __ ||______|| __",
    "  |_______|   |_|[::]|_|    |________|   ",
    "              \_|_||_|_/               ",
    "                |_||_|                   ",
    "               _|_||_|_                  ",
    "              |___||___| ",
    "",
    "",
    "Hello i'm Ralph, welcome to the Francisco Febres Cordero educational unit, how can I help you?"
]

const saludoEspañol = [
    "█▀▄ ▀█▀ █▀▀ █▄░█ █░░░█ █▀▀ █▄░█ ▀█▀ █▀▄ ▄▀▀▄ .",
    "█▀▄ ░█░ █▀▀ █▀██ ░█░█░ █▀▀ █▀██ ░█░ █░█ █░░█ .",
    "▀▀░ ▀▀▀ ▀▀▀ ▀░░▀ ░░▀░░ ▀▀▀ ▀░░▀ ▀▀▀ ▀▀░ ░▀▀░ .",
    "",
    "  |[]+++[]|     [____]      |/  \/  \|   ",
    "  |+ ___ +|     ]()()[      |\__/\__/|  ",
    "  |:|   |:|   ___|__/___    |[][][][]|  ",
    "  |:|___|:|  |__|    |__|   |++++++++|   ",
    "  |[]===[]|   |_|_/\_|_|    | ______ |   ",
    "_ ||||||||| _ | | __ | | __ ||______|| __",
    "  |_______|   |_|[::]|_|    |________|   ",
    "              \_|_||_|_/               ",
    "                |_||_|                   ",
    "               _|_||_|_                  ",
    "              |___||___| ",
    "",
    "",  
    
    "Hola soy ralph, bienvenido a la unidad educativa Febres Cordero, ¿cómo te puedo ayudar?"
]


var saludoBienvenida = prompt("Please type your language. Porfavor digite su lenguage: ")

/*ñ

*/
if (saludoBienvenida == "es"|| saludoBienvenida == "en"|| saludoBienvenida=="english"){

    
   
    switch (saludoBienvenida){
        case "en":
            console.log(saludoIngles)
            break;
        case "English":
            console.log(saludoIngles)
            break;
        case "english":
            console.log(saludoIngles)
            break;
        case "Español":
            console.log(saludoEspañol)
            break;
        case "es":
            console.log(saludoEspañol)
            break;
        case "español":
            console.log(saludoEspañol)
            break;      
    }
    var pregunta = prompt("==>")
    deteccion(pregunta, traduccion)

}
else {
  
    console.log("Por favor digite un idioma valido.\n Please type a valid language \n en = english, es = español"  )   
}


//Función principal que hara la petición a la detección de idiomas
function deteccion(texto, callback) {
    var datosDeteccion = [{ "Text": texto }];
    var direccionDeteccion = 'https://api.cognitive.microsofttranslator.com/detect?api-version=3.0';
    axios.post(direccionDeteccion, datosDeteccion, {
            headers: {
                'Ocp-Apim-Subscription-Key': '58f9f4075c9c46bca61a78cfc71a45b6',
                'Ocp-Apim-Subscription-Region': 'southcentralus',
                'Content-Type': 'application/json'
            }
        })
        .then(respuesta => { callback(respuesta.data[0].language, texto) })
        .catch(error => console.log("error en la funcion DETECCION : " + error));
}


function traduccion(idioma, texto) {
    //obtencion de la palabra clave  (Servicio de Key_phrases) 

    // cuerpo de la peticion
    var bodyAnalisis = {
        "documents": [{
            "language": idioma,
            "id": "1",
            "text": texto
        }]
    }
    var direccionAnalisis = 'https://servicioanalisistexto.cognitiveservices.azure.com/text/analytics/v3.0/KeyPhrases'
    axios.post(direccionAnalisis, bodyAnalisis, {
            headers: {
                "Content-type": "application/json",
                "Ocp-Apim-Subscription-Key": "8b4c7829af844bc699425c01e131246a"
            }
            //obtencion del la palabra clave
        }).then(respuesta => {
            var analiText = (respuesta.data.documents[0].keyPhrases[0])

            //adaptacion del texto ingresado  
            var datosAdaptacion = [{ "Text": analiText }]
            var direccionAdaptacion = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=es';

            axios.post(direccionAdaptacion, datosAdaptacion, {
                    headers: {
                        'Ocp-Apim-Subscription-Key': '58f9f4075c9c46bca61a78cfc71a45b6',
                        'Ocp-Apim-Subscription-Region': 'southcentralus',
                        'Content-Type': 'application/json'
                    }

                })
                .then(respuesta => {
                    var adap1 = (respuesta.data[0].translations[0].text)

                    switch (adap1) {

                        case "teléfono":
                            var respuestaIdioma = [{ "Text": accionesRespuesta[0] }];
                            break;
                        case "telefono":
                            var respuestaIdioma = [{ "Text": accionesRespuesta[0] }]
                            break;
                        case "phone":
                            var respuestaIdioma = [{ "Text": accionesRespuesta[0] }]
                            break;
                        case "comedor":
                            var respuestaIdioma = [{ "Text": accionesRespuesta[1] }];
                            break;
                        case "Comedor":
                            var respuestaIdioma = [{ "Text": accionesRespuesta[1] }];
                            break;
                        case "Rectorado":
                            var respuestaIdioma = [{ "Text": accionesRespuesta[2] }];
                            break;
                        case "rectorado":
                            var respuestaIdioma = [{ "Text": accionesRespuesta[2] }];
                            break;
                        case "biblioteca":
                            var respuestaIdioma = [{ "Text": accionesRespuesta[3] }];
                            break;
                        case "salida":
                            var respuestaIdioma = [{ "Text": accionesRespuesta[4] }];
                            break;
                        case "laboratorio de química":
                            var respuestaIdioma = [{ "Text": accionesRespuesta[5] }]
                            break;
                        case "laboratorio de quimica":
                            var respuestaIdioma = [{ "Text": accionesRespuesta[5] }]
                            break;
                        case "Taxi":
                            var respuestaIdioma = [{ "Text": accionesRespuesta[6] }]
                            break;
                        case "taxi":
                            var respuestaIdioma = [{ "Text": accionesRespuesta[6] }]
                            break;
                        case "laboratorio de computación":
                            var respuestaIdioma = [{ "Text": accionesRespuesta[7] }]
                            break;
                        case "laboratorio de computacion":
                            var respuestaIdioma = [{ "Text": accionesRespuesta[7] }]
                            break;
                        case "regreso a clases":
                            var respuestaIdioma = [{ "Text": accionesRespuesta[8] }]
                            break;
                        case "clases":
                            var respuestaIdioma = [{ "Text": accionesRespuesta[8] }]
                            break;
                        case "creadores":
                            var respuestaIdioma = [{ "Text": accionesRespuesta[9] }]
                            break;

                    }

                    //la respuesta del switch sera traducida aqui dependiendo del idioma que haya sido detectado 
                    var direccionTraduccion = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=' + idioma;

                    axios.post(direccionTraduccion, respuestaIdioma, {

                            headers: {
                                'Ocp-Apim-Subscription-Key': '58f9f4075c9c46bca61a78cfc71a45b6',
                                'Ocp-Apim-Subscription-Region': 'southcentralus',
                                'Content-Type': 'application/json'
                            }
                        })
                        .then(respuesta => console.log(respuesta.data[0].translations[0].text))
                        .catch(error => console.log("Error en TraducUsua" + error));

                })
                .catch(error => console.log("INTENTA RESOLVIENDO EL " + error));
        }) //cierre de la funcion flecha
        .catch(error => { "error en la funcion analisis :" + console.log(error.response.data) });
}


