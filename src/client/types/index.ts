export type Message = {
  id: number;
  userId: number;
  email: string;
  content: string;
  createdAt: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  hashed_password: string;
  conversationIds: string[];
};

export type Conversation = {
  id: string;
  createdAt: string;
  updatedAt: string;
  users: User[];
  userIds: string[];
};
