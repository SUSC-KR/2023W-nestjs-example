export class CreateUserRequestDto {
  userId: string;
  password: string;
}

export class CreateUserResponseDto {
  id: string;
  userId: string;
  createdAt: Date;
}
