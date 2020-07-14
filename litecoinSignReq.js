const client = require('./client');

var b =  Buffer.alloc(32, 'a'); // simulate hash

const psbt='cHNidP8BAFUCAAAAAdvsrnzcLPJzAYgMrcD0M19kCXOwrS5llUVOgO6BC5O3AAAAAAD/////AXA6DwAAAAAAGXapFBLeAWMPkpjcYc6Zgd+D5gctGKy3iKwAAAAAAAEA/QMBAQAAAAABAb04ADR0Q60hgyytqejLCj+YiZ4vt74l8xJdZShHDPLhAQAAAADw////A0BCDwAAAAAAGXapFIak07i7Ljxyvg4AyobbvcqFEGY/iKzscFsAAAAAABYAFIDeP1OcRKv/iNXva4dXZcUzv/MPAAAAAAAAAAAZahdodHRwczovL3RsdGMuYml0YXBzLmNvbQJHMEQCIHiBm3+F8P4dU8EKeP6UxPxJoWRmerT9kFmtyzUpTHUhAiAM+2TXv/UcrJXVXYe3kqbBThm87PJUgKsK7lzd3naY5wEhAqd63QdhCHiY1Wzf+PZL/CBWZzIeJEaiRRyh1troAOZ+AAAAACIGAjx2mQ1jJylA7js84XQqHsS2b3FWvdNBFcEXKpmWO3w2GLDwDD0sAACAAQAAgAAAAIAAAAAAAAAAAAAiAgOG/Rt9dUFuvnRkIrz17RIkUrvLWguv/5K8EETubu9T5hiw8Aw9LAAAgAEAAIAAAACAAAAAAAEAAAAA';

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
				coin: 'ltc',
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
