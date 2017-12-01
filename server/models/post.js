
export default (sequelize, DataTypes) => {    
	const Post = sequelize.define('post', {    
		text: DataTypes.STRING,    
	})    
	return Post    
}