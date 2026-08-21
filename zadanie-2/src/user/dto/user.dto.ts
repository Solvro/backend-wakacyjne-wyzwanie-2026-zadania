export class UserDto {
  uuid!: string;
  email!: string;
  name!: string;
  surname!: string;
  phone?: string;
  createdAt!: Date;
  updatedAt!: Date;
  isActive!: boolean;
  deletedAt?: Date;
}
