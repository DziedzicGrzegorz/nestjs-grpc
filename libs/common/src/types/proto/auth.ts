/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

export interface CreateUserDto {
  email: string;
}

export interface User {
  Id: string;
  email: string;
  createdAt: string;
  lastVisit: string;
  UrlIds: string[];
}

export interface Users {
  users: User[];
}

export interface FindOneUserDto {
  email: string;
}

export interface UpdateUserDto {
  email: string;
  lastVisit: string;
  UrlIds: string[];
}

export interface PaginationDto {
  page: number;
  skip: number;
}

export interface Empty {
}

export const AUTH_PACKAGE_NAME = "auth";

export interface UserServiceClient {
  createUser(request: CreateUserDto): Observable<User>;

  findAllUsers(request: Empty): Observable<Users>;

  findOneUser(request: FindOneUserDto): Observable<User>;

  updateUser(request: FindOneUserDto): Observable<User>;

  deleteUser(request: FindOneUserDto): Observable<User>;

  queryUsers(request: Observable<PaginationDto>): Observable<Users>;
}

export interface UserServiceController {
  createUser(request: CreateUserDto): Promise<User> | Observable<User> | User;

  findAllUsers(request: Empty): Promise<Users> | Observable<Users> | Users;

  findOneUser(request: FindOneUserDto): Promise<User> | Observable<User> | User;

  updateUser(request: FindOneUserDto): Promise<User> | Observable<User> | User;

  deleteUser(request: FindOneUserDto): Promise<User> | Observable<User> | User;

  queryUsers(request: Observable<PaginationDto>): Observable<Users>;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createUser", "findAllUsers", "findOneUser", "updateUser", "deleteUser"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = ["queryUsers"];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
