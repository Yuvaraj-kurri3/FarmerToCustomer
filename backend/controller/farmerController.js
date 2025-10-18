import Product from "../model/farmer/Product.js";
 


// 🧩 Add new product
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, quantity, category,fid ,imageUrl} = req.body;
    // const imageUrl = req.file ? req.file.path : '';
        
    const newProduct = await Product.create({
    //   farmerId: req.user_id,
     farmerId: fid,
      Pname: name,
      Pdescription:description,
      Pprice: price,
      Pquantity:quantity,
      Pcategory: category,
      PimageUrl: imageUrl
    });
    await newProduct.save();
    res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error: error.message });
  }
};


// ✏️ Update product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    if (product.farmerId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Access denied" });

    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Product updated", product: updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
};

// ❌ Delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    if (product.farmerId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Access denied" });

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
};

// 📦 Get all products by farmer
export const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ farmerId: req.user._id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};