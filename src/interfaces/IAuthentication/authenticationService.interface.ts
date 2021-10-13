export interface IAuthenticationService {
  login(email: string, password: string): Promise<string>
}
