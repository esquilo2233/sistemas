import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector, private jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException();
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const user = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      request.user = user;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
