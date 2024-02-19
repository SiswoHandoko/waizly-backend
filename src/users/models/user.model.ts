import { Sequelize } from 'sequelize';
import { Column, CreatedAt, DataType, Model, Table, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model {
  @Column({
		primaryKey: true,
		type: DataType.INTEGER,
		autoIncrement: true
	})
  id: number;

  @Column({
		type: DataType.STRING,
		allowNull: false,
		field: 'first_name'
	})
  firstName: string;

  @Column({
		type: DataType.STRING,
		allowNull: false,
		field: 'last_name'
	})
  lastName: string;

  @Column({
		type: DataType.BOOLEAN,
		allowNull: false,
		field: 'is_active',
    defaultValue: true
	})
  isActive: boolean;
  
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

  // Custom property to format updatedAt as a string
  get formattedUpdatedAt(): string {
    return this.updatedAt.toISOString(); // or use your preferred date formatting method
  }
}
