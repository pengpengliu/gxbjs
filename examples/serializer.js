import {serializeTransaction} from "../lib/tx_serializer";

console.log(serializeTransaction({
    "expiration" : "2018-03-20T20:46:38",
    "extensions" : [

    ],
    "operations" : [
        [
            0,
            {
                "amount" : {
                    "asset_id" : "1.3.1",
                    "amount" : 1000000
                },
                "fee" : {
                    "asset_id" : "1.3.1",
                    "amount" : 2500
                },
                "to" : "1.2.254",
                "memo" : {
                    "nonce" : 2680142845,
                    "to" : "GXC7xSR83xcXECGCtyxboNbuhQwnyjVksgtMLX422nDhSM9d2TPRF",
                    "message" : "70fed4bf910021bd4e01c221dcc93570",
                    "from" : "GXC8H1wXTAUWcTtogBmA5EW8TUWLA6T1kAXwMKYtnNuqAe1VCXFD9"
                },
                "extensions" : [

                ],
                "from" : "1.2.850"
            }
        ]
    ],
    "ref_block_prefix" : 2568833528,
    "ref_block_num" : 53519
}).toString('hex'))
