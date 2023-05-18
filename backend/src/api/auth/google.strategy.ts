// import { Profile, VerifyCallback } from 'passport-42';
import { Strategy, Profile } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private prismaService: PrismaService) {
    const options = {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CB,
      scope: ['email', 'profile']
    }
    super(options);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done
  ): Promise<any> {
    const { id, emails } = profile;
    const email = emails[0].value;

    const user = await this.prismaService.user.upsert({
      where: {
        googleId: id,
      },
      update: {
        googleAccessToken: accessToken,
        googleRefreshToken: refreshToken,
      },
      create: {
        googleId: id,
        googleEmail: email,
        googleAccessToken: accessToken,
        googleRefreshToken: refreshToken,
      },
    });
    done(null, user);
  }
}
