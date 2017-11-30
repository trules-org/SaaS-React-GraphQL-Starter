//resolvers
import bycrpt from 'bcrypt'
import jwt from 'jsonwebtoken'
import _ from 'lodash'

export default {    
    
	Query: {
		allUsers: (parent, args, { models }) => models.User.findAll(),
		getUser: (parent, { username }, { models, user }) => {
			console.log(user)
			return models.User.findOne({
				where: {
					username,
				},
			})
		}
	},
    
	Mutation: {
		updateUser: (parent, { username, newUsername }, { models }) =>
			models.User.update({ username: newUsername }, { where: { username } }),
		deleteUser: (parent, args, { models }) => {  
			models.User.destroy({ where: args })
		},
		register: async (parent, args, { models }) => {
			const user = args
			user.password = await bycrpt.hash(user.password, 12)
			return models.User.create(user)
		},
		login: async (parent, {email, password}, { models, SECRET }) => {
			const user = await models.User.findOne({ where: { email }})
			if (!user) {
				throw new Error(`No user with email ${email}`)
			}
			const valid = await bycrpt.compare( password, user.password )
			if (!valid) {
				throw new Error(`Incorrect password for user with email ${email}`)
			}
			const token = jwt.sign(
				{
					use: _.pick(user, ['id','username']),
				},
				SECRET,
				{
					expiresIn: '1y',
				},
			)
			return token
		}
	},    
}