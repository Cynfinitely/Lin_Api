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
const passport_google_id_token_1 = __importDefault(require("passport-google-id-token"));
const userSchema_1 = __importDefault(require("../models/userSchema"));
const secrets_1 = require("../util/secrets");
function default_1() {
    return new passport_google_id_token_1.default({
        clientID: secrets_1.GOOGLE_CLIENT_ID,
    }, (parsedToken, googleId, done) => __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('parsed :', parsedToken);
            console.log('googleid:', googleId);
            const email = parsedToken.payload.email;
            let user = yield userSchema_1.default.findOne({ email });
            console.log('this is email of user:', email);
            if (!user) {
                user = new userSchema_1.default({
                    email,
                    isAdmin: email === 'celalyasinnari@gmail.com',
                });
                user.save();
            }
            return done(null, user);
        }
        catch (error) {
            done(error);
        }
    }));
}
exports.default = default_1;
//# sourceMappingURL=google.js.map