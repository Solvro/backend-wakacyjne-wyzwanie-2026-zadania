export class Trip {
  uuid!: string;
  title!: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  createdAt!: Date;
  createdByUuid!: string;
}
