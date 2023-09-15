export interface User {
  id: number;
  name: string;
  nickname: string;
  email: string;
  password: string;
  phoneNumber: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}

enum Role {
  USER,
  ADMIN,
}
