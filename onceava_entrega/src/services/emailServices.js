import nodemailer from 'nodemailer';
import config from '../config/config.js';

export default class EmailService {
  static #instance = null;
  constructor() {
    this.transport = nodemailer.createTransport(
      {
        service: config.mail.service,
        port: config.mail.port,
        auth: {
          user: config.mail.user,
          pass: config.mail.password,
        },
      }
    );
  }
  sendEmail(to, subject, html, attachments = []) {
    return this.transport.sendMail({
      from: config.mail.user,
      to,
      subject,
      html,
      attachments,
    });
  }

  sendRecoveryPasswordEmail(email, token) {


    const url = `http://localhost:8080/api/user/reset/${token}`

    return this.sendEmail(
      email,
      `Recovery password`,
      `<h1>Ingrese este link para recuperar password: ${url}</h1>`
    );
  }

  static getInstance() {
    if (!EmailService.#instance) {
      EmailService.#instance = new EmailService();
    }
    return EmailService.#instance;
  }
}