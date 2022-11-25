import express from 'express';
import { Kafka, logLevel } from 'kafkajs';

import routes from './routes.js';


const app = express();

/**
 * @description create connection with kafka, using container name
 */
const kafka = new Kafka({
  clientId: "api",
  logLevel: logLevel.WARN, // disable logs
  brokers: ["localhost:9092", /*"kafka:9092", "kafka2:9092"*/] // kafka instances
}); // as the app is not inside docker-compose the code doesn't see the service name (kafka)




// making it available for all routes
const producer = kafka.producer();

app.use((req, res, next) => {
  req.producer = producer;
  return next();

})
// 

const consumer = kafka.consumer({ groupId: "certificate-group-receiver" });



app.use(routes);

const run = async () => {
  await producer.connect().catch(err => console.log(err));
  await consumer.connect().catch(err => console.log(err));
  await consumer.subscribe({ topic: "certification-response" });

  await consumer.run({
    eachMessage: async ({ message, partition, topic }) => {
      console.log('=>', String(message.value))
    }
  })

  app.listen(3333);

};

run().catch(console.error)


