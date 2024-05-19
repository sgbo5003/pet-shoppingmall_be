const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static initiate(sequelize) {
    // 테이블 정보 입력
    User.init(
      {
        email: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        name: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        phone: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        provider: {
          type: Sequelize.ENUM("local", "kakao"),
          allowNull: false,
          defaultValue: "local",
        },
        snsId: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
        adminYn: {
          type: Sequelize.ENUM("Y", "N"),
          allowNull: false,
          defaultValue: "N",
        },
      },
      {
        sequelize,
        timestamps: true, // createdAt, updatedAt
        underscored: false, // created_at, updated_at (true일시)
        modelName: "User",
        tableName: "users",
        paranoid: true, // deletedAt 유저 삭제일
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    // 테이블 관계를 입력
  }
}

module.exports = User;
