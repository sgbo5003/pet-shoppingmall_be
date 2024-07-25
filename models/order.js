const Sequelize = require("sequelize");

class Order extends Sequelize.Model {
  static initiate(sequelize) {
    // 테이블 정보 입력
    Order.init(
      {
        status: {
          type: Sequelize.ENUM,
          values: ["Pending", "Paid", "Shipped", "Delivered", "Cancelled"], // Pending: 주문이 생성되었으나 아직 결제가 완료되지 않은 상태, Paid: 결제가 완료된 상태, Shipped: 주문이 발송된 상태, Delivered: 주문이 고객에게 배송 완료된 상태, Cancelled: 주문이 취소된 상태
          defaultValue: "Pending",
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true, // createdAt, updatedAt
        underscored: false, // created_at, updated_at (true일시)
        modelName: "Order",
        tableName: "orders",
        paranoid: true, // deletedAt 삭제일
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    // 테이블 관계를 입력
    db.Order.belongsTo(db.User);
  }
}

module.exports = Order;
