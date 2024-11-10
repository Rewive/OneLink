import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateRoleDto } from '../dto';
import { JwtAuthGuard, RolesGuard } from '../guards';
import { Roles } from '../common';
import { Role } from '../entities';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully registered.',
  })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully logged in.',
  })
  async login(@Body() loginUserDto: CreateUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get current user info' })
  @ApiResponse({ status: 200, description: 'The current user info.' })
  getMe(@Request() req) {
    return req.user;
  }

  @Put(':id/role')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Mentor)
  @ApiOperation({ summary: 'Update user role' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: UpdateRoleDto })
  @ApiResponse({
    status: 200,
    description: 'The user role has been successfully updated.',
  })
  updateRole(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.usersService.updateRole(+id, updateRoleDto);
  }

  @Get('activate/:token')
  @ApiOperation({ summary: 'Activate user account' })
  @ApiParam({ name: 'token', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The user account has been successfully activated.',
  })
  async activate(@Param('token') token: string) {
    return this.usersService.activate(token);
  }
}
