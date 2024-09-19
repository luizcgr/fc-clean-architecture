import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

describe("Test list product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new ListProductUseCase(productRepository);

    const banana = new Product("123", "Banana", 100);
    await productRepository.create(banana);

    const iceCream = new Product("321", "Ice Cream", 200);
    await productRepository.create(iceCream);

    const { products } = await usecase.execute({});

    expect(products.length).toBe(2);
    expect(products[0].name).toBe(banana.name);
    expect(products[0].price).toBe(banana.price);
    expect(products[1].name).toBe(iceCream.name);
    expect(products[1].price).toBe(iceCream.price);
  });
});
