export interface Note {
  id: number;
  propertyId: number;
  title: string;
  description: string;
  reminderDate?: Date | undefined;
  createdAt: Date;
  updatedAt: Date;
}
