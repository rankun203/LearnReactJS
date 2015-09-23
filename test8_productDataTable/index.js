"use strict";

(function () {
  var FilterableProductTable = React.createClass({
    displayName: "FilterableProductTable",

    getInitialState: function getInitialState() {
      return { filterText: '', inStockOnly: true };
    },
    handleUserInput: function handleUserInput(newFilterText, newFilterInStockOption) {
      this.setState({ filterText: newFilterText, inStockOnly: newFilterInStockOption });
    },
    render: function render() {
      return React.createElement(
        "div",
        { className: "productTable" },
        React.createElement(SearchBar, {
          filterText: this.state.filterText,
          inStockOnly: this.state.inStockOnly,
          onUserInput: this.handleUserInput
        }),
        React.createElement(ProductTable, {
          products: this.props.products,
          filterText: this.state.filterText,
          inStockOnly: this.state.inStockOnly
        })
      );
    }
  });

  var SearchBar = React.createClass({
    displayName: "SearchBar",

    handleUserInput: function handleUserInput() {
      this.props.onUserInput(this.refs.filterTextInput.getDOMNode().value, this.refs.inStockOnlyInput.getDOMNode().checked);
    },
    render: function render() {
      return React.createElement(
        "form",
        { action: "#", className: "searchBar", onSubmit: this.handleSubmit },
        React.createElement(
          "div",
          null,
          React.createElement("input", { type: "text", placeholder: "Search",
            value: this.props.filterText,
            ref: "filterTextInput",
            onChange: this.handleUserInput })
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "label",
            null,
            React.createElement("input", { type: "checkbox",
              checked: this.props.inStockOnly,
              ref: "inStockOnlyInput",
              onChange: this.handleUserInput }),
            "Only show products in stock"
          )
        )
      );
    }
  });

  var ProductTable = React.createClass({
    displayName: "ProductTable",

    render: function render() {
      var filterText = this.props.filterText;
      var inStockOnly = this.props.inStockOnly;
      var rows = [];

      var lastCategory = null;
      this.props.products.forEach(function (product) {
        if (product.category !== lastCategory) {
          rows.push(React.createElement(ProductCategory, { category: product.category, key: product.category }));
        }
        // If the filterText exists, but product.name doesn't match
        if (filterText && filterText.length > 0 && product.name.toLowerCase().indexOf(filterText.toLowerCase()) < 0) {
          return;
        }

        // If show inStockOnly & product is out of stock
        if (inStockOnly && !product.stocked) {
          return;
        }

        rows.push(React.createElement(ProductRow, { product: product, stocked: product.stocked, key: product.name }));

        lastCategory = product.category;
      });

      return React.createElement(
        "table",
        null,
        React.createElement(
          "thead",
          null,
          React.createElement(
            "tr",
            null,
            React.createElement(
              "td",
              null,
              "Name"
            ),
            React.createElement(
              "td",
              null,
              "Price"
            )
          )
        ),
        React.createElement(
          "tbody",
          null,
          rows
        )
      );
    }
  });
  var ProductCategory = React.createClass({
    displayName: "ProductCategory",

    render: function render() {
      return React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          { colSpan: 2 },
          React.createElement(
            "strong",
            null,
            this.props.category
          )
        )
      );
    }
  });

  var ProductRow = React.createClass({
    displayName: "ProductRow",

    render: function render() {
      return React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          { style: !this.props.stocked ? { color: '#ff0000' } : null },
          this.props.product.name
        ),
        React.createElement(
          "td",
          null,
          this.props.product.price
        )
      );
    }
  });

  var products = window.products = [{ category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" }, { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" }, { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" }, { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" }, { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" }, { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }];
  React.render(React.createElement(FilterableProductTable, { products: products }), document.querySelector('#tableBox'));
})();
