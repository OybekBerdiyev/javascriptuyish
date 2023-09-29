import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { User } from 'src/user/Models/user.models';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService ) {}

    async sendUserConfirmation(user: User): Promise<void>{
        const url = `${process.env.API_HOST}/api/users/activate/${user.activation_link}`
        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Welcome to Stadium App',
            template: './confirmation',
            context: {
                name: user.first_name,
                url,
            }
        });
    }
}