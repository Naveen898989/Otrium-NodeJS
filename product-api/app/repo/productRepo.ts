import baseRepo from './baseRepo';
import config from '../util/config';

const getAllProducts = async () => {
    const query = `SELECT * FROM ${config.dbTableConstants.products.NAME} WHERE ${config.dbTableConstants.products.COLUMN_DELETED}=0`;

    try {
        const connection = await baseRepo.connection();
        const results = await baseRepo.query(connection, query);

        return results;
    } catch (err) {
        throw err;
    }
};

const createProduct = async (params: { product_name: string, product_slug: string, sku: string, brand: string }) => {
    const query = `INSERT INTO ${config.dbTableConstants.products.NAME} (${config.dbTableConstants.products.COLUMN_PRODUCT_NAME}, ${config.dbTableConstants.products.COLUMN_PRODUCT_SLUG}, ${config.dbTableConstants.products.COLUMN_SKU}, ${config.dbTableConstants.products.COLUMN_BRAND}) VALUES ('${params.product_name}', '${params.product_slug}', '${params.sku}', '${params.brand}')`;

    try {
        const connection = await baseRepo.connection();
        const results = await baseRepo.query(connection, query);

        return results;
    } catch (err) {
        throw err;
    }
};

const bulkCreateProducts = async (params: string[][]) => {
    let query = `INSERT INTO ${config.dbTableConstants.products.NAME} (${config.dbTableConstants.products.COLUMN_PRODUCT_NAME}, ${config.dbTableConstants.products.COLUMN_PRODUCT_SLUG}, ${config.dbTableConstants.products.COLUMN_SKU}, ${config.dbTableConstants.products.COLUMN_BRAND}) VALUES`;

    for (const productData of params) {
        query += `('${productData[0]}', '${productData[1]}', '${productData[2]}', '${productData[3]}'),`;
    }

    query = query.slice(0, -1);

    try {
        const connection = await baseRepo.connection();
        const results = await baseRepo.query(connection, query);

        return results;
    } catch (err) {
        throw err;
    }
};

const checkProductById = async (product_id: string) => {
    const query = `SELECT * FROM ${config.dbTableConstants.products.NAME} WHERE ${config.dbTableConstants.products.COLUMN_PRODUCT_ID}=${product_id} AND ${config.dbTableConstants.products.COLUMN_DELETED}=0`;

    try {
        const connection = await baseRepo.connection();
        const results: any = await baseRepo.query(connection, query);

        if (results && results.length > 0) {
            return true;
        } else {
            throw new Error("Product not found");
        }
    } catch (err) {
        throw err;
    }
};

const getProductById = async (product_id: string) => {
    const query = `SELECT * FROM ${config.dbTableConstants.products.NAME} WHERE ${config.dbTableConstants.products.COLUMN_PRODUCT_ID}=${product_id} AND ${config.dbTableConstants.products.COLUMN_DELETED}=0`;

    try {
        const connection = await baseRepo.connection();
        const results = await baseRepo.query(connection, query);

        return results;
    } catch (err) {
        throw err;
    }
};

const getProductBySlug = async (product_slug: string) => {
    const query = `SELECT * FROM ${config.dbTableConstants.products.NAME} WHERE ${config.dbTableConstants.products.COLUMN_PRODUCT_SLUG}='${product_slug}' AND ${config.dbTableConstants.products.COLUMN_DELETED}=0`;

    try {
        const connection = await baseRepo.connection();
        const results = await baseRepo.query(connection, query);

        return results;
    } catch (err) {
        throw err;
    }
};

const updateProduct = async (params: { product_id: string, product_name?: string, product_slug?: string, sku?: string, brand?: string }) => {
    let query = `UPDATE ${config.dbTableConstants.products.NAME} SET`

    if (params.product_name) {
        query += ` ${config.dbTableConstants.products.COLUMN_PRODUCT_NAME}='${params.product_name}',`;
    }
    if (params.product_slug) {
        query += ` ${config.dbTableConstants.products.COLUMN_PRODUCT_SLUG}='${params.product_slug}',`;
    }
    if (params.sku) {
        query += ` ${config.dbTableConstants.products.COLUMN_SKU}='${params.sku}',`;
    }
    if (params.brand) {
        query += ` ${config.dbTableConstants.products.COLUMN_BRAND}='${params.brand}',`;
    }

    query = query.slice(0, -1);

    query += ` WHERE ${config.dbTableConstants.products.COLUMN_PRODUCT_ID}=${params.product_id}`;

    try {
        const connection = await baseRepo.connection();
        const results = await baseRepo.query(connection, query);

        return results;
    } catch (err) {
        throw err;
    }
};

const deleteProduct = async (product_id: string) => {
    const query = `UPDATE ${config.dbTableConstants.products.NAME} SET ${config.dbTableConstants.products.COLUMN_DELETED}=1 WHERE ${config.dbTableConstants.products.COLUMN_PRODUCT_ID}=${product_id}`;

    try {
        const connection = await baseRepo.connection();
        const results: any = await baseRepo.query(connection, query);

        return results;
    } catch (err) {
        throw err;
    }
};

export default {
    getAllProducts,
    createProduct,
    checkProductById,
    updateProduct,
    getProductById,
    getProductBySlug,
    deleteProduct,
    bulkCreateProducts
}