import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { PrismaService } from "./prisma/prisma.service";
import { AuthModule } from "./auth/auth.module";
import { UsersService } from "./users/users.service";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";

@Module({
  imports: [UsersModule, AuthModule],
  providers: [
    UsersService,
    PrismaService,
    {
      provide: APP_GUARD,
      useExisting: JwtAuthGuard,
    },
    JwtAuthGuard,
  ],
})
export class AppModule {}
