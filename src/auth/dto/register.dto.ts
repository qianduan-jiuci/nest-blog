import { IsNotEmpty } from 'class-validator';
import { IsUserNotAlreadyExist } from '@/common/rules/is-no-exit.rules';

export default class RegisterDto {
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  @IsUserNotAlreadyExist('user', {
    message: '当前用户已经存在',
  })
  name: string;
  @IsNotEmpty({
    message: '密码不能为空',
  })
  password: string;
}
