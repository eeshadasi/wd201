// models/todo.js
"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }

    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      const allOverdueItems = await Todo.overdue();
      allOverdueItems.forEach((item) => console.log(item.displayableString()));
      console.log("\n");

      console.log("Due Today");
      const allDueTodayItems = await Todo.dueToday();
      allDueTodayItems.forEach((item) => console.log(item.displayableString()));
      console.log("\n");

      console.log("Due Later");
      const allDueLaterItems = await Todo.dueLater();
      allDueLaterItems.forEach((item) => console.log(item.displayableString()));
    }

    static async overdue() {
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.lt]: new Date(),
          },
        },
      });
    }

    static async dueToday() {
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.eq]: new Date(),
          },
        },
      });
    }

    static async dueLater() {
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.gt]: new Date(),
          },
        },
      });
    }

    static async markAsComplete(id) {
      return await Todo.update({ completed: true }, { where: { id } });
    }

    displayableString() {
      const now = new Date().toLocaleDateString();
      const itemDueDate = new Date(this.dueDate).toLocaleDateString();
      const isChecked = this.completed ? "[x]" : "[ ]";

      return `${this.id}. ${isChecked} ${this.title}${
        itemDueDate === now ? "" : " " + this.dueDate
      }`;
    }
  }

  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    },
  );
  return Todo;
};
