const wsClient = require( 'jsonrpc-websocket-client' );

const client = new wsClient.default ({
    url:'ws://127.0.0.1:23045',
    protocols: "json-rpc-server"
});

module.exports = client;