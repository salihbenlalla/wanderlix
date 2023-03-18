import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: `${process.cwd()}/.wrangler/state/d1/DB.sqlite3`,
  define: {
    createdAt: false,
    updatedAt: false,
  },
});

export const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
