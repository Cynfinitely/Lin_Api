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
if ('port') {
    app_1.app.listen(app_1.app.get('port'), () => {
        console.log('  App is running at http://localhost:%d in %s mode', app_1.app.get('port'), app_1.app.get('env'));
        console.log('  Press CTRL-C to stop\n');
    });
}
exports.default = server;
//# sourceMappingURL=index.js.map