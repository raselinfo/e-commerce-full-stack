const mongoose = require("mongoose");
const data = {
  products: [
    {
      name: "Nike Slim shirt",
      slug: "nike-slim-shirt",
      price: 50,
      description: "high quality shirt",
      image:
        "https://res.cloudinary.com/dg2k9rn0q/image/upload/v1658327169/p1_nqgm7m.jpg",
      category: "Category ID",
      stock: 20,
      brand: "Nike",
      reviews: "review Id",
      _id: mongoose.Types.ObjectId("62dac4f2cb81ebf743aa77f0"),
    },
    {
      name: "Adidas Fit Shirt",
      slug: "adidas-fit-shir",
      price: 250,
      description: "high quality product",
      image:
        "https://res.cloudinary.com/dg2k9rn0q/image/upload/v1658327164/p2_oblug5.jpg",
      category: "Category ID",
      stock: 0,
      brand: "Adidas",
      reviews: "review Id",
      _id: mongoose.Types.ObjectId("62dac4f2cb81ebf743aa77f1"),
    },
    {
      name: "Nike Slim Pant",
      slug: "nike-slim-pant",
      price: 25,
      description: "high quality product",
      image:
        "https://res.cloudinary.com/dg2k9rn0q/image/upload/v1658327166/p4_cr5gw8.jpg",
      category: "",
      stock: 15,
      brand: "Adidas",
      reviews: "review Id",
      _id: mongoose.Types.ObjectId("62dac4f2cb81ebf743aa77f2"),
    },
    {
      name: "Puma Fit Pant",
      slug: "puma-fit-pant",
      price: 65,
      description: "high quality product",
      image:
        "https://res.cloudinary.com/dg2k9rn0q/image/upload/v1658327165/p3_iuf1q4.jpg",
      category: "Category ID",
      stock: 5,
      brand: "Puma",
      reviews: "review Id",
      _id: mongoose.Types.ObjectId("62dac4f2cb81ebf743aa77f3"),
    },
  ],
  category: [
    {
      name: "Shirts",
    },
    {
      name: "Pants",
    },
  ],
  reviews: [
    {
      rating: 4.5,
      text: "Good Product",
      product: mongoose.Types.ObjectId("62dac4f2cb81ebf743aa77f0"),
    },
    {
      rating: 4.5,
      text: "Good Product",
      product: mongoose.Types.ObjectId("62dac4f2cb81ebf743aa77f0"),
    },
    {
      rating: 3.5,
      text: "Good Product",
      product: mongoose.Types.ObjectId("62dac4f2cb81ebf743aa77f1"),
    },
    {
      rating: 3.0,
      text: "Not Bad Product",
      product: mongoose.Types.ObjectId("62dac4f2cb81ebf743aa77f2"),
    },
    {
      rating: 2.5,
      text: "Bad Product",
      product: mongoose.Types.ObjectId("62dac4f2cb81ebf743aa77f3"),
    },
  ],
};

module.exports = data;
