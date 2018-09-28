const client = require('./client');

var b =  Buffer.alloc(32, 'a'); // simulate hash


client.open().then( ()=>{
    var devId;
    client.call("getDeviceList",{}).then( r=> {
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
                return client.call("signReq", {
				ver: 1,
				path: "bip32/m/44'/60'/0'/0/0",
				hash: b.toString('base64'),
				options: {
					rfc6979: true,
					graphene_canonize: false
				} 
			});
            }
        }
        return false;
    }).then( r=>{
        console.log(r);
    })
});
