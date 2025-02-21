"use strict";

exports.__esModule = true;
exports.checksum160 = exports.object_id_type = exports.name_to_string = exports.string_to_name = undefined;

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _SerializerValidation = require("./SerializerValidation");

var _SerializerValidation2 = _interopRequireDefault(_SerializerValidation);

var _FastParser = require("./FastParser");

var _FastParser2 = _interopRequireDefault(_FastParser);

var _ChainTypes = require("../../chain/src/ChainTypes");

var _ChainTypes2 = _interopRequireDefault(_ChainTypes);

var _ObjectId = require("../../chain/src/ObjectId");

var _ObjectId2 = _interopRequireDefault(_ObjectId);

var _ecc = require("../../ecc");

var _bytebuffer = require("bytebuffer");

var _bytebuffer2 = _interopRequireDefault(_bytebuffer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Low-level types that make up operations

var Types = {};

var HEX_DUMP = process.env.npm_config__graphene_serializer_hex_dump;

Types.uint8 = {
    fromByteBuffer: function fromByteBuffer(b) {
        return b.readUint8();
    },
    appendByteBuffer: function appendByteBuffer(b, object) {
        _SerializerValidation2.default.require_range(0, 0xFF, object, "uint8 " + object);
        b.writeUint8(object);
        return;
    },
    fromObject: function fromObject(object) {
        _SerializerValidation2.default.require_range(0, 0xFF, object, "uint8 " + object);
        return object;
    },
    toObject: function toObject(object) {
        var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (debug.use_default && object === undefined) {
            return 0;
        }
        _SerializerValidation2.default.require_range(0, 0xFF, object, "uint8 " + object);
        return parseInt(object);
    }
};

Types.uint16 = {
    fromByteBuffer: function fromByteBuffer(b) {
        return b.readUint16();
    },
    appendByteBuffer: function appendByteBuffer(b, object) {
        _SerializerValidation2.default.require_range(0, 0xFFFF, object, "uint16 " + object);
        b.writeUint16(object);
        return;
    },
    fromObject: function fromObject(object) {
        _SerializerValidation2.default.require_range(0, 0xFFFF, object, "uint16 " + object);
        return object;
    },
    toObject: function toObject(object) {
        var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (debug.use_default && object === undefined) {
            return 0;
        }
        _SerializerValidation2.default.require_range(0, 0xFFFF, object, "uint16 " + object);
        return parseInt(object);
    }
};

Types.uint32 = {
    fromByteBuffer: function fromByteBuffer(b) {
        return b.readUint32();
    },
    appendByteBuffer: function appendByteBuffer(b, object) {
        _SerializerValidation2.default.require_range(0, 0xFFFFFFFF, object, "uint32 " + object);
        b.writeUint32(object);
        return;
    },
    fromObject: function fromObject(object) {
        _SerializerValidation2.default.require_range(0, 0xFFFFFFFF, object, "uint32 " + object);
        return object;
    },
    toObject: function toObject(object) {
        var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (debug.use_default && object === undefined) {
            return 0;
        }
        _SerializerValidation2.default.require_range(0, 0xFFFFFFFF, object, "uint32 " + object);
        return parseInt(object);
    }
};

var MIN_SIGNED_32 = -1 * Math.pow(2, 31);
var MAX_SIGNED_32 = Math.pow(2, 31) - 1;

Types.varint32 = {
    fromByteBuffer: function fromByteBuffer(b) {
        return b.readVarint32();
    },
    appendByteBuffer: function appendByteBuffer(b, object) {
        _SerializerValidation2.default.require_range(MIN_SIGNED_32, MAX_SIGNED_32, object, "uint32 " + object);
        b.writeVarint32(object);
        return;
    },
    fromObject: function fromObject(object) {
        _SerializerValidation2.default.require_range(MIN_SIGNED_32, MAX_SIGNED_32, object, "uint32 " + object);
        return object;
    },
    toObject: function toObject(object) {
        var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (debug.use_default && object === undefined) {
            return 0;
        }
        _SerializerValidation2.default.require_range(MIN_SIGNED_32, MAX_SIGNED_32, object, "uint32 " + object);
        return parseInt(object);
    }
};

Types.int64 = {
    fromByteBuffer: function fromByteBuffer(b) {
        return b.readInt64();
    },
    appendByteBuffer: function appendByteBuffer(b, object) {
        _SerializerValidation2.default.required(object);
        b.writeInt64(_SerializerValidation2.default.to_long(object));
        return;
    },
    fromObject: function fromObject(object) {
        _SerializerValidation2.default.required(object);
        return _SerializerValidation2.default.to_long(object);
    },
    toObject: function toObject(object) {
        var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (debug.use_default && object === undefined) {
            return "0";
        }
        _SerializerValidation2.default.required(object);
        return _SerializerValidation2.default.to_long(object).toString();
    }
};

Types.uint64 = {
    fromByteBuffer: function fromByteBuffer(b) {
        return b.readUint64();
    },
    appendByteBuffer: function appendByteBuffer(b, object) {
        b.writeUint64(_SerializerValidation2.default.to_long(_SerializerValidation2.default.unsigned(object), undefined, true));
        return;
    },
    fromObject: function fromObject(object) {
        return _SerializerValidation2.default.to_long(_SerializerValidation2.default.unsigned(object), undefined, true);
    },
    toObject: function toObject(object) {
        var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (debug.use_default && object === undefined) {
            return "0";
        }
        return _SerializerValidation2.default.to_long(object).toString();
    }
};

Types.string = {
    fromByteBuffer: function fromByteBuffer(b) {
        var b_copy;
        var len = b.readVarint32();
        b_copy = b.copy(b.offset, b.offset + len), b.skip(len);
        return new Buffer(b_copy.toBinary(), "binary");
    },
    appendByteBuffer: function appendByteBuffer(b, object) {
        _SerializerValidation2.default.required(object);
        var len = typeof object === "string" ? _bytebuffer2.default.calculateUTF8Bytes(object) : object.length;
        b.writeVarint32(len);
        b.append(object, "utf8");
        return;
    },
    fromObject: function fromObject(object) {
        _SerializerValidation2.default.required(object);
        return new Buffer(object);
    },
    toObject: function toObject(object) {
        var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (debug.use_default && object === undefined) {
            return "";
        }
        return object.toString();
    }
};

Types.bytes = function (size) {
    return {
        fromByteBuffer: function fromByteBuffer(b) {
            if (size === undefined) {
                var b_copy;
                var len = b.readVarint32();
                b_copy = b.copy(b.offset, b.offset + len), b.skip(len);
                return new Buffer(b_copy.toBinary(), "binary");
            } else {
                b_copy = b.copy(b.offset, b.offset + size), b.skip(size);
                return new Buffer(b_copy.toBinary(), "binary");
            }
        },
        appendByteBuffer: function appendByteBuffer(b, object) {
            _SerializerValidation2.default.required(object);
            if (typeof object === "string") object = new Buffer(object, "hex");

            if (size === undefined) {
                b.writeVarint32(object.length);
            }
            b.append(object.toString("binary"), "binary");
            return;
        },
        fromObject: function fromObject(object) {
            _SerializerValidation2.default.required(object);
            if (Buffer.isBuffer(object)) return object;

            return new Buffer(object, "hex");
        },
        toObject: function toObject(object) {
            var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            if (debug.use_default && object === undefined) {
                var zeros = function zeros(num) {
                    return new Array(num).join("00");
                };
                return zeros(size);
            }
            _SerializerValidation2.default.required(object);
            return object.toString("hex");
        }
    };
};

Types.bool = {
    fromByteBuffer: function fromByteBuffer(b) {
        return b.readUint8() === 1;
    },
    appendByteBuffer: function appendByteBuffer(b, object) {
        // supports boolean or integer
        b.writeUint8(JSON.parse(object) ? 1 : 0);
        return;
    },
    fromObject: function fromObject(object) {
        return JSON.parse(object) ? true : false;
    },
    toObject: function toObject(object) {
        var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (debug.use_default && object === undefined) {
            return false;
        }
        return JSON.parse(object) ? true : false;
    }
};

Types.void = {
    fromByteBuffer: function fromByteBuffer(b) {
        throw new Error("(void) undefined type");
    },
    appendByteBuffer: function appendByteBuffer(b, object) {
        throw new Error("(void) undefined type");
    },
    fromObject: function fromObject(object) {
        throw new Error("(void) undefined type");
    },
    toObject: function toObject(object) {
        var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (debug.use_default && object === undefined) {
            return undefined;
        }
        throw new Error("(void) undefined type");
    }
};

Types.array = function (st_operation) {
    var no_sort = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    return {
        fromByteBuffer: function fromByteBuffer(b) {
            var size = b.readVarint32();
            if (HEX_DUMP) {
                console.log("varint32 size = " + size.toString(16));
            }
            var result = [];
            for (var i = 0; 0 < size ? i < size : i > size; 0 < size ? i++ : i++) {
                result.push(st_operation.fromByteBuffer(b));
            }
            if (!no_sort) {
                return sortOperation(result, st_operation);
            }
            return result;
        },
        appendByteBuffer: function appendByteBuffer(b, object) {
            _SerializerValidation2.default.required(object);
            if (!no_sort) {
                object = sortOperation(object, st_operation);
            }
            b.writeVarint32(object.length);
            for (var i = 0, o; i < object.length; i++) {
                o = object[i];
                st_operation.appendByteBuffer(b, o);
            }
        },
        fromObject: function fromObject(object) {
            _SerializerValidation2.default.required(object);
            if (!no_sort) {
                object = sortOperation(object, st_operation);
            }
            var result = [];
            for (var i = 0, o; i < object.length; i++) {
                o = object[i];
                result.push(st_operation.fromObject(o));
            }
            return result;
        },
        toObject: function toObject(object) {
            var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            if (debug.use_default && object === undefined) {
                return [st_operation.toObject(object, debug)];
            }
            _SerializerValidation2.default.required(object);
            if (!no_sort) {
                object = sortOperation(object, st_operation);
            }
            var result = [];
            for (var i = 0, o; i < object.length; i++) {
                o = object[i];
                result.push(st_operation.toObject(o, debug));
            }
            return result;
        }
    };
};

Types.time_point_sec = {
    fromByteBuffer: function fromByteBuffer(b) {
        return b.readUint32();
    },
    appendByteBuffer: function appendByteBuffer(b, object) {
        if (typeof object !== "number") object = Types.time_point_sec.fromObject(object);

        b.writeUint32(object);
        return;
    },
    fromObject: function fromObject(object) {
        _SerializerValidation2.default.required(object);

        if (typeof object === "number") return object;

        if (object.getTime) return Math.floor(object.getTime() / 1000);

        if (typeof object !== "string") throw new Error("Unknown date type: " + object);

        if (/T[0-2][0-9]:[0-5][0-9]:[0-5][0-9]$/.test(object)) object = object + "Z";

        return Math.floor(new Date(object).getTime() / 1000);
    },
    toObject: function toObject(object) {
        var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (debug.use_default && object === undefined) return new Date(0).toISOString().split(".")[0];

        _SerializerValidation2.default.required(object);

        if (typeof object === "string") return object;

        if (object.getTime) return object.toISOString().split(".")[0];

        var int = parseInt(object);
        _SerializerValidation2.default.require_range(0, 0xFFFFFFFF, int, "uint32 " + object);
        return new Date(int * 1000).toISOString().split(".")[0];
    }
};

Types.set = function (st_operation) {
    return {
        validate: function validate(array) {
            var dup_map = {};
            for (var i = 0, o; i < array.length; i++) {
                o = array[i];
                var ref;
                if (ref = typeof o === "undefined" ? "undefined" : (0, _typeof3.default)(o), ["string", "number"].indexOf(ref) >= 0) {
                    if (dup_map[o] !== undefined) {
                        throw new Error("duplicate (set)");
                    }
                    dup_map[o] = true;
                }
            }
            return sortOperation(array, st_operation);
        },
        fromByteBuffer: function fromByteBuffer(b) {
            var size = b.readVarint32();
            if (HEX_DUMP) {
                console.log("varint32 size = " + size.toString(16));
            }
            return this.validate(function () {
                var result = [];
                for (var i = 0; 0 < size ? i < size : i > size; 0 < size ? i++ : i++) {
                    result.push(st_operation.fromByteBuffer(b));
                }
                return result;
            }());
        },
        appendByteBuffer: function appendByteBuffer(b, object) {
            if (!object) {
                object = [];
            }
            b.writeVarint32(object.length);
            var iterable = this.validate(object);
            for (var i = 0, o; i < iterable.length; i++) {
                o = iterable[i];
                st_operation.appendByteBuffer(b, o);
            }
            return;
        },
        fromObject: function fromObject(object) {
            if (!object) {
                object = [];
            }
            return this.validate(function () {
                var result = [];
                for (var i = 0, o; i < object.length; i++) {
                    o = object[i];
                    result.push(st_operation.fromObject(o));
                }
                return result;
            }());
        },
        toObject: function toObject(object) {
            var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            if (debug.use_default && object === undefined) {
                return [st_operation.toObject(object, debug)];
            }
            if (!object) {
                object = [];
            }
            return this.validate(function () {
                var result = [];
                for (var i = 0, o; i < object.length; i++) {
                    o = object[i];
                    result.push(st_operation.toObject(o, debug));
                }
                return result;
            }());
        }
    };
};

// global_parameters_update_operation current_fees
Types.fixed_array = function (count, st_operation) {
    return {
        fromByteBuffer: function fromByteBuffer(b) {
            var i, j, ref, results;
            results = [];
            for (i = j = 0, ref = count; j < ref; i = j += 1) {
                results.push(st_operation.fromByteBuffer(b));
            }
            return sortOperation(results, st_operation);
        },
        appendByteBuffer: function appendByteBuffer(b, object) {
            var i, j, ref;
            if (count !== 0) {
                _SerializerValidation2.default.required(object);
                object = sortOperation(object, st_operation);
            }
            for (i = j = 0, ref = count; j < ref; i = j += 1) {
                st_operation.appendByteBuffer(b, object[i]);
            }
        },
        fromObject: function fromObject(object) {
            var i, j, ref, results;
            if (count !== 0) {
                _SerializerValidation2.default.required(object);
            }
            results = [];
            for (i = j = 0, ref = count; j < ref; i = j += 1) {
                results.push(st_operation.fromObject(object[i]));
            }
            return results;
        },
        toObject: function toObject(object, debug) {
            var i, j, k, ref, ref1, results, results1;
            if (debug == null) {
                debug = {};
            }
            if (debug.use_default && object === void 0) {
                results = [];
                for (i = j = 0, ref = count; j < ref; i = j += 1) {
                    results.push(st_operation.toObject(void 0, debug));
                }
                return results;
            }
            if (count !== 0) {
                _SerializerValidation2.default.required(object);
            }
            results1 = [];
            for (i = k = 0, ref1 = count; k < ref1; i = k += 1) {
                results1.push(st_operation.toObject(object[i], debug));
            }
            return results1;
        }
    };
};

/* Supports instance numbers (11) or object types (1.2.11).  Object type
Validation is enforced when an object type is used. */
var id_type = function id_type(reserved_spaces, object_type) {
    _SerializerValidation2.default.required(reserved_spaces, "reserved_spaces");
    _SerializerValidation2.default.required(object_type, "object_type");
    return {
        fromByteBuffer: function fromByteBuffer(b) {
            return b.readVarint32();
        },
        appendByteBuffer: function appendByteBuffer(b, object) {
            _SerializerValidation2.default.required(object);
            if (object.resolve !== undefined) {
                object = object.resolve;
            }
            // convert 1.2.n into just n
            if (/^[0-9]+\.[0-9]+\.[0-9]+$/.test(object)) {
                object = _SerializerValidation2.default.get_instance(reserved_spaces, object_type, object);
            }
            b.writeVarint32(_SerializerValidation2.default.to_number(object));
            return;
        },
        fromObject: function fromObject(object) {
            _SerializerValidation2.default.required(object);
            if (object.resolve !== undefined) {
                object = object.resolve;
            }
            if (_SerializerValidation2.default.is_digits(object)) {
                return _SerializerValidation2.default.to_number(object);
            }
            return _SerializerValidation2.default.get_instance(reserved_spaces, object_type, object);
        },
        toObject: function toObject(object) {
            var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var object_type_id = _ChainTypes2.default.object_type[object_type];
            if (debug.use_default && object === undefined) {
                return reserved_spaces + "." + object_type_id + ".0";
            }
            _SerializerValidation2.default.required(object);
            if (object.resolve !== undefined) {
                object = object.resolve;
            }
            if (/^[0-9]+\.[0-9]+\.[0-9]+$/.test(object)) {
                object = _SerializerValidation2.default.get_instance(reserved_spaces, object_type, object);
            }

            return reserved_spaces + "." + object_type_id + "." + object;
        }
    };
};

Types.protocol_id_type = function (name) {
    _SerializerValidation2.default.required(name, "name");
    return id_type(_ChainTypes2.default.reserved_spaces.protocol_ids, name);
};

Types.object_id_type = {
    fromByteBuffer: function fromByteBuffer(b) {
        return _ObjectId2.default.fromByteBuffer(b);
    },
    appendByteBuffer: function appendByteBuffer(b, object) {
        _SerializerValidation2.default.required(object);
        if (object.resolve !== undefined) {
            object = object.resolve;
        }
        object = _ObjectId2.default.fromString(object);
        object.appendByteBuffer(b);
        return;
    },
    fromObject: function fromObject(object) {
        _SerializerValidation2.default.required(object);
        if (object.resolve !== undefined) {
            object = object.resolve;
        }
        return _ObjectId2.default.fromString(object);
    },
    toObject: function toObject(object) {
        var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (debug.use_default && object === undefined) {
            return "0.0.0";
        }
        _SerializerValidation2.default.required(object);
        if (object.resolve !== undefined) {
            object = object.resolve;
        }
        object = _ObjectId2.default.fromString(object);
        return object.toString();
    }
};

Types.vote_id = {
    TYPE: 0x000000FF,
    ID: 0xFFFFFF00,
    fromByteBuffer: function fromByteBuffer(b) {
        var value = b.readUint32();
        return {
            type: value & this.TYPE,
            id: value & this.ID
        };
    },
    appendByteBuffer: function appendByteBuffer(b, object) {
        _SerializerValidation2.default.required(object);
        if (object === "string") object = Types.vote_id.fromObject(object);

        var value = object.id << 8 | object.type;
        b.writeUint32(value);
        return;
    },
    fromObject: function fromObject(object) {
        _SerializerValidation2.default.required(object, "(type vote_id)");
        if ((typeof object === "undefined" ? "undefined" : (0, _typeof3.default)(object)) === "object") {
            _SerializerValidation2.default.required(object.type, "type");
            _SerializerValidation2.default.required(object.id, "id");
            return object;
        }
        _SerializerValidation2.default.require_test(/^[0-9]+:[0-9]+$/, object, "vote_id format " + object);

        var _object$split = object.split(":"),
            type = _object$split[0],
            id = _object$split[1];

        _SerializerValidation2.default.require_range(0, 0xff, type, "vote type " + object);
        _SerializerValidation2.default.require_range(0, 0xffffff, id, "vote id " + object);
        return { type: type, id: id };
    },
    toObject: function toObject(object) {
        var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (debug.use_default && object === undefined) {
            return "0:0";
        }
        _SerializerValidation2.default.required(object);
        if (typeof object === "string") object = Types.vote_id.fromObject(object);

        return object.type + ":" + object.id;
    },
    compare: function compare(a, b) {
        if ((typeof a === "undefined" ? "undefined" : (0, _typeof3.default)(a)) !== "object") a = Types.vote_id.fromObject(a);
        if ((typeof b === "undefined" ? "undefined" : (0, _typeof3.default)(b)) !== "object") b = Types.vote_id.fromObject(b);
        return parseInt(a.id) - parseInt(b.id);
    }
};

Types.optional = function (st_operation) {
    _SerializerValidation2.default.required(st_operation, "st_operation");
    return {
        fromByteBuffer: function fromByteBuffer(b) {
            if (!(b.readUint8() === 1)) {
                return undefined;
            }
            return st_operation.fromByteBuffer(b);
        },
        appendByteBuffer: function appendByteBuffer(b, object) {
            if (object !== null && object !== undefined) {
                b.writeUint8(1);
                st_operation.appendByteBuffer(b, object);
            } else {
                b.writeUint8(0);
            }
            return;
        },
        fromObject: function fromObject(object) {
            if (object === undefined) {
                return undefined;
            }
            return st_operation.fromObject(object);
        },
        toObject: function toObject(object) {
            var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            // toObject is only null save if use_default is true
            var result_object = function () {
                if (!debug.use_default && object === undefined) {
                    return undefined;
                } else {
                    return st_operation.toObject(object, debug);
                }
            }();

            if (debug.annotate) {
                if ((typeof result_object === "undefined" ? "undefined" : (0, _typeof3.default)(result_object)) === "object") {
                    result_object.__optional = "parent is optional";
                } else {
                    result_object = { __optional: result_object };
                }
            }
            return result_object;
        }
    };
};

Types.static_variant = function (_st_operations) {
    return {
        nosort: true,
        st_operations: _st_operations,
        fromByteBuffer: function fromByteBuffer(b) {
            var type_id = b.readVarint32();
            var st_operation = this.st_operations[type_id];
            if (HEX_DUMP) {
                console.error("static_variant id 0x" + type_id.toString(16) + " (" + type_id + ")");
            }
            _SerializerValidation2.default.required(st_operation, "operation " + type_id);
            return [type_id, st_operation.fromByteBuffer(b)];
        },
        appendByteBuffer: function appendByteBuffer(b, object) {
            _SerializerValidation2.default.required(object);
            var type_id = object[0];
            var st_operation = this.st_operations[type_id];
            _SerializerValidation2.default.required(st_operation, "operation " + type_id);
            b.writeVarint32(type_id);
            st_operation.appendByteBuffer(b, object[1]);
            return;
        },
        fromObject: function fromObject(object) {
            _SerializerValidation2.default.required(object);
            var type_id = object[0];
            var st_operation = this.st_operations[type_id];
            _SerializerValidation2.default.required(st_operation, "operation " + type_id);
            return [type_id, st_operation.fromObject(object[1])];
        },
        toObject: function toObject(object) {
            var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            if (debug.use_default && object === undefined) {
                return [0, this.st_operations[0].toObject(undefined, debug)];
            }
            _SerializerValidation2.default.required(object);
            var type_id = object[0];
            var st_operation = this.st_operations[type_id];
            _SerializerValidation2.default.required(st_operation, "operation " + type_id);
            return [type_id, st_operation.toObject(object[1], debug)];
        }
    };
};

Types.map = function (key_st_operation, value_st_operation) {
    return {
        validate: function validate(array) {
            if (!Array.isArray(array)) {
                throw new Error("expecting array");
            }
            var dup_map = {};
            for (var i = 0, o; i < array.length; i++) {
                o = array[i];
                var ref;
                if (!(o.length === 2)) {
                    throw new Error("expecting two elements");
                }
                if (ref = (0, _typeof3.default)(o[0]), ["number", "string"].indexOf(ref) >= 0) {
                    if (dup_map[o[0]] !== undefined) {
                        throw new Error("duplicate (map)");
                    }
                    dup_map[o[0]] = true;
                }
            }
            return sortOperation(array, key_st_operation);
        },
        fromByteBuffer: function fromByteBuffer(b) {
            var result = [];
            var end = b.readVarint32();
            for (var i = 0; 0 < end ? i < end : i > end; 0 < end ? i++ : i++) {
                result.push([key_st_operation.fromByteBuffer(b), value_st_operation.fromByteBuffer(b)]);
            }
            return this.validate(result);
        },
        appendByteBuffer: function appendByteBuffer(b, object) {
            this.validate(object);
            b.writeVarint32(object.length);
            for (var i = 0, o; i < object.length; i++) {
                o = object[i];
                key_st_operation.appendByteBuffer(b, o[0]);
                value_st_operation.appendByteBuffer(b, o[1]);
            }
            return;
        },
        fromObject: function fromObject(object) {
            _SerializerValidation2.default.required(object);
            var result = [];
            for (var i = 0, o; i < object.length; i++) {
                o = object[i];
                result.push([key_st_operation.fromObject(o[0]), value_st_operation.fromObject(o[1])]);
            }
            return this.validate(result);
        },
        toObject: function toObject(object) {
            var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            if (debug.use_default && object === undefined) {
                return [[key_st_operation.toObject(undefined, debug), value_st_operation.toObject(undefined, debug)]];
            }
            _SerializerValidation2.default.required(object);
            object = this.validate(object);
            var result = [];
            for (var i = 0, o; i < object.length; i++) {
                o = object[i];
                result.push([key_st_operation.toObject(o[0], debug), value_st_operation.toObject(o[1], debug)]);
            }
            return result;
        }
    };
};

Types.public_key = {
    toPublic: function toPublic(object) {
        if (object.resolve !== undefined) {
            object = object.resolve;
        }
        return object == null ? object : object.Q ? object : _ecc.PublicKey.fromStringOrThrow(object);
    },
    fromByteBuffer: function fromByteBuffer(b) {
        return _FastParser2.default.public_key(b);
    },
    appendByteBuffer: function appendByteBuffer(b, object) {
        _SerializerValidation2.default.required(object);
        _FastParser2.default.public_key(b, Types.public_key.toPublic(object));
        return;
    },
    fromObject: function fromObject(object) {
        _SerializerValidation2.default.required(object);
        if (object.Q) {
            return object;
        }
        return Types.public_key.toPublic(object);
    },
    toObject: function toObject(object) {
        var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _SerializerValidation2.default.required(object);
        return object.toString();
    },
    compare: function compare(a, b) {
        return strCmp(a.toAddressString(), b.toAddressString());
    }
};

Types.address = {
    _to_address: function _to_address(object) {
        _SerializerValidation2.default.required(object);
        if (object.addy) {
            return object;
        }
        return _ecc.Address.fromString(object);
    },
    fromByteBuffer: function fromByteBuffer(b) {
        return new _ecc.Address(_FastParser2.default.ripemd160(b));
    },
    appendByteBuffer: function appendByteBuffer(b, object) {
        _FastParser2.default.ripemd160(b, Types.address._to_address(object).toBuffer());
        return;
    },
    fromObject: function fromObject(object) {
        return Types.address._to_address(object);
    },
    toObject: function toObject(object) {
        var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return Types.address._to_address(object).toString();
    },
    compare: function compare(a, b) {
        return strCmp(a.toString(), b.toString());
    }
};

Types.name_type = {
    fromByteBuffer: function fromByteBuffer(b) {
        return name_to_string(b.readUint64());
    },
    appendByteBuffer: function appendByteBuffer(b, object) {
        object = object.toString();
        var obj = string_to_name(object);
        b.writeUint64(_SerializerValidation2.default.to_long(_SerializerValidation2.default.unsigned(obj)));
        return;
    },
    fromObject: function fromObject(object) {
        _SerializerValidation2.default.required(object);
        return new Buffer(object);
    },
    toObject: function toObject(object) {
        var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (debug.use_default && object === undefined) {
            return "";
        }
        return object.toString();
    }
};

Types.checksum160 = Types.bytes(20);
Types.checksum256 = Types.bytes(32);
Types.checksum512 = Types.bytes(64);

Types.block_id_type = Types.bytes(20);

var char_to_symbol = function char_to_symbol(c) {
    var result = 0;
    if (c >= "a".charCodeAt(0) && c <= "z".charCodeAt(0)) result = c - "a".charCodeAt(0) + 6;
    if (c >= "1".charCodeAt(0) && c <= "5".charCodeAt(0)) result = c - "1".charCodeAt(0) + 1;
    return result;
};

var string_to_name = exports.string_to_name = function string_to_name(str) {
    var name = _SerializerValidation2.default.to_long(0).toUnsigned();
    var i = 0;
    var len = str.length;
    for (; i < len && i < 12; ++i) {
        // NOTE: char_to_symbol() returns char type, and without this explicit
        // expansion to uint64 type, the compilation fails at the point of usage
        // of string_to_name(), where the usage requires constant (compile time) expression.
        var symbol = _SerializerValidation2.default.to_long(char_to_symbol(str[i].charCodeAt(0))).toUnsigned().and(0x1f);
        name = name.or(symbol.shiftLeft(64 - 5 * (i + 1)));
    }

    // The for-loop encoded up to 60 high bits into uint64 'name' variable,
    // if (strlen(str) > 12) then encode str[12] into the low (remaining)
    // 4 bits of 'name'
    if (i == 12 && len > 12) {
        var char = str[12];
        var _symbol = _SerializerValidation2.default.to_long(char_to_symbol(char.charCodeAt(0))).toUnsigned();
        name = name.or(_symbol.and(0x0F));
    }
    return name;
};

var name_to_string = exports.name_to_string = function name_to_string(name) {
    var charmap = ".12345abcdefghijklmnopqrstuvwxyz";
    var str = [];
    var tmp = name;
    for (var i = 0; i <= 12; ++i) {
        var index = tmp.and(i == 0 ? 0x0f : 0x1f).toInt();
        var c = charmap[index];
        str.push(c);
        tmp = tmp.shiftRightUnsigned(i == 0 ? 4 : 5);
    }
    return str.reverse().join("").replace(/\.+$/g, "");
};

/**
 * convert 1.2.* to object_id_type, which will be used in smart contract
 * @param account_id_str
 * @returns {Long}
 */
var object_id_type = exports.object_id_type = function object_id_type(account_id_str) {
    var account_id = account_id_str.split(".").map(function (i) {
        return _SerializerValidation2.default.to_long(i);
    });
    return account_id[0].shiftLeft(56).or(account_id[1].shiftLeft(48)).or(account_id[2]);
};

var checksum160 = exports.checksum160 = Types.bytes(20);

var strCmp = function strCmp(a, b) {
    return a > b ? 1 : a < b ? -1 : 0;
};
var firstEl = function firstEl(el) {
    return Array.isArray(el) ? el[0] : el;
};
var sortOperation = function sortOperation(array, st_operation) {
    return st_operation.nosort ? array : st_operation.compare ? array.sort(function (a, b) {
        return st_operation.compare(firstEl(a), firstEl(b));
    }) : // custom compare operation
    array.sort(function (a, b) {
        return typeof firstEl(a) === "number" && typeof firstEl(b) === "number" ? firstEl(a) - firstEl(b) :
        // A binary string compare does not work. Performanance is very good so HEX is used..  localeCompare is another option.
        Buffer.isBuffer(firstEl(a)) && Buffer.isBuffer(firstEl(b)) ? strCmp(firstEl(a).toString("hex"), firstEl(b).toString("hex")) : strCmp(firstEl(a).toString(), firstEl(b).toString());
    });
};

exports.default = Types;