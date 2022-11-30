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
router.post("/book-product", verifyToken, Order.bookProduct);
router.get("/my-orders", verifyToken, Order.myOrders);
router.get("/book/:id", Order.book);
router.get("/sold/:id", Order.sold);

router.get("/ads/:id", Product.advertisement);

router.get("/delete-user/:id", verifyToken, Auth.deleteUser);
router.get("/check-role", Auth.checkRole);
router.get("/all-user", verifyToken, Auth.showUser);
router.get("/all-buyer", verifyToken, Auth.showBuyers);
router.post("/add-wish", verifyToken, Order.addToWish);
router.get("/my-wish-list", verifyToken, Order.myWishList);
router.get("/all-seller", verifyToken, Auth.showSellers);
router.get("/verify-user/:id", verifyToken, Auth.verifyUser);
router.get("/my-buyers", verifyToken, Auth.myBuyers);

router.post("/create-payment-intent", Order.paymentIntent);

router.post("/get-token", Auth.getToken);
router.post("/add-user", Auth.addUser);
router.post("/google-user", Auth.googleUser);

module.exports = router;
