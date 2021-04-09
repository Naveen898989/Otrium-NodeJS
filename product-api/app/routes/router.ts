import express, { NextFunction, Request, Response } from 'express';
import controller from '../controllers/productController';
import multer from 'multer';
import config from '../util/config';
import path from 'path';


//Upload config
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: config.server.MAX_UPLOAD_SIZE },
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== '.csv') {
            return callback(new Error('Only CSV files allowed'));
        }
        callback(null, true)
    }
});

const validateAccessToken = (req: Request, res: Response, next: NextFunction) => {
    if (req.headers['x-access-token'] === config.server.ACCESS_TOKEN) {
        next();
    } else {
        return res.status(401).json({ message: "Unauthorized" });
    }
}

const router = express.Router();

router.get('/products', validateAccessToken, controller.getAllProducts);
router.post('/products/create', validateAccessToken, controller.createProduct);
router.post('/products/bulk', validateAccessToken, upload.single('file'), controller.bulkCreateProducts);
router.patch('/products/:product_id', validateAccessToken, controller.updateProduct);
router.get('/products/:query', validateAccessToken, controller.getSingleProducts);
router.delete('/products/:product_id', validateAccessToken, controller.deleteProduct);

export = router;