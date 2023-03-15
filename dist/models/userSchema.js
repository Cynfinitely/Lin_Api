"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    first_name: {
        type: String,
        required: false,
        minlength: [3, 'Name must be at least 3 chars'],
    },
    last_name: {
        type: String,
        required: false,
        minlength: [3, 'Name must be at least 3 chars'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        index: true,
        unique: true,
        validate: {
            validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: 'Please enter a valid email',
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: 4,
        validate: {
            validator: (val) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(val),
            message: 'Please enter minimum eight characters, at least one letter and one number',
        },
    },
    isAdmin: {
        type: Boolean,
        required: false,
    },
});
exports.default = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=userSchema.js.map