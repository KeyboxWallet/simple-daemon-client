
const client = require('./client');

if (process.argv.length != 3 ){
	console.error("usage : ", process.argv[1], "<path i.e \"bip32/m/44'/0'/0'/0/0\">");
	process.exit(1);
}

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
                return client.call("getPublicKeyFromPath", process.argv[2]);
            }
        }
        return false;
}).then( r=>{
        console.log(r);
	process.exit(0);
}).catch( e=>{
       process.exit(1);
});

