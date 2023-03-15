"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_1 = __importDefault(require("passport"));
const google_1 = __importDefault(require("./passport/google"));
const productRouter_1 = __importDefault(require("./routers/productRouter"));
const apiErrorHandler_1 = __importDefault(require("./middlewares/apiErrorHandler"));
const secrets_1 = require("./util/secrets");
const userRouter_1 = __importDefault(require("./routers/userRouter"));
dotenv_1.default.config({ path: '.env' });
exports.app = (0, express_1.default)();
// Express configuration
exports.app.set('port', process.env.PORT);
// Global middleware
exports.app.use((0, cors_1.default)({
    origin: '*',
}));
// app.use(apiContentType)
exports.app.use(express_1.default.json());
exports.app.use(passport_1.default.initialize());
passport_1.default.use((0, google_1.default)());
// Set up routers
exports.app.use('/api/', productRouter_1.default);
exports.app.use('/api/', userRouter_1.default);
exports.app.get('/api/', (req, res) => {
    res.send('hello world');
});
exports.app.post('/api/googleLogin', passport_1.default.authenticate('google-id-token', { session: false }), (req, res) => {
    console.log('HERE IS THE GOODLE USER', req.user);
    const user = req.user;
    const userEmail = user.email;
    const token = jsonwebtoken_1.default.sign({ userId: user._id, isAdmin: user.isAdmin }, secrets_1.JWT_SECRET, {
        expiresIn: '1h',
    });
    res.json({ token, userEmail });
});
// Custom API error handler
exports.app.use(apiErrorHandler_1.default);
exports.router = express_1.default.Router();
//# sourceMappingURL=app.js.map