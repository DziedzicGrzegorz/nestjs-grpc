import {
  CreateUserDto,
  PaginationDto,
  UpdateUserDto,
  User,
  Users,
} from '@app/common';
import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { NotFoundError, Observable, Subject } from 'rxjs';

//@TODO implement Mongo

@Injectable()
export class UsersService implements OnModuleInit {
  onModuleInit() {
    for (let index = 0; index < 100; index++) {
      this.create({
        email: randomUUID(),
      });
    }
  }

  private readonly users: User[] = [];

  create(createUserDto: CreateUserDto) {
    const nowLocaleString = new Date().toLocaleString();
    const user: User = {
      ...createUserDto,
      Id: randomUUID(),
      createdAt: nowLocaleString,
      lastVisit: nowLocaleString,
      UrlIds: [],
    };
    return user;
  }

  findAll(): Users {
    return {
      users: this.users,
    };
  }

  findOne(Id: User['Id']): User {
    const user = this.users.find((user) => user.Id === Id);
    if (!user) {
      throw new NotFoundException(`User with id ${Id} not found.`);
    }
    return user;
  }

  update(updateUserDto: UpdateUserDto) {
    const { Id } = updateUserDto;
    const userIndex = this.users.findIndex((user) => user.Id === Id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${Id} not found.`);
    }

    return {
      ...this.users[userIndex],
      ...updateUserDto,
    };
  }

  delete(id: User['Id']) {
    const userIndex = this.users.findIndex((user) => user.Id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }

    return this.users.splice(userIndex)[0];
  }
  queryUsers(
    paginationDtoStream: Observable<PaginationDto>,
  ): Observable<Users> {
    const subject = new Subject<Users>();

    const onNext = (PaginationDto: PaginationDto) => {
      const start = PaginationDto.page * PaginationDto.skip;
      subject.next({
        users: this.users.slice(start, start + PaginationDto.skip),
      });
    };

    const onComplete = () => subject.complete();
    paginationDtoStream.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return subject.asObservable();
  }
}
