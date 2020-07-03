const client = require('./client');

const Tx = require('ethereumjs-tx').FakeTransaction
const txParams = {
    nonce: '0x00',
    gasPrice: '0x0918e472a00',
    gasLimit: '0x3000',
    to: '0x06fd353aeb1b62bf4c1b34e68a01d2ea6cac6c0e',
    value: '0x39292999',
    data: '0x'
};

const tx  = new Tx(txParams);
const sTx = tx.serialize();
const unsignedTx = sTx.toString('base64');


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
                return client.call("ethereumSignReq", {
				ver: 1,
				hdPath: "m/44'/60'/0'/0/0",
				unsignedTx,
			});
            }
        }
        return false;
    }).then( r=>{
        console.log(r);
	process.exit(0);
    })
});
