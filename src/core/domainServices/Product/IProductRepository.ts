import { Product } from "../../domain/Product/Product";
import { CreateProductRequest } from "./requests/CreateProductRequest";

export interface IProductRepository {
    create(request: CreateProductRequest): Promise<Product>;
    delete(id: number): Promise<Product>;
    getAll(): Promise<Product[]>;
    getByName(name: string): Promise<Product>;
}