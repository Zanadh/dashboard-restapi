import { Request, Response } from "express";
import { findAllUser, findUserByEmail, updateUserPermission } from "../../services/userServices";


class UserController {
  static async findAll(_: Request, res: Response) {
    try {
      const users = await findAllUser()
      return res.status(200).json({ data: users })
    } catch (error) {
      res.status(500).json(error) 
    }
  }

  static async updatePermissions(req: Request, res: Response) {
    try {
      const { email, permissions } = req.body
      await updateUserPermission({ email, permissions })
      const user = await findUserByEmail({ email })

      return res.status(200).json({ data: user, success: true })
    } catch (error) {
      const er = error as Error
      res.status(500).json({ success: false, message: er.message }) 
    }
  }
}

export default UserController