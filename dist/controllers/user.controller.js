"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.findUserByEmail = exports.findUserById = exports.getAllUsers = exports.signupUser = exports.loginUser = exports.createToken = void 0;
const userSchema_1 = __importDefault(require("../models/userSchema"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (_id) => {
    const secretKey = process.env.JWT_SECRET;
    return jsonwebtoken_1.default.sign({ _id }, secretKey, { expiresIn: '3d' });
};
exports.createToken = createToken;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userSchema_1.default.findOne({
            email: req.body.email,
        });
        if (!user.password === req.body.password) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        const token = (0, exports.createToken)(user._id);
        return res.status(200).json({
            userToken: token,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            id: user.id,
        });
    }
    catch (error) {
        return res.status(400).json({ error: 'email doesn\'t exist.' });
    }
});
exports.loginUser = loginUser;
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const exists = yield userSchema_1.default.findOne({ email: email });
        if (exists) {
            console.log('User already exist.');
            return res.json({ error: 'User already exist' });
        }
        const user = yield userSchema_1.default.create(req.body);
        const token = (0, exports.createToken)(user._id);
        res.json({
            userToken: token,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            id: user.id,
        });
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.signupUser = signupUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userSchema_1.default.find();
    res.json(users);
});
exports.getAllUsers = getAllUsers;
const findUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    userSchema_1.default.findOne({ _id: req.params.id })
        .then((singleUser) => res.json({ user: singleUser }))
        .catch((err) => res.status(400).json(err));
});
exports.findUserById = findUserById;
const findUserByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    userSchema_1.default.findOne({ email: req.body.email })
        .then((singleUser) => res.json({ user: singleUser }))
        .catch((err) => res.status(400).json(err));
});
exports.findUserByEmail = findUserByEmail;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    userSchema_1.default.deleteOne({ _id: req.params.id })
        .then((deletedUser) => res.json({ user: deletedUser }))
        .catch((err) => res.json({ message: 'something went wrong', error: err }));
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.controller.js.map