"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiError_1 = require("../helpers/apiError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secrets_1 = require("../util/secrets");
function default_1(req, res, next, role) {
    try {
        console.log('role:', role);
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader) {
            const token = authorizationHeader.split(' ')[1];
            const decodedUser = jsonwebtoken_1.default.verify(token, secrets_1.JWT_SECRET);
            console.log(decodedUser);
            req.user = decodedUser;
            return next();
        }
        throw new apiError_1.ForbiddenError();
    }
    catch (error) {
        throw new apiError_1.ForbiddenError();
    }
}
exports.default = default_1;
//# sourceMappingURL=checkAuth.js.map