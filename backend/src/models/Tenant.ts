export interface Tenant {
  id: number;
  propertyId: number; // links to the Property
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
}
