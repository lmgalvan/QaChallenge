# Cypress Challenge 
Entrega de challenge Calendar App por Leandro Galván.

# Información del proyecto base

Este proyecto fue creado usando:
- Node 16
- Cypress 12
- xpath_cypress ^1.0.2
- nodemailer ^6.9.3

## Scripts

Para instalar todas las dependencias necesarias:
### `npm install`

Para prender el proyecto de cypress en modo dev
### `npm run cypress:open`

Para ejecutar test y envio de mail

###  `npm run testAll`
- Crear un comando que corra todos los test

###  `npm run testNoLast`
- Crear un comando que corra todos los tests menos el ultimo

###  `npm run testLast`
- Crear un comando que corra unicamente el ultimo test case ( el que borra el dia de la marmota )

# Donde crear el smtp

-En la raiz del proyecto en el archivo Mailer.js dentro de la constante transporter 

```js
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'leogalvan.lmg@gmail.com',
      pass: 'ksvibmufgnvahpyj'
    }
  });
```

# Donde ingresar el mail destinatario del reporte de los test

-En la raiz del proyecto en el archivo Mailer.js dentro del a constante "info"

```js
const info = await transporter.sendMail({
      from: '"Cypress Report" <foo@example.com>', // remitente
      to: "leogalvan.lmg@gmail.com", // destinatarios
      subject: "Result Tests", 
      text: "Hello world?", 
      html: "<b>Envio los resultados de los test</b>",
      attachments: [
        {
          filename: 'test-results.txt',
          path: 'test-results.txt'
        }
      ]
      });
```

# El nombre del reporte esta definido en los scripts, en este caso seria test-results.txt

```json
"testAll": "npx cypress run --spec cypress/e2e/all/all.cy.js > test-results.txt && node Mailer.js",
```
