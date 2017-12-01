export default (sequelize, DataTypes) => {    
	const Friendship = sequelize.define('friendship', {    
		userId: DataTypes.INTEGER,   
		friendId: DataTypes.INTEGER,   
	})    
	return Friendship    
}