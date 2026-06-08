"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _EmailService_transport;
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const app_env_1 = require("../config/app-env");
class EmailService {
    constructor() {
        _EmailService_transport.set(this, void 0);
        try {
            const config = {
                host: app_env_1.SMTPConfig.host,
                port: app_env_1.SMTPConfig.port,
                service: "gmail",
                auth: {
                    user: app_env_1.SMTPConfig.user,
                    pass: app_env_1.SMTPConfig.password,
                },
            };
            __classPrivateFieldSet(this, _EmailService_transport, nodemailer_1.default.createTransport(config), "f");
            console.log("SMTP Connected");
        }
        catch (exception) {
            console.error("Error smtp connection: ", exception);
        }
    }
    async sendEmail(messageConfig) {
        try {
            return await __classPrivateFieldGet(this, _EmailService_transport, "f")?.sendMail({
                to: messageConfig.to,
                from: app_env_1.SMTPConfig.from,
                subject: messageConfig.sub,
                html: messageConfig.body
            });
        }
        catch (exception) {
            console.log(exception);
            throw { code: 500, message: "Error sending email..." };
        }
    }
}
_EmailService_transport = new WeakMap();
exports.default = EmailService;
//# sourceMappingURL=EmailService.js.map