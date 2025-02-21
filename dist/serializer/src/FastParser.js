'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _PublicKey = require('../../ecc/src/PublicKey');

var _PublicKey2 = _interopRequireDefault(_PublicKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FastParser = function () {
    function FastParser() {
        (0, _classCallCheck3.default)(this, FastParser);
    }

    FastParser.fixed_data = function fixed_data(b, len, buffer) {
        if (!b) {
            return;
        }
        if (buffer) {
            var data = buffer.slice(0, len).toString('binary');
            b.append(data, 'binary');
            while (len-- > data.length) {
                b.writeUint8(0);
            }
        } else {
            var b_copy = b.copy(b.offset, b.offset + len);
            b.skip(len);
            return new Buffer(b_copy.toBinary(), 'binary');
        }
    };

    FastParser.public_key = function public_key(b, _public_key) {
        if (!b) {
            return;
        }
        if (_public_key) {
            var buffer = _public_key.toBuffer();
            b.append(buffer.toString('binary'), 'binary');
            return;
        } else {
            buffer = FastParser.fixed_data(b, 33);
            return _PublicKey2.default.fromBuffer(buffer);
        }
    };

    FastParser.ripemd160 = function ripemd160(b, _ripemd) {
        if (!b) {
            return;
        }
        if (_ripemd) {
            FastParser.fixed_data(b, 20, _ripemd);
            return;
        } else {
            return FastParser.fixed_data(b, 20);
        }
    };

    FastParser.time_point_sec = function time_point_sec(b, epoch) {
        if (epoch) {
            epoch = Math.ceil(epoch / 1000);
            b.writeInt32(epoch);
            return;
        } else {
            epoch = b.readInt32(); // fc::time_point_sec
            return new Date(epoch * 1000);
        }
    };

    return FastParser;
}();

exports.default = FastParser;
module.exports = exports['default'];