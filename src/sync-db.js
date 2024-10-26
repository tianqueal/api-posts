/* eslint-disable no-undef */
import { sequelize } from './db/db.config.js';
import { Post } from './posts/entities/Post.entity.js';
import { User } from './users/entities/User.entity.js';

(async () => {
  try {
    User.hasMany(Post, { foreignKey: 'userId' });
    Post.belongsTo(User, { foreignKey: 'userId' });

    await sequelize.sync({ force: true });
    console.log('Base de datos sincronizada con éxito.');
    process.exit(0);
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
    process.exit(1);
  }
})();
