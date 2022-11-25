const {
  addCategory,
  showCategories,
  deleteCategories,
} = require("../controller/category.controller");
const {
  addProduct,
  products,
  deleteProduct,
  advertizeProduct,
  getProducts,
  getProductsByCat,
} = require("../controller/product.controller");
const {
  addUser,
  googleUser,
  checkRole,
  showUser,
  deleteUser,
  verifyUser,
} = require("../controller/user.controller");
const router = require("express").Router();

router.get("/all-user", showUser);
router.get("/delete-user/:id", deleteUser);
router.get("/verify-user/:id", verifyUser);
router.get("/check-role", checkRole);
router.get("/categories", showCategories);
router.get("/products", products);
router.get("/delete-category/:id", deleteCategories);
router.get("/advertize-product/:id", advertizeProduct);
router.get("/delete-product/:id", deleteProduct);
router.get("/get-products", getProducts);
router.get("/get-products/:id", getProductsByCat);

router.post("/add-user", addUser);
router.post("/add-product", addProduct);
router.post("/add-category", addCategory);
router.post("/google-user", googleUser);

module.exports = router;
