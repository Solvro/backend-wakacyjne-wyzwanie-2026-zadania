export class CreateUserDto {
  email!: string;
  name!: string;
  surname!: string;
  phone?: string;
  password!: string;
}
