'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      // i like tacos
    }
  }
  
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Title is required'
        },
        len: {
          args: [1, 255],
          msg: 'Title must be between 1 and 255 characters'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Todo',
    tableName: 'Todos',
    timestamps: true
  });
  
  return Todo;
};