export interface ICustomError extends Error {
  status: number;
  message: string;
}
