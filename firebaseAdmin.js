"use strict";
// import * as admin from "firebase-admin";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetUserPassword = void 0;
// // Initialize Firebase Admin SDK
// const serviceAccount = require("../secrets/firebaseServiceAccountKey.json"); // Update with your own service account key
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });
// const auth = admin.auth();
// /**
//  * Function to reset a user's password using Firebase Authentication
//  * @param email User's email address
//  * @param newPassword New password to set
//  */
// export const resetUserPassword = async (email: string, newPassword: string) => {
//   try {
//     const user = await auth.getUserByEmail(email);
//     await auth.updateUser(user.uid, { password: newPassword });
//     return { success: true, message: "Password updated successfully" };
//   } catch (error) {
//     console.error("Error resetting password:", error);
//     throw error;
//   }
// };
// export default admin;
const admin = __importStar(require("firebase-admin"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
// Ensure the path is correct relative to the dist directory after build
const serviceAccountPath = path.join(__dirname, "../");
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));
// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
const auth = admin.auth();
/**
 * Function to reset a user's password using Firebase Authentication
 * @param email User's email address
 * @param newPassword New password to set
 */
const resetUserPassword = (email, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield auth.getUserByEmail(email);
        yield auth.updateUser(user.uid, { password: newPassword });
        return { success: true, message: "Password updated successfully" };
    }
    catch (error) {
        console.error("Error resetting password:", error);
        throw error;
    }
});
exports.resetUserPassword = resetUserPassword;
exports.default = admin;
