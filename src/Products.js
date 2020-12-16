import React, { Component } from "react";
import Filters from "./Filters";
import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";

let PRODUCTS = [];

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: "",
            products: PRODUCTS,
            currProduct: null,
        };
        this.handleFilter = this.handleFilter.bind(this);
        this.handleDestroy = this.handleDestroy.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

  componentDidMount() {
      this.getProducts();
  }

  getProducts() {
    fetch("http://localhost:3001/products/get")
    .then((res) => res.json())
    .then((res) => {
        if (res.success === 0) return alert(res.message);
        this.setState({ products: res.data });
    });
  }

  handleFilter(filterInput) {
      this.setState(filterInput);
  }

  handleSave(product) {
      fetch("http://localhost:3001/products/create", {
          body: JSON.stringify(product),
          method: "POST",
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.success === 0) return alert(res.message);
            this.getProducts();
        })
        .catch((err) => console.error(err));
}

  handleDestroy(productId) {
      fetch("http://localhost:3001/products/delete/" + productId)
      .then((res) => res.json())
      .then((res) => {
          if (res.success === 0) return alert(res.message);
          this.getProducts();
        });
  }

  handleEdit(product) {
      fetch("http://localhost:3001/products/update/" + product.product.productid, {
          body: JSON.stringify(product),
          method: "POST",
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.success === 0) return alert(res.message);
            this.getProducts();
        })
        .catch((err) => console.error(err));
  }

  render() {
    return (
      <div>
        <h1>My Inventory</h1>
        <Filters onFilter={this.handleFilter}></Filters>
        <ProductTable
          products={this.state.products}
          filterText={this.state.filterText}
          onDestroy={this.handleDestroy}
          onEdit={this.handleEdit}
        ></ProductTable>
        <ProductForm
          key={JSON.stringify(this.state.currProduct)}
          onSave={this.handleSave}
          product={this.state.currProduct}
        ></ProductForm>
      </div>
    );
  }
}

export default Products;
