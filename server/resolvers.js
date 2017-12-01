//resolvers
import bycrpt from 'bcrypt'
import jwt from 'jsonwebtoken'
import _ from 'lodash'

export default {
	
	User: {		
		posts: ({ id }, args, { models }) =>		
			models.Post.findAll({		
				where: {		
				  creatorId: id,		
			},		
			}),		
	},

	Post: {	
		creator: ({ creatorId }, args, { models }) =>	
			models.User.findOne({	
				where: {	
				  id: creatorId,	
				},	
			}),	
	},
	
	Query: {
		allUsers: (parent, args, { models }) => models.User.findAll(),
		getUser: (parent, { username }, { models, user }) => {
			console.log(user)
			return models.User.findOne({
				where: {
					username,
				},
			})
		},

		getUserPosts: (parent, { creatorId }, { models }) =>		
			  models.Post.findAll({		
				where: {		
				  creatorId,		
				},		
			  }),
	},
    
	Mutation: {
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
		},

		updateUser: (parent, { username, newUsername }, { models }) =>
			models.User.update({ username: newUsername }, { where: { username } }),
		
		deleteUser: (parent, args, { models }) => {  
			models.User.destroy({ where: args })
		},

		createPost: (parent, args, { models }) =>
			  models.Post.create(args),
	},    
}