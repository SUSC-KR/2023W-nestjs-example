export class LoginRequestDto {
  userId: string;
  password: string;
}

export class LoginResponseDto {
  token: string;
}
