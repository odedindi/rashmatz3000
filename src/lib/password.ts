import bcrypt from 'bcrypt';

export const saltAndHashPassword = (rawPassword?: unknown) => {
  if (typeof rawPassword !== 'string') return;
  return bcrypt.hash(rawPassword, 10);
};
