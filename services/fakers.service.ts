import { User } from "../models/user.model";
export const getFakeUser = (userId: number): User => {
  const resultUser = new User(userId, "John Doe");
  return resultUser;
};
