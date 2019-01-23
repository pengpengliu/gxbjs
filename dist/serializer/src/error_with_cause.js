"use strict";

exports.__esModule = true;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Exception nesting.  */
var ErrorWithCause = function () {
    function ErrorWithCause(message, cause) {
        (0, _classCallCheck3.default)(this, ErrorWithCause);

        this.message = message;
        if (typeof cause !== "undefined" && cause !== null ? cause.message : undefined) {
            this.message = "cause\t" + cause.message + "\t" + this.message;
        }

        var stack = ""; //(new Error).stack
        if (typeof cause !== "undefined" && cause !== null ? cause.stack : undefined) {
            stack = "caused by\n\t" + cause.stack + "\t" + stack;
        }

        this.stack = this.message + "\n" + stack;
    }

    ErrorWithCause.throw = function _throw(message, cause) {
        var msg = message;
        if (typeof cause !== "undefined" && cause !== null ? cause.message : undefined) {
            msg += "\t cause: " + cause.message + " ";
        }
        if (typeof cause !== "undefined" && cause !== null ? cause.stack : undefined) {
            msg += "\n stack: " + cause.stack + " ";
        }
        throw new Error(msg);
    };

    return ErrorWithCause;
}();

exports.default = ErrorWithCause;
module.exports = exports["default"];