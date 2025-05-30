import express from 'express';
import { Request, Response } from 'express';
import { NewUser, SafeUser } from '../schemas/userSchema';
import { newUserParser } from '../middleware/middleware';

const router = express.Router();

router.get('/user', (_req: Request, res: Response) => {
  res.send("User route");
})


router.post('/register', newUserParser, (req: Request<unknown, unknown, NewUser>, res: Response<SafeUser>) => {
  console.log('Register route');
  const { password, ...userSafe } = req.body; // Destructure to get user data
  req.session.user = req.body; // Store user data in session
  res.send(userSafe);
}
);

router.post('/login', (_req, res) => {
  console.log('Login route');
  res.send('Login route');
}
);



export default router;