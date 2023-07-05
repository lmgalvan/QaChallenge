"use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'leogalvan.lmg@gmail.com',
      pass: 'ksvibmufgnvahpyj'
    }
  });
  
  
  async function main() {
    
    const info = await transporter.sendMail({
      from: '"Cypress Report" <foo@example.com>', // sender address
      to: "leogalvan.lmg@gmail.com", // list of receivers
      subject: "Result Tests", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Envio los resultados de los test</b>", // html body
      attachments: [
        {
          filename: 'test-results.txt',
          path: 'test-results.txt'
        }
      ]
    });
  
    console.log("Message sent: %s", info.messageId);

  }
  
  main().catch(console.error);