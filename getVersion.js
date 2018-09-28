
const client = require('./client');

client.open().then( ()=>{
    client.call("getServerVersion",[]).then( r=> {
        console.log(r);
    })
});
