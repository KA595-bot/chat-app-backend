import jwt from 'jsonwebtoken';

export const generateAccessToken =(userId: string): string => {
         return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET as string, {
             expiresIn: '30min'
         });
}

export const generateRefreshToken =(userId: string): string => {
    return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET as string, {
        expiresIn: '7d'
    });
}

