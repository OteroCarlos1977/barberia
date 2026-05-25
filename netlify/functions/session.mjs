import crypto from 'node:crypto';

const SESSION_TTL_MS = 1000 * 60 * 60 * 8;

const getSecret = () => {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error('ADMIN_SESSION_SECRET no configurado.');
  }
  return secret;
};

const toBase64Url = (value) => Buffer.from(JSON.stringify(value)).toString('base64url');

const sign = (payload) =>
  crypto.createHmac('sha256', getSecret()).update(payload).digest('base64url');

export const createSessionToken = ({ username, role = 'admin' }) => {
  const payload = toBase64Url({
    username,
    role,
    exp: Date.now() + SESSION_TTL_MS,
  });
  return `${payload}.${sign(payload)}`;
};

export const verifySessionToken = (authorizationHeader = '') => {
  const token = authorizationHeader.replace('Bearer ', '').trim();
  const [payload, signature] = token.split('.');

  if (!payload || !signature || sign(payload) !== signature) {
    throw new Error('Sesión inválida.');
  }

  const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
  if (!session.exp || Date.now() > session.exp) {
    throw new Error('Sesión vencida.');
  }

  return session;
};
