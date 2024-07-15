var statusType;
(function (statusType) {
    statusType[statusType["PENDING"] = 22] = "PENDING";
    statusType[statusType["COMPLETED"] = 45] = "COMPLETED";
    statusType[statusType["FAILED"] = 46] = "FAILED";
})(statusType || (statusType = {}));
console.log(statusType.FAILED);
