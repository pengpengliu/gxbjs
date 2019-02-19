import {Signature,PublicKey} from '../lib'

let sig = '205bc8093489560c8c3b7ce7160290dd350c0da75284f898e7e8e0e55b01c4f9531a8dbcbe8bbc124785e50677045c12593b11da77372260f3bf0993b6ca49e627';
console.log(sig);
console.log(Signature.fromHex(sig).verifyBuffer(Buffer.from("1111"),PublicKey.fromPublicKeyString('GXC6rAtkQUGJoxRR3gCEnYo2PxqtVNwD4zw9zg64qgrEpYqmjf2kh')));
