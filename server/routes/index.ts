import { Request, Response, Router } from "express";
import { AuthController, UserController } from "../controllers"; 

const router = Router()


router.get('/', (_: Request, res: Response) => {
  res.send('Express + TypeScript Servers');
});


router.post('/auth/google', AuthController.postGoogleLogin);

router.put('/user/permissions', UserController.updatePermissions);
router.get('/users', UserController.findAll);



export default router