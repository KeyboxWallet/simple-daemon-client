
const client = require('./client');

client.open().then( ()=>{
    var devId;
    return client.call("getDeviceList",{})
}).then( r=> {
        console.log(r);
        if( r.errcode == 0 && r.data.length > 0){
            devId = r.data[0].deviceId;
            return client.call("connectDevice", devId)
        }
        return false;
}).then( r=>{
        if( r ) {
            console.log(r);
            if( r.errcode == 0 ) {
                return client.call("getWalletIdentifier", {});
            }
        }
        return false;
}).then( r=>{
        console.log(r);
	process.exit(0);
}).catch( e=>{
       process.exit(1);
});

