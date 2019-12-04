const wsClient = require( 'jsonrpc-websocket-client' );

const client = new wsClient.default ({
    url:'ws://127.0.0.1:23045',
    protocols: "json-rpc-server"
});

client.on('closed', d=>{
   console.log('connection closed');
});

client.on('notification', notification => {
  console.log('notification received', notification)
});

module.exports = client;
