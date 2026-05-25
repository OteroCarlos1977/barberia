import crypto from 'node:crypto';

const [username, password, salt = ''] = process.argv.slice(2);

if (!username || !password) {
  console.error('Uso: node scripts/hash-password.mjs <username> <password> [salt]');
  process.exit(1);
}

const normalizedUsername = username.trim().toLowerCase();
const passwordHash = crypto.createHash('sha256').update(`${salt}${password}`).digest('hex');

console.log(
  JSON.stringify(
    {
      documentId: normalizedUsername,
      data: {
        username: normalizedUsername,
        passwordHash,
        salt,
        active: true,
        role: 'admin',
      },
    },
    null,
    2,
  ),
);
