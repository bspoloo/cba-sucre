import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from './decorators/auth-public.decorator';
import { Session } from './dto/session.interface';
import { Request, Response } from 'express';
import { Credentials } from './dto/credentials.class';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() credentials: Credentials, @Res({ passthrough: true }) res: Response): Promise<Session> {
    const { accessToken, refreshToken, user } = await this.authService.login(credentials);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: user
    };

  }

  @Public()
  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  public async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<Session> {
    const oldCookie = req.cookies['refreshToken'];
    const { accessToken, refreshToken: newRefresh, user } = await this.authService.refreshTokens(oldCookie);

    res.cookie('refreshToken', newRefresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return {
      accessToken: accessToken,
      user: user,
    }
  }

  @Public()
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  public async logout(@Res({ passthrough: true }) res: Response): Promise<{ message: string, success: boolean }> {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
    return { message: 'Logout exitoso', success: true };
  }
}
