import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateRoleDto } from '../dto';
import { User } from '../entities';
import * as argon2 from 'argon2';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    // Проверка на уникальность электронной почты
    const existingEmail = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingEmail) {
      return {
        status: 400,
        message: 'User with this email already exists',
      };
    }

    // Проверка на уникальность имени пользователя
    const existingUsername = await this.usersRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (existingUsername) {
      return {
        status: 400,
        message: 'User with this username already exists',
      };
    }

    const hashedPassword = await argon2.hash(createUserDto.password);
    const activationToken = uuidv4();
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
      activationToken,
    });
    await this.usersRepository.save(user);

    // отправка имитации ссылки, которая была бы отправлена на почту
    const legacyLink = `http://localhost:3000/users/activate/${activationToken}`;

    return {
      status: 200,
      message: 'Mail success sended',
      legacy: legacyLink,
    };
  }

  async login(loginUserDto: CreateUserDto) {
    const user = await this.usersRepository.findOne({
      where: { username: loginUserDto.username },
    });
    if (user && (await argon2.verify(user.password, loginUserDto.password))) {
      const payload = {
        username: user.username,
        sub: user.id,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    return null;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async updateRole(id: number, updateRoleDto: UpdateRoleDto) {
    await this.usersRepository.update(id, { role: updateRoleDto.role });
    const updatedUser = await this.usersRepository.findOne({ where: { id } });
    return {
      id: updatedUser.id,
      role: updatedUser.role,
    };
  }

  async findOneById(id: number): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async activate(token: string) {
    const user = await this.usersRepository.findOne({
      where: { activationToken: token },
    });
    if (!user) {
      throw new NotFoundException('Invalid activation token');
    }
    user.activationToken = null;
    await this.usersRepository.save(user);
    return {
      status: 200,
      message: 'Account successfully activated',
    };
  }
}
