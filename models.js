const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Common Address Schema
const AddressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true },
});

// User Schema
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "manager", "customer"],
    required: true,
  },
  address: AddressSchema,
  phoneNumber: { type: String },
});

const User = mongoose.model("User", UserSchema);

// Outlet Schema
const OutletSchema = new Schema({
  name: { type: String, required: true },
  address: AddressSchema,
  phoneNumber: { type: String },
  image: { type: String, required: true },
});

const Outlet = mongoose.model("Outlet", OutletSchema);

// Category Schema
const CategorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
});

const Category = mongoose.model("Category", CategorySchema);

// Food Item Schema
const FoodItemSchema = new Schema({
  name: { type: String, required: true },
  images: { type: Array, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  isAvailable: { type: Boolean, default: true },
});

const FoodItem = mongoose.model("FoodItem", FoodItemSchema);

// Order Schema
const OrderSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      foodItem: { type: Schema.Types.ObjectId, ref: "FoodItem" },
      quantity: { type: Number, required: true },
    },
  ],
  outlet: { type: Schema.Types.ObjectId, ref: "Outlet", required: true },
  orderStatus: {
    type: String,
    enum: ["pending", "preparing", "ready", "on_the_way", "delivered"],
    default: "pending",
  },
  orderType: {
    type: String,
    default: true,
    enum: ["online", "online_pickup_outlet", "order_eat", "order_pickup"],
  },
  address: AddressSchema, // only required for online orders
  totalPrice: { type: Number, required: true },
  tokenNumber: String, // only for offline orders
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  orderDate: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", OrderSchema);

// Inventory Schema
const InventorySchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["hardware", "raw_material"], required: true },
  quantity: { type: Number, required: true },
  unit: {
    type: String,
    enum: ["kg", "liter", "piece", "box", "packet"],
    required: true,
  },
  outlet: { type: Schema.Types.ObjectId, ref: "Outlet", required: true },
  lastUpdated: { type: Date, default: Date.now },
  damaged: { type: Boolean, default: false },
  damagedDetails: String,
  needToBuy: { type: Boolean, default: false },
  repairingRequired: { type: Boolean, default: false },
  repairingDetails: String,
  expenses: [
    {
      description: { type: String },
      amount: Number,
      date: { type: Date, default: Date.now },
    },
  ],
});

const Inventory = mongoose.model("Inventory", InventorySchema);

module.exports = {
  User,
  Outlet,
  Category,
  FoodItem,
  Order,
  Inventory,
};
