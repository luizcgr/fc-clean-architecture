import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../entity/product";

export class ProductValidator implements ValidatorInterface<Product> {
  validate(entity: Product): void {
    if (entity.id.length === 0) {
      entity.notification.addError({
        context: "product",
        message: "Id is required",
      });
    }
    if (entity.name.length === 0) {
      entity.notification.addError({
        context: "product",
        message: "Name is required",
      });
    }
    if (entity.price < 0) {
      entity.notification.addError({
        context: "product",
        message: "Price must be greater than zero",
      });
    }
  }
}
