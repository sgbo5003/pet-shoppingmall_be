const Sequelize = require("sequelize");

class OrderItem extends Sequelize.Model {
  static initiate(sequelize) {
    // 테이블 정보 입력
    OrderItem.init(
      {
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false, // createdAt, updatedAt
        underscored: false, // created_at, updated_at (true일시)
        modelName: "OrderItem",
        tableName: "order_item",
        paranoid: true, // deletedAt 삭제일
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    // 테이블 관계를 입력
    db.OrderItem.belongsTo(db.Order);
    db.OrderItem.belongsTo(db.Product);
  }
}

module.exports = OrderItem;
