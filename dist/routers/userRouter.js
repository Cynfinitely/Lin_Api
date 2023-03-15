"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const router = express_1.default.Router();
router.post('/login', user_controller_1.loginUser);
router.post('/signup', user_controller_1.signupUser);
router.get('/users', user_controller_1.getAllUsers);
router.get('/users/:id', user_controller_1.findUserById);
router.post('/userbyemail', user_controller_1.findUserByEmail);
router.delete('/users/:id', user_controller_1.deleteUser);
exports.default = router;
//# sourceMappingURL=userRouter.js.map