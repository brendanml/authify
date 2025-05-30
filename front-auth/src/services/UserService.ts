import axios from 'axios';
import type { NewUser } from '../schemas/userSchema';

export const createUser = async (user: NewUser) => {
  const res = await axios.post('/api/auth/register', user);
  return res.data;
}
