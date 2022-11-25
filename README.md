## Applications

- Principal API
- Certificate generation


## Flow

- Principal API sent a message to certificate service, to generate the certificate

- Certificate microservice return a response (sync/async)


> If can sync/async

- Receive an async response when the e-mail with the certificate is sent


## What do we know?

- REST (latency problem)
- Redis /RabbitMQ / **Kafka**

