import {
    string_to_name,
    name_to_string
} from "../lib/serializer/src/types";

let n = string_to_name("diceofferbet")
console.log(n,name_to_string(n));
