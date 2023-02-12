#### Start the nodejs server

```
node index.js
```

### Test the server with following commands with a second shell
This below command is successfully getting a response
```
curl -x http://localhost:3000 --http0.9 --url http://example.com
```

This below command is not working properly. The TODO part in the index.js file need to be fixed.
```
curl -x http://localhost:3000 --http0.9 --url https://example.com
```
