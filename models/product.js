const Sequelize = require("sequelize");

class Product extends Sequelize.Model {
  static initiate(sequelize) {
    // 테이블 정보 입력
    Product.init(
      {
        name: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        img1: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        img2: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        img3: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        company: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        origin: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true, // createdAt, updatedAt
        underscored: false, // created_at, updated_at (true일시)
        modelName: "Product",
        tableName: "products",
        paranoid: true, // deletedAt 삭제일
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    // 테이블 관계를 입력
    db.Product.belongsTo(db.Category1);
    db.Product.belongsTo(db.Category2);
    db.Product.belongsTo(db.User);
  }
}

module.exports = Product;
