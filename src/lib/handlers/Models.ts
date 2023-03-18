import { DataTypes } from "sequelize";
import { sequelize } from "./sequelize.js";

export const Comment = sequelize.define("Comment", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  website: {
    type: DataTypes.TEXT,
  },
  avatarImage: {
    type: DataTypes.TEXT,
  },
  authorName: {
    type: DataTypes.TEXT,
  },
  email: {
    type: DataTypes.TEXT,
  },
  commentDate: {
    type: DataTypes.TEXT,
  },
  commentText: {
    type: DataTypes.TEXT,
  },
});
