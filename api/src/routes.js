import { Router } from "express";


import { CompressionTypes } from "kafkajs";

const routes = Router();

// microservice call
routes.post('/certifications', async (req, res) => {
  // console.log(req.producer)

  const { producer } = req;

  await producer.send({
    topic: "issue-certificate",
    messages: [
      {
        value: JSON.stringify({
          user: { id: 1, name: req.query.name },
          course: "Kafka with Node.js",
          grade: 5
        })
      }
    ],
    compression: CompressionTypes.GZIP
  });


  return res.status(200).json({ success: true });
});

export default routes;