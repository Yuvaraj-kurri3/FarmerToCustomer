const mongoose = require("mongoose");

const product=new mongoose.Schema({
 farmerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  Pname: { type: String, required: true },
  Pdescription: { type: String },
  Pprice: { type: Number, required: true },
  Pquantity: { type: Number, required: true },
  Pcategory: { type: String },
  PimageUrl: { type: String },
  PcreatedAt: { type: Date, default: Date.now },
});
module.exports=mongoose.model("Product",product);