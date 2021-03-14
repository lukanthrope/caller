import { IsNotEmpty, IsEmail } from 'class-validator'

export class LoginDTO {
  @IsEmail()
  public readonly email: string;

  @IsNotEmpty()
  public readonly password: string;
}

export class CreateUserDTO extends LoginDTO {
  @IsNotEmpty()
  public readonly id: string;

  @IsNotEmpty()
  public readonly about: string;
}

export class UserInfoDTO {
  
}
