import {serializeTransaction} from "../lib/tx_serializer";
import { Signature, PrivateKey } from "../lib/ecc";

console.log(serializeTransaction({
        "ref_block_num": 52464,
        "ref_block_prefix": 3732841332,
        "expiration": "2019-01-18T11:35:37",
        "operations": [
            [
                0,
                {
                    "fee": {
                        "amount": "1242",
                        "asset_id": "1.3.1"
                    },
                    "from": "1.2.1110",
                    "to": "1.2.254",
                    "amount": {
                        "amount": "1000000",
                        "asset_id": "1.3.1"
                    },
                    "memo": {
                        "from": "GXC69R784krfXRuFYMuNwhTTnMGPMuCSSng3WPssL6vrXRqTYCLT4",
                        "to": "GXC7xSR83xcXECGCtyxboNbuhQwnyjVksgtMLX422nDhSM9d2TPRF",
                        "nonce": "396239698216808",
                        "message": "e2fff4995e6ca5eab02d62b7e643e3e2fe8454f809bf40f31991f0463a0685cf3c0d0869b4cafaadb074eaba8c981146"
                    },
                    "extensions": []
                }
            ]
        ],
        "extensions": [],
        "signatures": [
            "1f140f78bfac0984f5a5945d0dd489bc33f480a35651aa7a5a3fcc197f40d3bdf425061ada73769228083039bf37507e953d7c4cd45c955e2a6766b15afee8c577"
        ]
    }
).toString('hex'));


let signWithZ = Signature.signBuffer(Buffer.concat([new Buffer('c2af30ef9340ff81fd61654295e98a1ff04b23189748f86727d0b26b40bb0ff4','hex'),new Buffer('f0cc74a37ede09ba415c0100da0400000000000001d608fe0140420f0000000000010102a596d2dfcdfec6d745bfa6381006870b0aab9dd3bffe382a00f87ff331d48d4803940e48cb1fe1c5975ee9ea5876ccbbe132d69396eebc68201d0198588e44b887684775be6068010030e2fff4995e6ca5eab02d62b7e643e3e2fe8454f809bf40f31991f0463a0685cf3c0d0869b4cafaadb074eaba8c9811460000','hex')]),PrivateKey.fromWif('5J7Yu8zZD5oV9Ex7npmsT3XBbpSdPZPBKBzLLQnXz5JHQVQVfNT')).toHex();

let signWithoutZ = Signature.signBuffer(Buffer.concat([new Buffer('c2af30ef9340ff81fd61654295e98a1ff04b23189748f86727d0b26b40bb0ff4','hex'),new Buffer('f0cc74a37ede8949415c0100da0400000000000001d608fe0140420f0000000000010102a596d2dfcdfec6d745bfa6381006870b0aab9dd3bffe382a00f87ff331d48d4803940e48cb1fe1c5975ee9ea5876ccbbe132d69396eebc68201d0198588e44b887684775be6068010030e2fff4995e6ca5eab02d62b7e643e3e2fe8454f809bf40f31991f0463a0685cf3c0d0869b4cafaadb074eaba8c9811460000','hex')]),PrivateKey.fromWif('5J7Yu8zZD5oV9Ex7npmsT3XBbpSdPZPBKBzLLQnXz5JHQVQVfNT')).toHex();


console.log(signWithZ, signWithoutZ)
