const admin = require('firebase-admin');

// 1. קרא את המחרוזת המקודדת מתוך משתנה סביבה.
// השם יכול להיות כל מה שתבחר, כל עוד תהיה עקבי.
const serviceAccountBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;

// בדיקה קריטית - אם המשתנה לא קיים, האפליקציה תיכשל ותודיע על כך.
if (!serviceAccountBase64) {
  throw new Error('FATAL ERROR: FIREBASE_SERVICE_ACCOUNT_BASE64 environment variable is not set.');
}

try {
  // 2. פענח את המחרוזת חזרה מ-Base64 ל-JSON רגיל.
  const serviceAccountJson = Buffer.from(serviceAccountBase64, 'base64').toString('utf-8');

  // 3. המר את מחרוזת ה-JSON לאובייקט JavaScript.
  const serviceAccount = JSON.parse(serviceAccountJson);

  // 4. אתחל את Firebase עם האובייקט המפוענח.
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

} catch (error) {
  console.error('Failed to parse or initialize Firebase Admin SDK:', error);
  // סיום התהליך אם יש בעיה בפענוח המפתח - כדי למנוע ריצה לא תקינה של האפליקציה.
  process.exit(1);
}


const db = admin.firestore();

// ייצוא אובייקט ה-db כדי שנוכל להשתמש בו בשאר חלקי האפליקציה
module.exports = { db };
