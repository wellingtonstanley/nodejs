/**
 * @summary Enviar evento para o Event Hub.
 */

const { EventHubProducerClient } = require("@azure/event-hubs");

const connectionString =  process.env.EVENTHUB_CONNECTION_STRING || ""
const eventHubName =  "";

async function enviarEvento(evento) {

  const producer = new EventHubProducerClient(connectionString, eventHubName);

  console.log('Criando e enviando eventos...');

  try {
    const batchOptions = {
    };

    let batch = await producer.createBatch(batchOptions);
    // Tentando adicionar evento ao EventHub.
    const isAdd = batch.tryAdd(evento);

    if (isAdd) {
      console.log("O evento Simulacao foi adicionado");
    }

    await producer.sendBatch(batch);

    console.log('Evento enviado');


  } catch (err) {
    console.log("Erro ao criar e enviar eventos: ", err);
  }

  await producer.close();
  console.log('Fechando conexao.');
}

module.exports = { enviarEvento };
