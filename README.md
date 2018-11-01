# What is this

This is a demo package for developers who want to integrate keybox to his/her own wallet software. 

To start, you must run [keyboxd](https://github.com/KeyboxWallet/keyboxd) on your PC and connect a keybox hardware via USB or run a [software emulator](https://github.com/KeyboxWallet/software_wallet) on the same PC.

# Files

## getVersion.js

get daemon version.

## getPubkey.js

give a [bip32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) path, get the base64-encoded pubkey .

usage cases:

+ for many crytocurrencies, generate/show address with keybox hardware.

## signReq.js

give a bip32 path and a 256bit message hash, get the sign result .

usage cases:

+ for many cryptocurrencies, sign with keybox hardware.

## multiplyReq.js

give a bip32 path, a peer public key, get the multiply result (ECIES). 

Usage case :

+ for [BitShares](https://bitshares.org/), encrypt message in memo.


