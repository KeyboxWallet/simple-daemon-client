const client = require('./client');
const BN = require('bn.js');
const Tx = require('ethereumjs-tx').FakeTransaction
const txParams = {
    nonce: 0,
    gasPrice: 1000000000,
    gasLimit: 10000,
    to: '0x06fd353aeb1b62bf4c1b34e68a01d2ea6cac6c0e',
    value: new BN('1000000000000000000',10),
};

const tx  = new Tx(txParams);
tx.raw[6] = tx.getChainId();
tx.raw[7] = Buffer.from([]);
tx.raw[8] = Buffer.from([]);

const sTx = tx.serialize();
const unsignedTx = sTx.toString('base64');
console.log(unsignedTx);

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
				hdPath: "bip32/m/44'/60'/0'/0/0",
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
