const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

const sqs = new AWS.SQS();

exports.handler = async (event) => {
    const pattern = new RegExp('^[A-Z]+$', 'i');

    try {

        if (!event.body || !event.body.name) {
            console.log("Se debe incluir un name en el body")
            return {
                statusCode: 400,
                body: JSON.stringify({error: "Se debe incluir un name en el body"})
            };
        } else if (!pattern.test(event.body.name)) {
            console.log("El nombre contiene caracteres inválidos")
            return {
                statusCode: 400,
                body: JSON.stringify({error: "El nombre contiene caracteres inválidos"})
            };
        }




        await sqs.sendMessage({
            MessageBody: JSON.stringify({
                name: JSON.parse(event.body).name || 'Default Name'
            }),
            QueueUrl: 'https://sqs.us-east-2.amazonaws.com/066987178365/prueba-lunes'
        }).promise();
    }
    catch (err) {
        console.log(err);

        return {
            statusCode: 500,
            body: JSON.stringify(err)
        };
    }

    return { statusCode: 200 };
};
