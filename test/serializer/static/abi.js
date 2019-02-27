export const bank_abi = {
    "version": "gxc::abi/1.0",
    "types": [],
    "structs": [
        {
            "name": "account",
            "base": "",
            "fields": [
                {
                    "name": "owner",
                    "type": "uint64"
                },
                {
                    "name": "balances",
                    "type": "contract_asset[]"
                }
            ]
        },
        {
            "name": "deposit",
            "base": "",
            "fields": []
        },
        {
            "name": "withdraw",
            "base": "",
            "fields": [
                {
                    "name": "to_account",
                    "type": "string"
                },
                {
                    "name": "amount",
                    "type": "contract_asset"
                }
            ]
        }
    ],
    "actions": [
        {
            "name": "deposit",
            "type": "deposit",
            "payable": true
        },
        {
            "name": "withdraw",
            "type": "withdraw",
            "payable": false
        }
    ],
    "tables": [
        {
            "name": "account",
            "index_type": "i64",
            "key_names": [
                "owner"
            ],
            "key_types": [
                "uint64"
            ],
            "type": "account"
        }
    ],
    "error_messages": [],
    "abi_extensions": []
};