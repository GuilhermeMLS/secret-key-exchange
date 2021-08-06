# Secret Key Exchange

A simple client-server HTTP communication to send encrypted messages using the Diffie-Hellman model.

## Installing

```bash
$ npm install
```

## Running (dev mode)

```bash
$ npm run start:dev
```

## Testing

Hit POST `localhost:3001/start` with the following payload
```json
{
  "message": "Somebody once told me the world is gonna roll me"
}
```
Or simply
```bash
$ curl --location --request POST 'localhost:3001/start' --header 'Content-Type: application/json' --data-raw '{"message" : "Somebody once told me the world is gonna roll me"}'
```

you should be able to see the execution logs at the application console.
