import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { jwtConfig } from 'src/config/jwt.config';
import { UserService } from 'src/user/user.service';
import { RefreshTokenRepository } from './repository/refresh-token.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userService: UserService,
        @InjectRepository(RefreshTokenRepository)
        private readonly refreshTokenRepository: RefreshTokenRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // ignoreExpiration: true, // Ignore expired token
            ignoreExpiration: false,
            secretOrKey: jwtConfig.secret,
        });
    }

    async validate(payload: any) {
        const jwt = await this.refreshTokenRepository.findOne(
            payload.jid,
            { relations: ['user'] }
        );
        const user = await this.userService.find(jwt.user.id);
        if (!user) {
            throw new UnauthorizedException('User is not found');
        }

        return user;
    }
}
