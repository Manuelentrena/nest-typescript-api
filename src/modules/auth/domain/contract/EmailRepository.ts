export interface EmailRepository {
  sendEmail(email: string, subject: string, message: string): Promise<void>;
}
