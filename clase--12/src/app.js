/** CLASE 12 - MAILING Y MENSAJERIA **/

//Temas de hoy: 
//1) Protocolo SMTP. 
//2) Nodemailer. 
//3) Twilio: envio de sms 

import express from "express";
import nodemailer from "nodemailer"; 
import twilio from "twilio";
const app = express(); 
const PUERTO = 8080; 

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(express.static("./src/public"));

//Rutas 
// app.get("/", (req, res) => {
//     res.send("Bienvenidos!"); 
// })

//Vamos a crear un objeto especial llamado "transporte". Aca voy a configurar el servicio de email que voy a utilizar. 

const transport = nodemailer.createTransport({
    service: "gmail", 
    port: 587, 
    auth: {
        user: "coderhouse70080@gmail.com", 
        pass: "fdnv ihnc adbn hlhv"
    }
})

//Ruta para enviar un email: 

app.get("/mail", async (req, res) => {
    try {
        await transport.sendMail({
            from: "Firulais <coderhouse70080@gmail.com>", 
            to: "stocaimaza@hotmail.com", 
            subject: "Correo de prueba", 
            html: `<h1> Olis, te secuestramos el Visual, paga rescate! </h1>
                    <img src = "cid:patito1">
                    <p>Hola, estoy es un parrafo </p>`, 
            //Para enviar como adjunto: 
            attachments: [{
                filename: "patito.jpg", 
                path: "./src/public/img/patito.jpg",
                cid: "patito1"
            }]

        })
        res.send("Correo electronico enviado correctamente"); 
    } catch (error) {
        res.status(500).send("Aumentara todo mañana!! "); 
    }
})

//Enviamos mail desde un formulario: 

app.post("/enviarmensaje", async (req, res) => {
    const {email, mensaje} = req.body; 

    try {
        await transport.sendMail({
            from: "Estudio de Cobranzas <cobranzas@gmail.com>",
            to: email, 
            subject: "Deuda Bancaria", 
            text: mensaje
        })

        res.send("Correo enviado correctamente!"); 
    } catch (error) {
        res.status(500).send("Error al enviar un mensaje, todo es terrible, nunca pasará"); 
    }
})

//TWILIO: servicio que nos permite enviar sms, whatsapp, chatbots, mensajes de voz pregrabados. 

const TWILIO_ACCOUNT_SID = "";
const TWILIO_AUTH_TOKEN = ""; 
const TWILIO_SMS_NUMBER = ""; 

//Crear nuestro "cliente": 
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SMS_NUMBER); 

app.get("/sms", async(req, res) => {
    await client.messages.create({
        body: "Su auto ya esta listo para retirar", 
        from: TWILIO_SMS_NUMBER, 
        to: "+"
    })
    res.send("Enviado el SMS!"); 
})


app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
})