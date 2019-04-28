"use strict";

exports.__esModule = true;
exports.serializeTransaction = exports.serializeCallData = undefined;

var _find = require("babel-runtime/core-js/array/find");

var _find2 = _interopRequireDefault(_find);

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

exports.deserializeCallData = deserializeCallData;
exports.makeSerializer = makeSerializer;

var _types = require("./serializer/src/types");

var _types2 = _interopRequireDefault(_types);

var _operations = require("./serializer/src/operations");

var ops = _interopRequireWildcard(_operations);

var _serializer = require("./serializer");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isArrayType(type) {
    return type.indexOf("[]") !== -1;
}

/**
 * serialize call data
 * @param {String} action - call action
 * @param {Object} params - call params
 * @param {Object} abi
 */
var serializeCallData = exports.serializeCallData = function serializeCallData(action, params, abi) {
    var ser = makeSerializer(abi, action);
    return ser.toBuffer(params);
};

/**
 * deserialize call data
 * @param {String} action - call action
 * @param {String} data - data hex string
 * @param {Object} abi - contract abi
 */
function deserializeCallData(action, data, abi) {
    // construct serializer
    var serializer = makeSerializer(abi, action);
    // dserialize from hex
    return serializer.toObject(serializer.fromHex(data));
}

var serializeTransaction = exports.serializeTransaction = function serializeTransaction(transaction) {
    return ops.transaction.toBuffer(ops.transaction.fromObject(transaction));
};

/**
 * make serializer by abi and action
 * @param {Object} abi
 * @param {String} action
 */
function makeSerializer(abi, action) {
    abi = JSON.parse((0, _stringify2.default)(abi));
    var struct = (0, _find2.default)(abi.structs, function (s) {
        return s.name === action;
    });
    var typeObj = {};

    struct.fields.forEach(function (f) {
        var isArrayFlag = false;
        if (isArrayType(f.type)) {
            isArrayFlag = true;
            f.type = f.type.split("[")[0];
        }

        var type = _types2.default[f.type];
        if (!type) {
            var t = (0, _find2.default)(abi.types, function (t) {
                return t.new_type_name === f.type;
            });
            if (t) {
                type = _types2.default[t.type];
            }
        }
        if (!type) {
            type = ops[f.type];
        }

        if (type) {
            if (isArrayFlag) {
                type = _types2.default.array(type, true);
            }
        }

        typeObj[f.name] = type;
    });

    return new _serializer.Serializer("temp", typeObj);
}