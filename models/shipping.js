const Sequelize = require("sequelize");

class Shipping extends Sequelize.Model {
  static initiate(sequelize) {
    // 테이블 정보 입력
    Shipping.init(
      {
        name: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        address: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        phone1: {
          // 전화번호
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        phone2: {
          // 핸드폰 번호
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        request: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false, // createdAt, updatedAt
        underscored: false, // created_at, updated_at (true일시)
        modelName: "Shipping",
        tableName: "shipping",
        paranoid: true, // deletedAt 삭제일
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    // 테이블 관계를 입력
    db.Shipping.belongsTo(db.Order);
  }
}

module.exports = Shipping;
