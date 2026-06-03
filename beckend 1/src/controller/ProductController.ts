import type { Request, Response, NextFunction } from "express";
import ProductService from "../services/ProductService";
import CategoryModel from "../model/CategoryModel";
import { AuthRequest } from "../types/Request";

class ProductController {
  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ProductService.mapProductForModel(req);
      // product create
      const product = await ProductService.createProduct(data);
      res.json({
        data: product,
        message: "Product Created",
        meta: null,
      });
    } catch (except) {
      next(except);
    }
  }

  async getAllProductsByUser(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      // db query
      const paginationConfig = {
        page: Number(req?.query?.page || 1),
        limit: Number(req?.query?.limit || 10),
      };
      let filter = {};
      //
      if (req.query.search) {
        filter = {
          $or: [
            { title: new RegExp(req.query.search as string, "i") },
            { description: new RegExp(req.query.search as string, "i") },
          ],
        };
      }
      const { rows, pagination } = await ProductService.getAllRowsByFilter(
        filter,
        {
          dimensions: 0,
          weight: 0,
          warrantyInformation: 0,
          shippingInformation: 0,
          returnPolicy: 0,
          images: 0,
          createdBy: 0,
          updatedBy: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        },
        paginationConfig,
      );
      res.json({
        data: rows,
        message: "Product List",
        meta: { pagination },
      });
    } catch (exception) {
      next(exception);
    }
  }

  async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      // Data fetch operation
      // stock available products
      const paginationConfig = {
        page: Number(req?.query?.page || 1),
        limit: Number(req?.query?.limit || 10),
      };
      let filter: Record<string, any> = {
        availabilityStatus: { $ne: "not available" },
      };
      if (req.query.search) {
        filter = {
          ...filter,
          $or: [
            { title: new RegExp(req.query.search as string, "i") },
            { description: new RegExp(req.query.search as string, "i") },
          ],
        };
      }
      const { rows, pagination } = await ProductService.getAllRowsByFilter(
        filter,
        {
          dimensions: 0,
          weight: 0,
          warrantyInformation: 0,
          shippingInformation: 0,
          returnPolicy: 0,
          images: 0,
          createdBy: 0,
          updatedBy: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        },
        paginationConfig,
      );
      res.json({
        data: rows,
        message: "Product List",
        meta: { pagination },
      });
    } catch (exception) {
      console.log(exception);
      next(exception);
    }
  }

  async getAllCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const cat = await CategoryModel.find();
      res.json({
        data: cat,
        message: "Categories List",
        meta: null,
      });
    } catch (except) {
      next(except);
    }
  }

  async getProductDetailBySlug(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const slug = req.params.productSlug;
      const productDetail = await ProductService.getSingleRowByFilter({
        slug: slug,
      });
      if (!productDetail) {
        throw { code: 404, message: "Product not found" };
      }
      res.json({
        data: productDetail,
        message: "Product Detail",
        meta: null,
      });
    } catch (except) {
      next(except);
    }
  }

  async homeGetProductDetailBySlug(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const slug = req.params.productSlug;
      const productDetail = await ProductService.getSingleRowByFilter({
        slug: slug,
        availabilityStatus: { $ne: "not available" },
      });
      if (!productDetail) {
        throw { code: 404, message: "Product not found" };
      }
      // Detail page
      const { rows } = await ProductService.getAllRowsByFilter(
        {
          _id: { $ne: productDetail._id },
          category: productDetail.category._id,
          availabilityStatus: { $ne: "not available" },
        },
        {
          dimensions: 0,
          weight: 0,
          warrantyInformation: 0,
          shippingInformation: 0,
          returnPolicy: 0,
          images: 0,
          createdBy: 0,
          updatedBy: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        },
        { page: 1, limit: 8 },
      );
      // comments / review

      res.json({
        data: {
          detail: productDetail,
          related: rows,
          reviews: null,
        },
        message: "Product Detail Page",
        meta: null,
      });
    } catch (except) {
      next(except);
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const slug = req.params.productSlug;
      const productDetail = await ProductService.getSingleRowByFilter({
        slug: slug,
      });
      if (!productDetail) {
        throw { code: 404, message: "Product not found" };
      }
      const mappedData = await ProductService.mapProductForUpdateModel(
        req,
        productDetail,
      );
      // update
      const update = await ProductService.updateSinglRowByFilter(
        { slug: slug },
        mappedData,
      );
      res.json({
        data: update,
        message: "product Updated",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  }

  async deleteProductById(req: Request, res: Response, next: NextFunction) {
    try {
      // productId validate
      const productId = req.params.productId;
      const productDetail = await ProductService.getSingleRowByFilter({
        _id: productId,
      });
      if (!productDetail) {
        // exce
        throw { code: 404, message: "Product not found" };
      }
      const deletedStatus = await ProductService.deleteSingleRowByFilter({
        _id: productId,
      });
      res.json({
        data: deletedStatus,
        message: "Product deleted successfully.",
        meta: null,
      });
      // if(!deletedStatus) {
      //   //
      //   throw {code: 404, message: "Product does not exists."}
      // }
    } catch (exception) {
      next(exception);
    }
  }

  async getAllProductByCatSlug(req: Request,res: Response,next: NextFunction) {
    try {
      // cat verify 
      const catDetail = await CategoryModel.findOne({
        slug: req.params.slug,
      });
      if(!catDetail) {
        throw {code: 404, message: "Category not found"}
      }

      const paginationConfig = {
        page: Number(req?.query?.page || 1),
        limit: Number(req?.query?.limit || 10),
      };

      let filter: Record<string, any> = {
        availabilityStatus: { $ne: "not available" },
        category: catDetail._id
      };
      
      if (req.query.search) {
        filter = {
          ...filter,
          $or: [
            { title: new RegExp(req.query.search as string, "i") },
            { description: new RegExp(req.query.search as string, "i") },
          ],
        };
      }


      const { rows, pagination } = await ProductService.getAllRowsByFilter(
        filter,
        {
          dimensions: 0,
          weight: 0,
          warrantyInformation: 0,
          shippingInformation: 0,
          returnPolicy: 0,
          images: 0,
          createdBy: 0,
          updatedBy: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        },
        paginationConfig,
      );
      res.json({
        data: rows,
        message: "Product List",
        meta: { pagination },
      });
    } catch (exception) {
      console.log(exception);
      next(exception);
    }
  }
}

export default ProductController;