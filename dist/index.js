"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorhandler_1 = __importDefault(require("errorhandler"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("./app");
const secrets_1 = require("./util/secrets");
const logger_1 = __importDefault(require("./util/logger"));
const mongoUrl = secrets_1.MONGODB_URI;
const port = process.env.PORT || 5000;
mongoose_1.default
    .connect(mongoUrl)
    .then(() => {
    logger_1.default.info('Connected to MongoDB');
})
    .catch((err) => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
    process.exit(1);
});
const server = mongoose_1.default.connection;
/**
 * Error Handler. Provides error handing middleware
   only use in development
 */
if (process.env.NODE_ENV === 'development') {
    app_1.app.use((0, errorhandler_1.default)());
}
// Start Express server
app_1.app.get('/', (_req, res) => {
    return res.send('Express Typescript on Vercel');
});
app_1.app.get('/ping', (_req, res) => {
    return res.send('pong 🏓');
});
app_1.app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
exports.default = server;
//# sourceMappingURL=index.js.map