"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Operator_1 = require("../src/repositories/Operator");
var dao = new Operator_1.OperatorDAO();
var name = process.argv[2];
var loginId = process.argv[3];
var password = process.argv[4];
dao.create(name, loginId, password).then(function () {
    console.log('done.');
    process.exit();
});
