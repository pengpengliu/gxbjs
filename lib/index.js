/* Serializer */
import Serializer from "./serializer/src/serializer";
import fp from "./serializer/src/FastParser";
import types, {name_to_string, object_id_type, string_to_name} from "./serializer/src/types";
import * as ops from "./serializer/src/operations";
import template from "./serializer/src/template";
import SerializerValidation from "./serializer/src/SerializerValidation";
/* ECC */
import Address from "./ecc/src/address";
import Aes from "./ecc/src/aes";
import PrivateKey from "./ecc/src/PrivateKey";
import PublicKey from "./ecc/src/PublicKey";
import Signature from "./ecc/src/signature";
import ECSignature from "./ecc/src/ecsignature";
import brainKey from "./ecc/src/BrainKey";
import * as hash from "./ecc/src/hash";
import key from "./ecc/src/KeyUtils";
/* Chain */
import ChainStore from "./chain/src/ChainStore";
import TransactionBuilder from "./chain/src/TransactionBuilder";
import ChainTypes from "./chain/src/ChainTypes";
import ObjectId from "./chain/src/ObjectId";
import NumberUtils from "./chain/src/NumberUtils";
import TransactionHelper from "./chain/src/TransactionHelper";
import ChainValidation from "./chain/src/ChainValidation";
import EmitterInstance from "./chain/src/EmitterInstance";
import Login from "./chain/src/AccountLogin";

export {Serializer, fp, types, ops, template, SerializerValidation, name_to_string, string_to_name, object_id_type};

export {Address, Aes, PrivateKey, PublicKey, Signature, brainKey, hash, key, ECSignature};

// in order to use webpack tree shaking to reduce bundle size
// const {FetchChainObjects, FetchChain} = ChainStore;

export {
    ChainStore, TransactionBuilder, ChainTypes, EmitterInstance,
    ObjectId, NumberUtils, TransactionHelper, ChainValidation, Login
};
