import { Post, Controller, Res, HttpStatus, Body } from '@nestjs/common';
import { AuthService } from '../services';
import { CreateUserDTO, LoginDTO } from '../dto';

@Controller('auth')
export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  @Post('/signup')
  public async SignUp(@Res() res, @Body() body: CreateUserDTO) {
    const serviceResponse = await this.authService.SignUp(body);

    return res.status(serviceResponse.error ? HttpStatus.BAD_REQUEST : HttpStatus.OK)
      .json(serviceResponse); 
  }

  @Post('/signin')
  public async SignIn(@Res() res, @Body() body: LoginDTO) {
    const serviceResponse = await this.authService.SignIn(body);

    return res.status(serviceResponse.error ? HttpStatus.BAD_REQUEST : HttpStatus.OK)
      .json(serviceResponse);
  }
}