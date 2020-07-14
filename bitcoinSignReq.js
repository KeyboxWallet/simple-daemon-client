const client = require('./client');

var b =  Buffer.alloc(32, 'a'); // simulate hash

const psbt='cHNidP8BAFUCAAAAAfxYQ0p3gtgd5K062B/c7osQ/0anqR+likV49EuqPEqXAAAAAAD/////ATLmvgAAAAAAGXapFFVbr5TQupSBrzMKs/MFYaeeU3LmiKwAAAAAAAEA+gIAAAAAAQGsJlkWa4i2kC2B3bRoZ/gc31sZOIkFYs57SzpyFu6p7wAAAAAXFgAUY590KijYsvZFzZwrMcMTrzag41/+////Arr5vgAAAAAAGXapFHOlrDIdCMid1V0YUaQFcUvCvwlniKxuvNKEIQAAABepFOnI4TOSEKwVgRGsmWgopQAqOJQohwJIMEUCIQCiTRUggZGggglytDNdhTl9xWbaiIrBIFaJu6Ukb53URgIgP0LLeZWDe3B8CrdBC+o8PeKy7ULFHI2UXtcO5OiVF9UBIQNWs5jbmBiHGjyCv9mPul2XLmiR7BLmuFkUnWm9FNy9tLsFFgAiBgMJ0lWs5zV3s1ugL8OcmkRZeb5Y7TPkM4kKDHjJ8BS+9hiw8Aw9LAAAgAAAAIAAAACAAAAAAAAAAAAAAA==';


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
