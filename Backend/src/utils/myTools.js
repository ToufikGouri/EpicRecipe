// options for cookie-parser
export const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: 30 * 60 * 60 * 24 * 1000
}