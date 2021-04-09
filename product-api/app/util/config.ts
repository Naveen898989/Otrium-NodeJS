
const SERVER_CONFIG = {
    SERVER_PORT: process.env.OTRIUM_API_SERVER_PORT || 3000,
    ACCESS_TOKEN: process.env.OTRIUM_API_ACCESS_TOKEN,
    MAX_UPLOAD_SIZE: 8 * 1000 * 1000
}

const DB_CONFIG = {
    DB_HOST: process.env.OTRIUM_API_MYSQL_HOST || 'localhost',
    DB_USER: process.env.OTRIUM_API_DB_USER || 'root',
    DB_PASSWORD: process.env.OTRIUM_API_DB_PASSWORD,
    DB_NAME: process.env.OTRIUM_API_DB_NAME || 'otrium'
}

const DB_TABLE_CONSTANTS = {
    products: {
        NAME: 'products',
        COLUMN_PRODUCT_ID: 'product_id',
        COLUMN_PRODUCT_NAME: 'product_name',
        COLUMN_PRODUCT_SLUG: 'product_slug',
        COLUMN_SKU: 'sku',
        COLUMN_BRAND: 'brand',
        COLUMN_DELETED: 'deleted'
    }
}

const config = {
    server: SERVER_CONFIG,
    dbConfig: DB_CONFIG,
    dbTableConstants: DB_TABLE_CONSTANTS
}

export default config;