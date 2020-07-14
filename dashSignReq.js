const client = require('./client');

var b =  Buffer.alloc(32, 'a'); // simulate hash

const psbt='cHNidP8BAFUCAAAAAdINKppDorARsZQd3WaxDwsg3YxvtPZXxiAr8uzLHDSpAAAAAAD/////AYT5YgYAAAAAGXapFBLeAWMPkpjcYc6Zgd+D5gctGKy3iKwAAAAAAAEA4QIAAAABMxiQniwLgA0W+jx9swNyRvj5n2DfefeDbsjQif3zv9MBAAAAakcwRAIgM0ZaPziJaHUw5lbOGVrzJozFG3XmcJTQTRoEpBkcGpcCIEwAXmsnDoPivcGiEwIozziXXUTMcCvprNqZMmcHn0WGASECbEL24aVshPLN2qfJPj3KmBubZ4D4XypRtA/B0n4rcG/+////ArD6YgYAAAAAGXapFIak07i7Ljxyvg4AyobbvcqFEGY/iKzZFHJcAwAAABl2qRTXWNdPjznILBA39yHOktc8NirrFIisZS8FACIGAjx2mQ1jJylA7js84XQqHsS2b3FWvdNBFcEXKpmWO3w2GLDwDD0sAACAAQAAgAAAAIAAAAAAAAAAAAAA';

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
                return client.call("bitcoinSignReq", {
				ver: 1,
				testnet: true,
				psbt,
				coin: 'dash',
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
	process.exit(0);
    })
});
