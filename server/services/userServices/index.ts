import { FindOptions } from "sequelize"
import { User } from "../../models/user.model"


export const findUserByEmail = ({ email }: { email: string }) => {
  return User.findOne({ where: { email } })
}

export const findOrCreateUser = ({ email }: { email: string }) => {
  return User.findOrCreate({ where: { email } })
}

export const findAllUser = (options?: FindOptions<any>) => {
  return User.findAll(options)
}

export const updateUserPermission = ({ permissions, email }: { permissions: string; email: string }) => { 
  return User.update({ permissions }, { where: { email }, limit: 1 })
}