import jwt from "jsonwebtoken"
import { User } from "../models/user.model"

const key = 'abcd1234'

const sign = (payload: User) => {
  return jwt.sign(payload, key)
}
const verify = (token: string) => {
  return jwt.verify(token, key)
}

export default { sign, verify }

