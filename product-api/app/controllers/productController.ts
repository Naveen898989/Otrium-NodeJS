import { NextFunction, Request, Response } from "express";
import productRepo from '../repo/productRepo';
import Joi from 'joi';
import csvParser from 'csv-parse';


const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await productRepo.getAllProducts();

        return res.status(200).json({
            result
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            stack: err.stack
        });
    }
};

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = Joi.object({
            product_name: Joi.string().required(),
            product_slug: Joi.string().required(),
            sku: Joi.string().required(),
            brand: Joi.string().required()
        });

        // Validations
        try {
            await schema.validateAsync(req.body);
        } catch (err) {
            return res.status(400).json({
                message: err.message,
                stack: err.stack
            });
        }

        const { product_name, product_slug, sku, brand } = req.body;

        const result = await productRepo.createProduct({ product_name, product_slug, sku, brand });

        return res.status(201).json({
            message: "Item created"
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            stack: err.stack
        });
    }
};

const bulkCreateProducts = async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.array().items(Joi.array().items().length(4)).min(1);

    if (!req.file) {
        return res.status(400).json({
            message: "CSV not found"
        });
    }

    const csvParseOptions = { comment: '#', trim: true };

    await csvParser(req.file.buffer.toString(), csvParseOptions, async (err, output) => {
        try {
            if (err) {
                return res.status(500).json({
                    message: err.message,
                    stack: err.stack
                });
            }

            try {
                await schema.validateAsync(output);
            } catch (err) {
                return res.status(400).json({
                    message: "Invalid CSV format",
                    stack: err.stack
                });
            }

            const result = await productRepo.bulkCreateProducts(output);

            return res.status(200).json({
                message: "Items created"
            });

        } catch (err) {
            return res.status(500).json({
                message: err.message,
                stack: err.stack
            });
        }
    });
};

const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = Joi.object({
            product_name: Joi.string(),
            product_slug: Joi.string(),
            sku: Joi.string(),
            brand: Joi.string()
        }).or('product_name', 'product_slug', 'sku', 'brand');

        const { product_id } = req.params;
        const { product_name, product_slug, sku, brand } = req.body;

        // Validations
        try {
            Joi.assert(product_id, Joi.number().required());

            // Check if product ID exists
            await productRepo.checkProductById(product_id);

            await schema.validateAsync(req.body);
        } catch (err) {
            return res.status(400).json({
                message: err.message,
                stack: err.stack
            });
        }

        const result = await productRepo.updateProduct({ product_id, product_name, product_slug, sku, brand });

        return res.status(200).json({
            message: "Item updated"
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            stack: err.stack
        });
    }
};

const getSingleProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { query } = req.params;

        // Validations
        try {
            Joi.assert(query, Joi.string().required());
        } catch (err) {
            return res.status(400).json({
                message: err.message,
                stack: err.stack
            });
        }

        let result: any;
        if (!isNaN(parseInt(query))) {
            result = await productRepo.getProductById(query);
        } else {
            result = await productRepo.getProductBySlug(query);
        }

        if (result && result.length > 0) {
            return res.status(200).json({
                result
            });
        } else {
            return res.status(404).json({
                message: "Product not found"
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            stack: err.stack
        });
    }
};

const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { product_id } = req.params;

        // Validations
        try {
            Joi.assert(product_id, Joi.number().required());

            // Check if product ID exists
            await productRepo.checkProductById(product_id);
        } catch (err) {
            return res.status(400).json({
                message: err.message,
                stack: err.stack
            });
        }

        const result: any = productRepo.deleteProduct(product_id);

        return res.status(200).json({
            message: "Item deleted"
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            stack: err.stack
        });
    }
};

export default {
    getAllProducts,
    createProduct,
    bulkCreateProducts,
    updateProduct,
    getSingleProducts,
    deleteProduct
}