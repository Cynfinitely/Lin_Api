"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.deleteProduct = exports.addProduct = exports.findProductById = exports.getProducts = void 0;
const productSchema_1 = __importDefault(require("../models/productSchema"));
const getProducts = function (req, res) {
    productSchema_1.default.find(function (err, allproducts) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(allproducts);
        }
    });
};
exports.getProducts = getProducts;
const findProductById = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        console.log(id);
        const product = yield productSchema_1.default.findById(id);
        console.log(product);
        res.json(product);
    });
};
exports.findProductById = findProductById;
const addProduct = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const proName = req.body.name;
            console.log('here is proName', proName);
            const exists = yield productSchema_1.default.findOne({ name: proName });
            console.log('there is exists', exists);
            if (exists) {
                return res.json({ error: 'Product already exists' });
            }
            console.log('REQ BODY:', req.body);
            const newProduct = yield productSchema_1.default.create(req.body);
            console.log('newproduct->', newProduct);
            return res.json(newProduct);
        }
        catch (error) {
            return res.status(400).json(error);
        }
    });
};
exports.addProduct = addProduct;
const deleteProduct = function (req, res) {
    productSchema_1.default.deleteOne({ _id: req.params.id })
        .then((deletedProduct) => res.json({ product: deletedProduct }))
        .catch((err) => res.json({ message: 'something went wrong', error: err }));
};
exports.deleteProduct = deleteProduct;
const updateProduct = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            console.log(id);
            productSchema_1.default.findByIdAndUpdate(id, req.body, { new: true })
                .then((updatedProduct) => res.json({ product: updatedProduct }))
                .catch((err) => res.status(400).json(err));
        }
        catch (error) {
            ;
            ('error');
        }
    });
};
exports.updateProduct = updateProduct;
//# sourceMappingURL=product.controller.js.map