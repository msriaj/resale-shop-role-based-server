const Category = require("../controller/category.controller");
const Product = require("../controller/product.controller");
const Order = require("../controller/order.controller");
const Auth = require("../controller/auth.controller");
const { verifyToken } = require("../middleware/tokenVerification");
const { verifyAdmin } = require("../middleware/adminCheck");
const router = require("express").Router();

router.get("/categories", Category.showCategories);
router.post("/add-category", verifyToken, verifyAdmin, Category.addCategory);
router.get("/delete-category/:id", verifyToken, Category.deleteCategories);

router.get("/advertize", Product.advertize);
router.get("/products", verifyToken, Product.products);
router.get("/location/:location", verifyToken, Product.getProductsByLocation);
router.get("/advertize-product/:id", verifyToken, Product.advertizeProduct);
router.get("/delete-product/:id", verifyToken, Product.deleteProduct);
router.get("/get-products", verifyToken, Product.getProducts);
router.get("/get-products/:id", verifyToken, Product.getProductsByCat);
router.post("/add-product", verifyToken, Product.addProduct);

// --------Orders--------
router.post("/bookProduct", verifyToken, Order.bookProduct);

router.get("/delete-user/:id", verifyToken, Auth.deleteUser);
router.get("/check-role", verifyToken, Auth.checkRole);
router.get("/all-user", verifyToken, Auth.showUser);
router.get("/verify-user/:id", verifyToken, Auth.verifyUser);

router.post("/get-token", Auth.getToken);
router.post("/add-user", Auth.addUser);
router.post("/google-user", Auth.googleUser);

module.exports = router;
