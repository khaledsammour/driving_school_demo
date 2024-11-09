const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.deleteUserById = functions.https.onCall(async (data, context) => {
    const { id } = data;

    if (!context.auth || !context.auth.token.admin) {
        throw new functions.https.HttpsError(
            "permission-denied",
            "Only administrators can delete users."
        );
    }

    try {
        // حذف المستخدم من Firebase Authentication
        await admin.auth().deleteUser(id);

        // حذف بيانات المستخدم من Firestore
        await admin.firestore().collection("users").doc(id).delete();

        return { message: "User deleted successfully" };
    } catch (error) {
        console.error("Error deleting user:", error);
        throw new functions.https.HttpsError(
            "internal",
            "Failed to delete user"
        );
    }
});
