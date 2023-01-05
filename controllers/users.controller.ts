import { User } from "../models/user.model";
import { getFakeUser } from "../services/fakers.service";
import { getExceptionString } from "../helpers";

export const getUser = (userId: number): User | undefined => {
  try {
    const user: User = getFakeUser(userId);
    return user;
  } catch (e: unknown) {
    console.log(getExceptionString(e));
  }
  return undefined;
};
