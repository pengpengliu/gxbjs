"use strict";

exports.__esModule = true;

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = template;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Console print any transaction object with zero default values. */
function template(op) {

    var object = op.toObject(void 0, { use_default: true, annotate: true });

    // visual (with descriptions)
    console.error((0, _stringify2.default)(object, null, 4));

    // usable in a copy-paste

    object = op.toObject(void 0, { use_default: true, annotate: false });

    // copy-paste one-lineer
    console.error((0, _stringify2.default)(object));
}
module.exports = exports["default"];