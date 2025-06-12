import User from '../models/userModel';
import { NewUser, LoginUser, UserData } from '../schemas/userSchema';
import bcrypt from 'bcrypt';

export const createUser = async (userData: NewUser): Promise<UserData> => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const existingUser = await User.findOne({ email: userData.email });

  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  const hashedUserData = {
    ...userData,
    password: hashedPassword,
  };

  const user = new User(hashedUserData);
  await user.save();

  const createdUser = {
    id: user._id.toString(),
    ...user.toObject(),
  }

  console.log('User created:', createdUser);

  return createdUser as UserData;
}

export const loginUser = async (loginData: LoginUser): Promise<UserData> => {
  const user = await User.findOne({ email: loginData.email });

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await bcrypt.compare(loginData.password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  // Omit the password from the returned user object
  const foundUser = {
    id: user._id.toString(),
    ...user.toObject()
  }

  console.log('User logged in:', foundUser);

  return foundUser as UserData;
}