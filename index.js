const http = require("http");


const server = http.createServer();

server.on('connect', (req, socket, head) => {
    console.log(">> connect");

    // TODO these 2 lines are not working. This part need to be fixed.
    // After 2 seconds, the commandline gets "curl: (56) Proxy CONNECT aborted"
    // I need it to show ">> Another function" in the console of curl command
    setTimeout(() => {
        socket.write(">> Another function");
        socket.end();
    }, 2000);
});

server.on('connection', (socket) => {

    console.log(">> connection");

    socket.once('data', (data) => {

        socket.on("error", (err) => {
            console.log("_____ Client to proxy error");
            console.log(err);
        });

        let isTLSConnection = data.toString().indexOf("CONNECT") !== -1;
        console.log(data.toString());

        if (!isTLSConnection) {
            socket.write("\r\nHello World!\r\n");
            socket.end();
        }

    });

});

server.on("error", (err) => {
    console.log("_____ Some internal server error occurred");
    console.log(err);
});

server.on("close", () => {
    console.log("_____ Client disconnected");
});

server.listen(
    {
        host: "0.0.0.0",
        port: 3000,
    },
    () => {
        console.log("_____ Server listening on http://localhost:3000");
    }
);
