import * as admin from "firebase-admin";
import * as path from "path";
import * as fs from "fs";

const serviceAccountPath = "../secrets/firebaseServiceAccountKey.json";

if (!serviceAccountPath) {
  throw new Error(
    "FIREBASE_SERVICE_ACCOUNT_PATH environment variable is not defined."
  );
}
console.log("service", serviceAccountPath);

const resolvedPath = path.resolve(__dirname, serviceAccountPath);
const serviceAccount = JSON.parse(fs.readFileSync(resolvedPath, "utf8"));

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
export const resetUserPassword = async (email: string, newPassword: string) => {
  try {
    const user = await auth.getUserByEmail(email);
    await auth.updateUser(user.uid, { password: newPassword });
    return { success: true, message: "Password updated successfully" };
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};

export default admin;
