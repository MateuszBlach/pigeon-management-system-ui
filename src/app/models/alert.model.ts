export enum AlertType {
  Success = 'success',
  Warning = 'warning',
  Error = 'error'
}

export interface Alert {
  id: string;
  type?: AlertType;
  message: string;
  timeout?: number;
}
