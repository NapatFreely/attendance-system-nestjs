import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'attendance_jwt',
    });
  }

  async validate(payload: any) {
    this.logger.log(`JWT payload: ${JSON.stringify(payload)}`);

    return {
      userId: payload.userId,
      email: payload.email,
      role: payload.role === 0 ? 'STUDENT' : 'TEACHER',
    };
  }
}
