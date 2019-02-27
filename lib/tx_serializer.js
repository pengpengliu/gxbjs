import types from "./serializer/src/types";
import * as ops from "./serializer/src/operations";
import ByteBuffer from "bytebuffer";
import "babel-polyfill";
import { Serializer } from "./serializer";

function isArrayType(type) {
    return type.indexOf("[]") !== -1;
}

export const serializeCallData = (action, params, abi) => {
    abi = JSON.parse(JSON.stringify(abi));
    let struct = abi.structs.find(s => s.name === action);
    let b = new ByteBuffer(ByteBuffer.DEFAULT_CAPACITY, ByteBuffer.LITTLE_ENDIAN);
    struct.fields.forEach(f => {
        let value = params[f.name];
        let isArrayFlag = false;
        if (isArrayType(f.type)) {
            isArrayFlag = true;
            f.type = f.type.split("[")[0];
        }

        let type = types[f.type];
        if (!type) {
            let t = abi.types.find(t => t.new_type_name === f.type);
            if (t) {
                type = types[t.type];
            }
        }
        if (!type) {
            type = ops[f.type];
        }

        if (type) {
            if (isArrayFlag) {
                type = types.set(type);
            }
            type.appendByteBuffer(b, type.fromObject(value));
        }
    });
    return Buffer.from(b.copy(0, b.offset).toBinary(), "binary");
};

export const serializeTransaction = (transaction)=>{
    return ops.transaction.toBuffer(ops.transaction.fromObject(transaction));
};

export function makeSerializer(abi,action){
    abi = JSON.parse(JSON.stringify(abi));
    let struct = abi.structs.find(s => s.name === action);
    const typeObj = {};

    struct.fields.forEach(f => {
        let isArrayFlag = false;
        if (isArrayType(f.type)) {
            isArrayFlag = true;
            f.type = f.type.split("[")[0];
        }

        let type = types[f.type];
        if (!type) {
            let t = abi.types.find(t => t.new_type_name === f.type);
            if (t) {
                type = types[t.type];
            }
        }
        if (!type) {
            type = ops[f.type];
        }

        if (type) {
            if (isArrayFlag) {
                type = types.set(type);
            }
        }

        typeObj[f.name] = type;
    });

    return new Serializer("temp", typeObj);
}

/**
 * deserialize call data
 * @param {Object} abi - contract abi
 * @param {String} action - call action
 * @param {String} data - data hex string
 */
export function deserializeCallData(abi, action, data){
    // construct serializer
    const serializer = makeSerializer(abi, action);
    // dserialize from hex
    return serializer.toObject(serializer.fromHex(data));
}
