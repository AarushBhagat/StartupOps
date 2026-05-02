import * as admin from 'firebase-admin';
import * as fs from 'fs';

const serviceAccount = JSON.parse(fs.readFileSync('./firebaseServiceAccount.json', 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function dumpUsers() {
  const snapshot = await admin.firestore().collection('users').get();
  const users: any[] = [];
  snapshot.forEach(doc => {
    users.push(doc.data());
  });
  console.log(JSON.stringify(users, null, 2));
}

dumpUsers();
