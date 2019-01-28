import {serializeTransaction} from "../lib/tx_serializer";
import { Signature, PrivateKey } from "../lib/ecc";

console.log(serializeTransaction({
        "expiration" : "2019-01-28T14:34:06",
        "extensions" : [

        ],
        "operations" : [
            [
                6,
                {
                    "account" : "1.2.1110",
                    "new_options" : {
                        "num_committee" : 2,
                        "votes" : [
                            "1:1",
                            "0:12",
                            "0:79",
                            "1:80",
                            "0:103",
                            "1:104",
                            "1:135",
                            "1:136",
                            "0:145",
                            "0:146"
                        ],
                        "extensions" : [

                        ],
                        "voting_account" : "1.2.5",
                        "memo_key" : "GXC69R784krfXRuFYMuNwhTTnMGPMuCSSng3WPssL6vrXRqTYCLT4",
                        "num_witness" : 2
                    },
                    "extensions" : [

                    ],
                    "fee" : {
                        "asset_id" : "1.3.1",
                        "amount" : 109
                    }
                }
            ]
        ],
        "ref_block_prefix" : 61153748,
        "ref_block_num" : 54375
    }
).toString('hex'));


let signWithZ = Signature.signBuffer(Buffer.concat([new Buffer('c2af30ef9340ff81fd61654295e98a1ff04b23189748f86727d0b26b40bb0ff4','hex'),new Buffer('f0cc74a37ede09ba415c0100da0400000000000001d608fe0140420f0000000000010102a596d2dfcdfec6d745bfa6381006870b0aab9dd3bffe382a00f87ff331d48d4803940e48cb1fe1c5975ee9ea5876ccbbe132d69396eebc68201d0198588e44b887684775be6068010030e2fff4995e6ca5eab02d62b7e643e3e2fe8454f809bf40f31991f0463a0685cf3c0d0869b4cafaadb074eaba8c9811460000','hex')]),PrivateKey.fromWif('5J7Yu8zZD5oV9Ex7npmsT3XBbpSdPZPBKBzLLQnXz5JHQVQVfNT')).toHex();

let signWithoutZ = Signature.signBuffer(Buffer.concat([new Buffer('c2af30ef9340ff81fd61654295e98a1ff04b23189748f86727d0b26b40bb0ff4','hex'),new Buffer('f0cc74a37ede8949415c0100da0400000000000001d608fe0140420f0000000000010102a596d2dfcdfec6d745bfa6381006870b0aab9dd3bffe382a00f87ff331d48d4803940e48cb1fe1c5975ee9ea5876ccbbe132d69396eebc68201d0198588e44b887684775be6068010030e2fff4995e6ca5eab02d62b7e643e3e2fe8454f809bf40f31991f0463a0685cf3c0d0869b4cafaadb074eaba8c9811460000','hex')]),PrivateKey.fromWif('5J7Yu8zZD5oV9Ex7npmsT3XBbpSdPZPBKBzLLQnXz5JHQVQVfNT')).toHex();


console.log(signWithZ, signWithoutZ)
