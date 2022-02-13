"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRootFlags = void 0;
var AccountRootFlags;
(function (AccountRootFlags) {
    AccountRootFlags[AccountRootFlags["lsfPasswordSpent"] = 65536] = "lsfPasswordSpent";
    AccountRootFlags[AccountRootFlags["lsfRequireDestTag"] = 131072] = "lsfRequireDestTag";
    AccountRootFlags[AccountRootFlags["lsfRequireAuth"] = 262144] = "lsfRequireAuth";
    AccountRootFlags[AccountRootFlags["lsfDisallowXRP"] = 524288] = "lsfDisallowXRP";
    AccountRootFlags[AccountRootFlags["lsfDisableMaster"] = 1048576] = "lsfDisableMaster";
    AccountRootFlags[AccountRootFlags["lsfNoFreeze"] = 2097152] = "lsfNoFreeze";
    AccountRootFlags[AccountRootFlags["lsfGlobalFreeze"] = 4194304] = "lsfGlobalFreeze";
    AccountRootFlags[AccountRootFlags["lsfDefaultRipple"] = 8388608] = "lsfDefaultRipple";
    AccountRootFlags[AccountRootFlags["lsfDepositAuth"] = 16777216] = "lsfDepositAuth";
})(AccountRootFlags = exports.AccountRootFlags || (exports.AccountRootFlags = {}));
//# sourceMappingURL=AccountRoot.js.map