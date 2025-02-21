'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _bytebuffer = require('bytebuffer');

var _SerializerValidation = require('../../serializer/src/SerializerValidation');

var _SerializerValidation2 = _interopRequireDefault(_SerializerValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DB_MAX_INSTANCE_ID = _bytebuffer.Long.fromNumber(Math.pow(2, 48) - 1);

var ObjectId = function () {
    function ObjectId(space, type, instance) {
        (0, _classCallCheck3.default)(this, ObjectId);

        this.space = space;
        this.type = type;
        this.instance = instance;
        var instance_string = this.instance.toString();
        var _ObjectId = this.space + '.' + this.type + '.' + instance_string;
        if (!_SerializerValidation2.default.is_digits(instance_string)) {
            throw new ('Invalid object id ' + _ObjectId)();
        }
    }

    ObjectId.fromString = function fromString(value) {
        if (value.space !== undefined && value.type !== undefined && value.instance !== undefined) {
            return value;
        }

        var params = _SerializerValidation2.default.require_match(/^([0-9]+)\.([0-9]+)\.([0-9]+)$/, _SerializerValidation2.default.required(value, "ObjectId"), "ObjectId");
        return new ObjectId(parseInt(params[1]), parseInt(params[2]), _bytebuffer.Long.fromString(params[3]));
    };

    ObjectId.fromLong = function fromLong(long) {
        var space = long.shiftRight(56).toInt();
        var type = long.shiftRight(48).toInt() & 0x00ff;
        var instance = long.and(DB_MAX_INSTANCE_ID);
        return new ObjectId(space, type, instance);
    };

    ObjectId.fromByteBuffer = function fromByteBuffer(b) {
        return ObjectId.fromLong(b.readUint64());
    };

    ObjectId.prototype.toLong = function toLong() {
        return _bytebuffer.Long.fromNumber(this.space).shiftLeft(56).or(_bytebuffer.Long.fromNumber(this.type).shiftLeft(48).or(this.instance));
    };

    ObjectId.prototype.appendByteBuffer = function appendByteBuffer(b) {
        return b.writeUint64(this.toLong());
    };

    ObjectId.prototype.toString = function toString() {
        return this.space + '.' + this.type + '.' + this.instance.toString();
    };

    return ObjectId;
}();

exports.default = ObjectId;
module.exports = exports['default'];