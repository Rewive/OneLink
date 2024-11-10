import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User, Course } from '../../entities';

export const ormconfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'server-postgres',
  port: 5432,
  username: 'lmentor',
  password: '2i8xjsy62hGDb23',
  database: 'mentordb',
  entities: [User, Course],
  synchronize: true,
};
