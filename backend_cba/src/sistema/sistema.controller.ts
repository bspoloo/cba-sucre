import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { Public } from '../auth/decorators/auth-public.decorator';
import { Credentials } from '../auth/dto/credentials.class'; // usa el dto del módulo auth
import { Session } from '@/auth/dto/session.interface';

@Controller('sistema')
export class SistemaController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post('login')
  public async login(@Body() credentials: Credentials): Promise<Session> {
    return this.authService.login(credentials);
  }
}
