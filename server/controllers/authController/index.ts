import { Request, Response } from "express";
import jwt from "../../helpers/jwt";
import oAuth2Client from "../../helpers/oAuth2Client";
import { findOrCreateUser } from "../../services/userServices";

class AuthController {
  static async postGoogleLogin(req: Request, res: Response) {
    try {
      const tokenInfo = await oAuth2Client.getTokenInfo(req.body.accessToken);

      if (!tokenInfo.email) return res.status(404).json({ message: 'Email Not Found' })
      const [user] = await findOrCreateUser({ email: tokenInfo.email })

      console.log({ user: user.toJSON() })

      const accessToken = jwt.sign(user.toJSON())
      const data = { ...user.toJSON(), accessToken }
      res.json(data);

    } catch (error) {
      res.status(500).json(error)
      console.log(error)

    }
  }
}

export default AuthController