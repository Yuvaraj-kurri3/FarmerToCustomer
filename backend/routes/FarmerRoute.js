const farmerController=require('../controller/farmerController');
const express=require('express');
const router=express.Router();
const {authentication}=require('../middlewares/authMiddleware');
const  multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Make sure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });
// Route to add new product (Farmer only)
router.post('/add-product',authentication,upload.single('Pimage'),farmerController.addProduct);

// Route to update product (Farmer only)
router.put('/update-product/:id',authentication,farmerController.updateProduct);
// router.put('/update-product/:id',farmerController.updateProduct);

// Route to delete product (Farmer only)
router.delete('/delete-product/:id',authentication ,farmerController.deleteProduct);
// get all products for a farmer
router.get('/products',authentication ,farmerController.getMyProducts);


module.exports=router;