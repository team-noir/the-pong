// import { Profile, VerifyCallback } from 'passport-42';
import { Strategy, Profile } from 'passport-google-oauth2';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class FTStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private prismaService: PrismaService) {
    const options = {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CB,
      scope: ['email', 'profile'],
    }
    super(options);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<any> {
    const { id, name, emails } = profile;

    const user = await this.prismaService.user.upsert({
      create: {
        ftId: id,
        ftUsername: name,
        ftAccessToken: accessToken,
        ftRefreshToken: refreshToken,
      },
      update: {
        ftAccessToken: accessToken,
        ftRefreshToken: refreshToken,
      },
      where: {
        ftId: id,
      },
    });

    return {
      provider: 'google',
      providerId: id,
      name: name.givenName,
      email: emails[0].value,
    }
  }
}
