export interface IEmailParams {
  from: string;
  to: string;
  subject: string;
  text: string;
  html?: string | Buffer | undefined;
}
