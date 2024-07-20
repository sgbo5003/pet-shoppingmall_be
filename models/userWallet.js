const Sequelize = require("sequelize");

class UserWallet extends Sequelize.Model {
  static initiate(sequelize) {
    // 테이블 정보 입력
    UserWallet.init(
      {
        point: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false, // createdAt, updatedAt
        underscored: false, // created_at, updated_at (true일시)
        modelName: "UserWallet",
        tableName: "user_wallet",
        paranoid: false, // deletedAt 삭제일
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    // 테이블 관계를 입력
    db.UserWallet.belongsTo(db.User);
  }
}

module.exports = UserWallet;
