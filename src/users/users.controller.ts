import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { UsersService } from "./users.service";

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
  findOne(@Param("id") id: string) {
    // Converts to number if it is not a number already
    // Params are by default strings in Nest.js
    return this.usersService.findOne(+id);
  }

  @Post()
  create(
    @Body()
    user: {
      name: string;
      email: string;
      role: "INTERN" | "ENGINEER" | "ADMIN";
    }
  ) {
    return this.usersService.create(user);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body()
    userUpdate: {
      name?: string;
      email?: string;
      role?: "INTERN" | "ENGINEER" | "ADMIN";
    }
  ) {
    return this.usersService.update(+id, userUpdate);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.usersService.delete(+id);
  }
}
