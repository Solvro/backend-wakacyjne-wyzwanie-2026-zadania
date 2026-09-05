import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "generated/prisma/enums";

export class UserEntity {
  @ApiProperty({ example: 1, description: "Unique ID" })
  id: number;

  @ApiProperty({ example: "contact@example.com" })
  email: string;

  @ApiProperty({ example: "Jhon", maxLength: 20, minLength: 3 })
  name: string;

  @ApiProperty({ enum: ["USER", "MOD", "ADMIN"], example: "USER" })
  role: UserRole;

  @ApiProperty()
  createdAt: Date;
}
