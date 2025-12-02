import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    return await this.usersService.findAll();
  }

  @Get('stats/total')
  async getTotalUsers() {
    const count = await this.usersService.getTotalUsers();
    return {
      success: true,
      count,
    };
  }

  @Get('stats/rol/:rolName')
  async getUsersByRol(@Param('rolName') rolName: string) {
    const count = await this.usersService.getUsersByRol(rolName);
    return {
      success: true,
      rol: rolName,
      count,
    };
  }

  @Get('stats/activos')
  async getUsersByActivo() {
    const count = await this.usersService.getUsersByActivo(true);
    return {
      success: true,
      count,
    };
  }

  @Get('stats/dashboard')
  async getDashboardStats() {
    return await this.usersService.getDashboardStats();
  }

  @Get(':username')
  async getUser(@Param('username') username: string) {
    return await this.usersService.findOne(username);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Put(':username')
  async updateUser(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(username, updateUserDto);
  }

  @Delete(':username')
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param('username') username: string) {
    return await this.usersService.remove(username);
  }

  @Patch(':username/toggle-status')
  async toggleStatus(@Param('username') username: string) {
    return await this.usersService.toggleStatus(username);
  }
}







