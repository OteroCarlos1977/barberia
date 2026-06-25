import admin from 'firebase-admin';

const parseServiceAccount = () => {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    return {
      projectId: serviceAccount.projectId || serviceAccount.project_id,
      clientEmail: serviceAccount.clientEmail || serviceAccount.client_email,
      privateKey: (serviceAccount.privateKey || serviceAccount.private_key)?.replace(/\\n/g, '\n'),
    };
  }

  return {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  };
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(parseServiceAccount()),
  });
}

export const firestore = admin.firestore();
