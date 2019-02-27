import assert from "assert";
import {serializeCallData, deserializeCallData} from "../../lib/tx_serializer.js";
import {bank_abi} from "./static/abi.js";

describe("operation test", function() {
    it("serialize", function(){
        console.log("dessss", serializeCallData(bank_abi, "withdraw",));
    });
    it("deserialize", function(){
        console.log("dessss", deserializeCallData(bank_abi, "withdraw","09796f75786975313233a0860100000000000100000000000000"));
    });
});