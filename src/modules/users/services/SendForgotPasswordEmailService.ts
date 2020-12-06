import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import UsersRepositoryInterface from '@modules/users/repositories/UsersRepositoryInterface';
import EmailProviderInterface from '@shared/container/providers/MailProvider/models/MailProviderInterface';
import UserTokensRepositoryInterface from '@modules/users/repositories/UserTokensRepositoryInterface';

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

    await this.mailProvider.sendMail(
      email,
      `Pedido de recuperação de senha recebido: ${token}`,
    );
  }
}

export default SendForgotPasswordEmailService;
