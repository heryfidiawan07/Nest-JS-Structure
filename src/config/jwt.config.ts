import { JwtModuleOptions, JwtSignOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleOptions = {
    secret: 'koderahasia',
    signOptions: {
        // expiresIn: 60,
        expiresIn: 60, // In second 60 = 1 minutes
    },
};

export const refreshTokenConfig: JwtSignOptions = {
    // expiresIn: 3600 * 24,
    expiresIn: 60 * 60, // In second 120 = 2 minutes
};
