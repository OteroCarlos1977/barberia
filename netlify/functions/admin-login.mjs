import crypto from 'node:crypto';
import { firestore } from './firebaseAdmin.mjs';
import { createSessionToken } from './session.mjs';

const json = (statusCode, body) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

const hashPassword = (password, salt = '') =>
  crypto.createHash('sha256').update(`${salt}${password}`).digest('hex');

const findUser = async (username) => {
  const normalizedUsername = username.trim().toLowerCase();
  const directDoc = await firestore.collection('usuarios').doc(normalizedUsername).get();
  if (directDoc.exists) return { id: directDoc.id, ...directDoc.data() };

  const snapshot = await firestore
    .collection('usuarios')
    .where('username', '==', normalizedUsername)
    .limit(1)
    .get();
  if (snapshot.empty) return null;
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
};

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { message: 'Método no permitido.' });

  try {
    const { username, password } = JSON.parse(event.body || '{}');
    if (!username || !password) {
      return json(400, { message: 'Usuario y contraseña son obligatorios.' });
    }

    const user = await findUser(username);
    const expectedHash = user?.passwordHash || user?.password_hash;
    const receivedHash = hashPassword(password, user?.salt || '');
    if (!user || user.active === false || !expectedHash || expectedHash !== receivedHash) {
      return json(401, { message: 'Credenciales inválidas.' });
    }

    return json(200, {
      token: createSessionToken({
        username: user.username || user.id,
        role: user.role || 'admin',
      }),
    });
  } catch (error) {
    console.error('admin-login', error);
    return json(500, { message: 'No se pudo iniciar sesión.' });
  }
};
