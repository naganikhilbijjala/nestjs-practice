import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // Using Query Params
  // /users?role=value
  @Get()
  findAll(@Query("role") role?: "INTERN" | "ENGINEER" | "ADMIN") {
    return this.usersService.findAll(role);
  }

  //We should keep interns route above because otherwise it will consider
  // this as id param
  @Get("interns")
  findAllInterns() {
    return [];
  }

  @Get("/:id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    // Converts to number if it is not a number already
    // Params are by default strings in Nest.js
    return this.usersService.findOne(id);
  }

  @Post()
  create(
    @Body(ValidationPipe)
    createUserDto: CreateUserDto
  ) {
    return this.usersService.create(createUserDto);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body(ValidationPipe)
    updateUserDto: UpdateUserDto
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(":id")
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
