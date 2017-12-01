import Sequelize from 'sequelize'
/*
const sequelize = new Sequelize(
	'test_graphql_db',
	'test_graphql_admin',
	'iamapassword',
	{
		host: 'localhost',
		dialect: 'postgres',
	}
)
*/
// Set up the connection to the database
const sequelize = new Sequelize(
	'relay',
	'root',
	'password',
	{
		dialect: 'mysql',
		host: 'localhost'
	}
)

const db = {
	User: sequelize.import('./user'),
	Post: sequelize.import('./post'),
}

Object.keys(db).forEach((modelName) => {
	if ('associate' in db[modelName]) {
		db[modelName].associate(db)
	}
})

db.sequelize = sequelize

export default db