import express, { NextFunction } from 'express';
import { Request, Response } from 'express';
import { NewUser, SafeUser, LoginUser, UserData } from '../schemas/userSchema';
import { newUserParser, loginUserParser } from '../middleware/middleware';
import { createUser, loginUser } from '../services/userService';

const router = express.Router();

router.get('/user', (req: Request, res: Response<SafeUser>) => {
  // Check if user is logged in
  if (!req.session.user) {
    throw new Error('User not logged in');
  }

  // If logged in, return user data
  const safeUser: SafeUser = {
    username: req.session.user.username,
    email: req.session.user.email,
  };
  res.status(200).json(safeUser);
})


router.post('/register', newUserParser, async (req: Request<unknown, unknown, NewUser>, res: Response<SafeUser>, next: NextFunction) => {
  const newUserData: NewUser = req.body; // Destructure to get user data

  try {
    const newUser: UserData = await createUser(newUserData);
    const safeUser: SafeUser = {
      username: newUser.username,
      email: newUser.email,
    };
    res.status(201).json(safeUser); // Respond with the created user
  } catch (error) {
    next(error)
  }
}
);

router.post('/login', loginUserParser, async (req: Request<unknown, unknown, LoginUser>, res: Response<SafeUser>, next: NextFunction) => {
  const loginData: LoginUser = req.body; // Destructure to get login data

  try {
    const user: UserData = await loginUser(loginData);
    const safeUser: SafeUser = {
      username: user.username,
      email: user.email,
    };
    req.session.user = user; // Store user in session
    res.status(200).json(safeUser); // Respond with the logged-in user
  } catch (error) {
    next(error);
  }
}
);



export default router;