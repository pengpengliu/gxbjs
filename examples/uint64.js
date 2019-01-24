import Types from "../lib/serializer/src/types";
// var Types = require("../lib/serializer/src/types");
var ByteBuffer = require("bytebuffer");

let b = new ByteBuffer(ByteBuffer.DEFAULT_CAPACITY, ByteBuffer.LITTLE_ENDIAN);
const number = Types.uint64.fromObject("17446744123556677890");
Types.uint64.appendByteBuffer(b, number);
console.log(Buffer.from(b.copy(0, b.offset).toBinary(), "binary").toString("hex"));



