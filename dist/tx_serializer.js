"use strict";

exports.__esModule = true;
exports.serializeTransaction = exports.serializeCallData = undefined;

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _types = require("./serializer/src/types");

var _types2 = _interopRequireDefault(_types);

var _operations = require("./serializer/src/operations");

var ops = _interopRequireWildcard(_operations);

var _bytebuffer = require("bytebuffer");

var _bytebuffer2 = _interopRequireDefault(_bytebuffer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isArrayType(type) {
    return type.indexOf("[]") !== -1;
}

var serializeCallData = exports.serializeCallData = function serializeCallData(action, params, abi) {
    abi = JSON.parse((0, _stringify2.default)(abi));
    var struct = abi.structs.find(function (s) {
        return s.name === action;
    });
    var b = new _bytebuffer2.default(_bytebuffer2.default.DEFAULT_CAPACITY, _bytebuffer2.default.LITTLE_ENDIAN);
    struct.fields.forEach(function (f) {
        var value = params[f.name];
        var isArrayFlag = false;
        if (isArrayType(f.type)) {
            isArrayFlag = true;
            f.type = f.type.split("[")[0];
        }

        var type = _types2.default[f.type];
        if (!type) {
            var t = abi.types.find(function (t) {
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
                type = _types2.default.set(type);
            }
            type.appendByteBuffer(b, type.fromObject(value));
        }
    });
    return Buffer.from(b.copy(0, b.offset).toBinary(), "binary");
};

var serializeTransaction = exports.serializeTransaction = function serializeTransaction(transaction) {
    return ops.transaction.toBuffer(ops.transaction.fromObject(transaction));
};