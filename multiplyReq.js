const client = require('./client');


var b =  Buffer.alloc(64, 'x'); // simulate pubkey
var p = 'Hagov1Y5SgXBidDCaIpSJCL57ot2JgUIzo1OTrTtyltrlJb6xlXymtlOlLkaFREeEpXZWdNXY1tikgjDIf/NpA==';

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
                return client.call("multiplyReq", {
				ver: 1,
				path: "bip32/m/48'/1'/1'/0/0",
				pubkey: p, 
			});
            }
        }
        return false;
    }).then( r=>{
        console.log(r);
        process.exit(0);
    }).catch( e=>{
        process.exit(1);
   })

