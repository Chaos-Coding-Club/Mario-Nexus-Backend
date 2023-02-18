import { IsEmail, IsNotEmpty } from "@nestjs/class-validator";

export class RegisterUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
