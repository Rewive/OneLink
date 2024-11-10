import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { BooksModule } from './courses/courses.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ormconfig } from './courses/config/ormconfig';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormconfig),
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 10,
      },
    ]),
    BooksModule,
    UsersModule,
    JwtModule.register({
      secret: '23892390edkjHNe8j3nyYh23jn8isjweijk2j',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  exports: [JwtModule],
})
export class AppModule {}
