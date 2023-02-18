import { IsEmail, IsNotEmpty } from "@nestjs/class-validator";

export class AuthorizedUserDto {
  @IsNotEmpty()
  id: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
