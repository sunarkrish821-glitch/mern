import ProductModel from "../model/ProductModel"
import slugify from "slugify"
import { mapImage } from "../utilities/helpers";
import type { AuthRequest } from "../types/Request";
import { AppConfig } from "../config/app-env";

class ProductService {
  static async generateUniqueSlug(title: string) {
    let slug = slugify(title, {
      lower: true,
    });

    while (await ProductModel.findOne({ slug: slug })) {
      slug = slug + "-" + Date.now();
      // slug = slug +"-"+ Date.now()
    }
    return slug;
  }

  static async mapProductForModel(req: AuthRequest) {
    //
    const data = req.body; // except file

    // slug
    data.slug = await ProductService.generateUniqueSlug(data.title);

    data.price = data.price * 100;
    data.afterDiscount = data.discountPercentage
      ? data.price - (data.price * data.discountPercentage) / 100
      : data.price;

    // const file = req.file;    // for single file upload
    const files = req.files as {
      thumbnail: Array<Express.Multer.File>;
      images: Array<Express.Multer.File>;
    };

    if (files && files?.thumbnail && files.thumbnail.length) {
      // data.thumbnail = files.thumbnail[0].destination;
      data.thumbnail = mapImage(files.thumbnail[0]);
    }

    if (files && files.images && files.images.length) {
      data.images = files.images.map((image) => {
        return mapImage(image);
      });
    }

    data.createdBy = req?.loggedInUser?._id;

    return data;
  }

  static async mapProductForUpdateModel(req: AuthRequest, oldProduct: any) {
    //
    const data = req.body; // except file

    data.price = data.price * 100;
    data.afterDiscount = data.discountPercentage
      ? data.price - (data.price * data.discountPercentage) / 100
      : data.price;

    // const file = req.file;    // for single file upload
    const files = req.files as {
      thumbnail: Array<Express.Multer.File>;
      images: Array<Express.Multer.File>;
    };

    if (files && files?.thumbnail && files.thumbnail.length) {
      // data.thumbnail = files.thumbnail[0].destination;
      data.thumbnail = mapImage(files.thumbnail[0]);
    } else {
      data.thumbnail = oldProduct.thumbnail
    }

    data.images = [...oldProduct.images];
    if (files && files.images && files.images.length) {
      const images = files.images.map((image) => {
        return mapImage(image);
      });
      data.images = [...data.images, ...images]
    }

    data.updatedBy = req?.loggedInUser?._id;

    // put => property => obj mapp
    return data;
  }

  static async createProduct(data: any) {
    try {
      const product = new ProductModel(data);
      return await product.save();
    } catch (exception) {
      throw exception;
    }
  }

  static mapProductDetail(prod: any) {
    return {
      thumbnail: `${AppConfig.assetUrl}uploads/products/${prod?.thumbnail?.filename}`,
      _id: prod._id,
      title: prod.title,
      slug: prod.slug,
      description: prod.description,
      category: prod.category,
      price: prod.price,
      afterDiscount: prod.afterDiscount,
      tags: prod.tags,
      availabilityStatus: prod.availabilityStatus,
      minimumOrderQuantity: prod.minimumOrderQuantity,
    };
  }

  static async getAllRowsByFilter(
    filter = {},
    projection = {},
    config = { page: 1, limit: 10 },
  ) {
    try {
      // 100
      // 10 -> 10
      // page = 1, 0-9, skip = 0
      // page = 2 => 10-19  = 10
      // page = 3 => 20-29  = 20

      const skip = (+config.page - 1) * +config.limit;
      const productList = await ProductModel.find(filter, projection)
        .populate("category")
        .sort({
          createdAt: "desc",
        })
        .skip(skip)
        .limit(config.limit);
      const totalProducts = await ProductModel.countDocuments(filter);

      return {
        rows: productList.map(ProductService.mapProductDetail),
        pagination: {
          current: +config.page,
          limit: +config.limit,
          totalCount: totalProducts,
          noOfPages: Math.ceil(totalProducts / +config.limit),
        },
      };
    } catch (exception) {
      // console.log(exception)
      throw exception;
    }
  }

  static async getSingleRowByFilter(filter: Record<string, any>) {
    try {
      const data = await ProductModel.findOne(filter).populate("category");
      return data;
    } catch (exception) {
      throw exception;
    }
  }

  static async updateSinglRowByFilter(filter: Record<string, any>, mappedData: any) {
    try {
      // data found -> update -> before update model will be
      // if new flag is send -> updated model will be returned
      const update = await ProductModel.findOneAndUpdate(filter, mappedData, {new: true}); 
      // await ProductModel.findByIdAndUpdate(id, mappedData)

      // only acknowledgement willbe sent 
      // const del = await ProductModel.updateOne(filter, mappedData)
      return update;
    } catch(except) {
      throw except
    }
  }

  static async deleteSingleRowByFilter(filter: Record<string, any>) {
    try {
      const del = await ProductModel.findOneAndDelete(filter)
      return del;
    } catch(exception) {
      throw exception
    }
  }
}
export default ProductService