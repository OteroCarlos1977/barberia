import crypto from 'node:crypto';

const SESSION_TTL_MS = 1000 * 60 * 60 * 8;

const getSecret = () => {
  if (!process.env.ADMIN_SESSION_SECRET) {
    throw new Error('ADMIN_SESSION_SECRET no configurado.');
  }
  return process.env.ADMIN_SESSION_SECRET;
};

const sign = (payload) =>
  crypto.createHmac('sha256', getSecret()).update(payload).digest('base64url');

export const createSessionToken = ({ username, role = 'admin' }) => {
  const payload = Buffer.from(JSON.stringify({
    username,
    role,
    exp: Date.now() + SESSION_TTL_MS,
  })).toString('base64url');
  return `${payload}.${sign(payload)}`;
};

export const verifySessionToken = (authorizationHeader = '') => {
  const token = authorizationHeader.replace('Bearer ', '').trim();
  const [payload, signature] = token.split('.');
  const expectedSignature = payload ? sign(payload) : '';

  if (
    !payload ||
    !signature ||
    signature.length !== expectedSignature.length ||
    !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
  ) {
    throw new Error('Sesión inválida.');
  }

  const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
  if (!session.exp || Date.now() > session.exp) {
    throw new Error('Sesión vencida.');
  }
  return session;
};
