const Sequelize = require("sequelize");

class Category1 extends Sequelize.Model {
  static initiate(sequelize) {
    // 테이블 정보 입력
    Category1.init(
      {
        name: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        useYn: {
          type: Sequelize.ENUM("Y", "N"),
          allowNull: false,
          defaultValue: "N",
        },
      },
      {
        sequelize,
        timestamps: false, // createdAt, updatedAt
        underscored: false, // created_at, updated_at (true일시)
        modelName: "Category1",
        tableName: "category1",
        paranoid: false, // deletedAt 유저 삭제일
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    // 테이블 관계를 입력
    db.Category1.hasMany(db.Category2);
    db.Category1.hasMany(db.Product);
  }
}

module.exports = Category1;
