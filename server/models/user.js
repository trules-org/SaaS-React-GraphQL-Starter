
export default (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		username: {
			type: DataTypes.STRING,
			unique: true
		},
		email: {
			type: DataTypes.STRING,
			unique: true
		},
		password: DataTypes.STRING,
	})
			
	User.associate = (models) => {
		// 1 to many with suggestion
		User.hasMany(models.Post, {
			foreignKey: 'creatorId',
		})
	}	
	return User
}