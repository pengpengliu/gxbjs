import assert from "assert";
import { serializeCallData, deserializeCallData } from "../../lib/tx_serializer.js";
import { bank_abi } from "./static/abi.js";

describe("operation test", function () {
    it("serialize", function () {
        console.log("seeeeesss", serializeCallData("withdraw", {
            to_account: "youxiu123",
            amount: { amount: "100000", asset_id: "1" }
        }, bank_abi));
    });
    it("deserialize", function () {
        console.log("dessss", deserializeCallData("withdraw", "09796f75786975313233a0860100000000000100000000000000", bank_abi));
    });
});