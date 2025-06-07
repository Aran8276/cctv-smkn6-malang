export interface UserResponse {
  users: User[];
}

export interface User {
  id: number;
  email: string;
  username: string;
  role: string;
  created_at: Date;
}
