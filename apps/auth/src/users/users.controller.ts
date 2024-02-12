import { Controller } from '@nestjs/common';
import {
  CreateUserDto,
  DeleteUserDto,
  Empty,
  FindOneUserDto,
  PaginationDto,
  UpdateUserDto,
  User,
  UserServiceController,
  Users,
} from '@app/common';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';
/*Class 'UsersController' incorrectly implements interface 'UserServiceController'.
   createUser, findAllUsers, findOneUser, updateUser, and 2 more.ts(2420)
  */
@Controller()
export class UsersController implements UserServiceController {
  constructor(private readonly usersService: UsersService) {}
  createUser(request: CreateUserDto) {
    return this.usersService.create(request);
  }
  findAllUsers(request: Empty) {
    return this.usersService.findAll();
  }
  findOneUser(request: FindOneUserDto) {
    return this.usersService.findOne(request.email);
  }
  updateUser(request: UpdateUserDto) {
    return this.usersService.update(request);
  }
  deleteUser(request: DeleteUserDto) {
    return this.usersService.delete(request.Id);
  }
  queryUsers(request: Observable<PaginationDto>): Observable<Users> {
    return this.usersService.queryUsers(request);
  }
}
