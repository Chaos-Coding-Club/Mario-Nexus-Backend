import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { RegisterUserDto } from "./dto/register_user.dto";
import { compareSync, hash } from "bcrypt";
import {
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common/exceptions";
import { LoginUserDto } from "./dto/login_user.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(payload: LoginUserDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: pass, ...input } = payload;
    const user = await this.usersService.findUser(input);
    if (!user) {
      throw new UnauthorizedException();
    }
    const hashedPassword = await compareSync(payload.password, user.password);
    if (!hashedPassword) {
      throw new UnauthorizedException();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;

    return {
      user: result,
      access_token: this.jwtService.sign(result),
    };
  }

  async register(payload: RegisterUserDto) {
    const { password } = payload;

    // Hash the password using bcrypt
    const hashedPassword = await hash(password, 10);

    // Replace the plain text password with the hashed password
    payload.password = hashedPassword;

    // Save the user in the database
    let user;
    try {
      user = await this.usersService.createUser(payload);
    } catch (error) {
      console.error(error);
      if (error.code === "P2002") {
        throw new BadRequestException();
      }
      throw new InternalServerErrorException({
        error: "Internal Server Error.",
        message: "There was an error submitting data.",
        statusCode: 500,
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: pass, ...result } = user;

    return {
      user: result,
      access_token: this.jwtService.sign(result),
    };
  }
}
