import { IsNotEmpty } from 'class-validator';
import { IsUserAlreadyExist } from '@/common/rules/is-exit.rules';
export default class LoginDto {
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  @IsUserAlreadyExist('user', {
    message: '当前用户不存在',
  })
  name: string;
  @IsNotEmpty({
    message: '密码不能为空',
  })
  password: string;
}
