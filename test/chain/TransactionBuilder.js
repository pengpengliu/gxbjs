// import assert from "assert";
import { TransactionBuilder, PrivateKey, PublicKey, Signature } from "../../lib";
import { Apis } from "gxbjs-ws";

function accMult(arg1, arg2) {
    let m = 0;
    let s1 = arg1.toString();
    let s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length;
    } catch (e) {
    }
    try {
        m += s2.split(".")[1].length;
    } catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
};

describe("TransactionBuilder", () => {
    before(function () {
        /* use wss://bitshares.openledger.info/ws if no local node is available */
        return Apis.instance("ws://192.168.1.118:28090", true).init_promise.then(function () {

        });
    });

    it("send transaction signed by signProvider", () => {
        function signProvider(tr, chain_id) {
            // test key, peep no crime :P
            var private_key = PrivateKey.fromWif("5Hpk8pvJxfqfkVx9F7rEjaUM6AyLLkx69jpxf4tTZk3U67wEKSc");
            var public_key = PublicKey.fromPublicKeyString(private_key.toPublicKey());
            var sig = Signature.signBuffer(
                Buffer.concat([new Buffer(chain_id, "hex"), tr.tr_buffer]),
                private_key,
                public_key
            );

            // must return array buffer
            return [sig.toBuffer()];
        }

        return new Promise((resolve) => {
            let tr = new TransactionBuilder(signProvider);
            tr.add_operation(tr.get_type_operation("transfer", {
                "fee": {
                    "amount": 0,
                    "asset_id": "1.3.1"
                },
                from: "1.2.579",
                to: "1.2.492",
                amount: { amount: accMult("0.01", Math.pow(10, 5)), asset_id: "1.3.1" }
            }));
            return Promise.all([tr.update_head_block(), tr.set_required_fees()]).then(() => {
                tr.broadcast(() => {
                    resolve();
                });
            });
        });
    });


});
