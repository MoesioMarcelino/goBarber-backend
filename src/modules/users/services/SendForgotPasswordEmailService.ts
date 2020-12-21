import { inject, injectable } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';

import UsersRepositoryInterface from '@modules/users/repositories/UsersRepositoryInterface';
import EmailProviderInterface from '@shared/container/providers/MailProvider/models/MailProviderInterface';
import UserTokensRepositoryInterface from '@modules/users/repositories/UserTokensRepositoryInterface';
// import UserToken from '../infra/typeorm/entities/UserToken';

interface Request {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryInterface,

    @inject('MailProvider')
    private mailProvider: EmailProviderInterface,

    @inject('UserTokensRepository')
    private userTokensRepository: UserTokensRepositoryInterface,
  ) {}

  async execute({ email }: Request): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const { token } = await this.userTokensRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[GoBarber] Recuperação de senha',
      template: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
