const client = require('./client');

var b =  Buffer.alloc(32, 'a'); // simulate hash

const psbt='cHNidP8BAFMCAAAAAdrQMS8Z42/x8isplpJ8jhg+OSxMHxnbpZoQGa/18yOfAQAAAAD/////ARH53gAAAAAAF6kUfO3rJu1w+6hSQKLhI0MG3vCabaSHAAAAAAABASCZDN8AAAAAABepFBWl09ju9wyNRDe/n2jaTn9T//HchwEEFgAUc6WsMh0IyJ3VXRhRpAVxS8K/CWciBgMJ0lWs5zV3s1ugL8OcmkRZeb5Y7TPkM4kKDHjJ8BS+9hiw8Aw9LAAAgAAAAIAAAACAAAAAAAAAAAAAAA==';


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
				coin: 'btc',
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
