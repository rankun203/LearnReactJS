(function () {
  var FilterableProductTable = React.createClass({
    getInitialState: function () {
      return {filterText: '', inStockOnly: true};
    },
    handleUserInput: function (newFilterText, newFilterInStockOption) {
      this.setState({filterText: newFilterText, inStockOnly: newFilterInStockOption});
    },
    render: function () {
      return (
          <div className="productTable">
            <SearchBar
                filterText={this.state.filterText}
                inStockOnly={this.state.inStockOnly}
                onUserInput={this.handleUserInput}
                />
            <ProductTable
                products={this.props.products}
                filterText={this.state.filterText}
                inStockOnly={this.state.inStockOnly}
                />
          </div>
      );
    }
  });

  var SearchBar = React.createClass({
    handleUserInput: function () {
      this.props.onUserInput(
          this.refs.filterTextInput.getDOMNode().value,
          this.refs.inStockOnlyInput.getDOMNode().checked
      );
    },
    render: function () {
      return (
          <form action="#" className="searchBar" onSubmit={this.handleSubmit}>
            <div><input type="text" placeholder="Search"
                        value={this.props.filterText}
                        ref='filterTextInput'
                        onChange={this.handleUserInput}/>
            </div>
            <div><label><input type="checkbox"
                               checked={this.props.inStockOnly}
                               ref='inStockOnlyInput'
                               onChange={this.handleUserInput}/>
              Only show products in stock</label></div>
          </form>
      );
    }
  });

  var ProductTable = React.createClass({
    render: function () {
      var filterText = this.props.filterText;
      var inStockOnly = this.props.inStockOnly;
      var rows = [];

      var lastCategory = null;
      this.props.products.forEach(function (product) {
        if (product.category !== lastCategory) {
          rows.push(<ProductCategory category={product.category} key={product.category}/>);
        }
        // If the filterText exists, but product.name doesn't match
        if (filterText && filterText.length > 0 &&
            product.name.toLowerCase().indexOf(filterText.toLowerCase()) < 0) {
          return;
        }

        // If show inStockOnly & product is out of stock
        if (inStockOnly && !product.stocked) {
          return;
        }

        rows.push(<ProductRow product={product} stocked={product.stocked} key={product.name}/>);

        lastCategory = product.category;
      });

      return (
          <table>
            <thead>
            <tr>
              <td>Name</td>
              <td>Price</td>
            </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
      );
    }
  });
  var ProductCategory = React.createClass({
    render: function () {
      return (
          <tr>
            <td colSpan={2}><strong>{this.props.category}</strong></td>
          </tr>
      );
    }
  });

  var ProductRow = React.createClass({
    render: function () {
      return (
          <tr>
            <td style={!this.props.stocked? { color: '#ff0000' } : null}>
              {this.props.product.name}</td>
            <td>{this.props.product.price}</td>
          </tr>
      );
    }
  });


  var products = window.products = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
  ];
  React.render(<FilterableProductTable products={products}/>, document.querySelector('#tableBox'));
})();