import { Sequelize } from 'sequelize';
import { Column, CreatedAt, DataType, Model, Table, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: 'auth' })
export class Auth extends Model {
  @Column({
		primaryKey: true,
		type: DataType.INTEGER,
		autoIncrement: true
	})
  id: number;

  @Column({
		type: DataType.INTEGER,
		allowNull: false,
		field: 'user_id',
    unique: true
	})
  userId: string;

  @Column({
		type: DataType.STRING,
		allowNull: false,
		field: 'username',
    unique: true,
	})
  username: string;

  @Column({
		type: DataType.STRING,
		allowNull: false,
		field: 'password'
	})
  password: string;
  
  @CreatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('NOW'),
    field: 'created_at'
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('NOW'),
    field: 'updated_at'
  })
  updatedAt: Date;

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}
