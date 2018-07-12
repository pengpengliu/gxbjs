import v from '../lib/serializer/src/SerializerValidation';

const char_to_symbol = (c) => {
    let result = 0;
    if (c >= 'a'.charCodeAt(0) && c <= 'z'.charCodeAt(0))
        result = (c - 'a'.charCodeAt(0)) + 6;
    if (c >= '1'.charCodeAt(0) && c <= '5'.charCodeAt(0))
        result = (c - '1'.charCodeAt(0)) + 1;
    return result;
};

const string_to_name = (str) => {
    var name = v.to_long(0).toUnsigned();
    var i = 0;
    for (; str[i] && i < 12; ++i) {
        // NOTE: char_to_symbol() returns char type, and without this explicit
        // expansion to uint64 type, the compilation fails at the point of usage
        // of string_to_name(), where the usage requires constant (compile time) expression.
        let symbol = v.to_long(char_to_symbol(str[i].charCodeAt(0))).toUnsigned().and(0x1f);
        name = name.or(symbol.shiftLeft(64 - 5 * (i + 1)));
    }

    // The for-loop encoded up to 60 high bits into uint64 'name' variable,
    // if (strlen(str) > 12) then encode str[12] into the low (remaining)
    // 4 bits of 'name'
    if (i == 12) {
        let symbol = v.to_long(char_to_symbol(str[12].charCodeAt(0))).toUnsigned();
        name = name.or(symbol.and(0x0F));
    }
    return name;
};

const name_to_string = (name) => {
    let charmap = ".12345abcdefghijklmnopqrstuvwxyz";
    let str = [];
    let tmp = name;
    for (var i = 0; i <= 12; ++i) {
        let index = tmp.and(i == 0 ? 0x0f : 0x1f).toInt();
        let c = charmap[index];
        str.push(c);
        tmp = tmp.shiftRightUnsigned(i == 0 ? 4 : 5);
    }
    return str.reverse().join('').replace(/\.+$/g, '');
};

console.log(string_to_name('subbalance').toString());
console.log(name_to_string(string_to_name('subbalance')));



