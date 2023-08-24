import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set the expiration time to a past value to remove the cookies
  const expiredTokenCookie = serialize('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    domain: '4caf-125-164-21-148.ngrok-free.app',
    path: '/',
    maxAge: -1, // Set to a negative value to expire the cookie immediately
    sameSite: 'strict',
  });

  const expiredRefreshTokenCookie = serialize('refreshToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    domain: '4caf-125-164-21-148.ngrok-free.app',
    path: '/',
    maxAge: -1,
    sameSite: 'strict',
  });

  // Set the updated cookies in the response headers
  res.setHeader('Set-Cookie', [expiredTokenCookie, expiredRefreshTokenCookie]);

  // Redirect the user to the login page or any other appropriate page
  res.writeHead(302, { Location: '/auth' });
  res.end();
}
