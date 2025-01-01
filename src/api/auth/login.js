// src/api/auth/login.js
import { loginUser } from '@/lib/auth/authService';
import { handleSuccess, handleError } from '../utils/responseHandler';
import { ERROR_CODES } from '../utils/errorCodes';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return handleError(
      res,
      new Error(ERROR_CODES.METHOD_NOT_ALLOWED.message),
      405,
      ERROR_CODES.METHOD_NOT_ALLOWED.code
    );
  }

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return handleError(
        res,
        new Error(ERROR_CODES.BAD_REQUEST.message),
        400,
        ERROR_CODES.BAD_REQUEST.code
      );
    }

    // Authenticate with Supabase
    const { user, accessToken, refreshToken } = await loginUser({
      email,
      password
    });

    // Set HTTP-only cookies for both access & refresh tokens
    // Adjust 'Secure' to 'true' in production (on HTTPS) and set sameSite='Strict' or 'Lax'
    res.setHeader('Set-Cookie', [
      `sb-access-token=${accessToken}; HttpOnly; Path=/; SameSite=Lax; Secure=false;`,
      `sb-refresh-token=${refreshToken}; HttpOnly; Path=/; SameSite=Lax; Secure=false;`
    ]);

    return handleSuccess(res, { user, message: 'Login successful!' }, 200);
  } catch (error) {
    return handleError(res, error, 401, ERROR_CODES.UNAUTHORIZED.code);
  }
}
