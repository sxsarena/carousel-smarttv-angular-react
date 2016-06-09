var CarouselList = React.createClass({
  render: function() {
    return (
      <li className="item">
        <img className="image" src={this.props.image} height={200} />
      </li>
    );
  }
});

var CarouselsItem = React.createClass({
  generateItem: function(item){
    return <CarouselList title={item.title} image={item.image_tv} />
  },
  render: function() {
    var list = this.props.list.map(this.generateItem);
    return (
      <div className="row">
        <h3 className="category">{this.props.title}</h3>
        <ul className="list">
        {list}
        </ul>
      </div>
    );
  }
});

var Row = React.createClass({
  generateItem: function(item){
    return <CarouselsItem title={item.title} list={item.items} />
  },
  render: function() {
    var items = this.props.items.map(this.generateItem);
    return (
      <div>
      {items}
      </div>
    );
  }
});

var Request = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    $.getJSON( this.props.url, function() {
    })
    .done(function(data) {
      this.setState({data: data.trails});
    }.bind(this))
    .fail(function(xhr, status, err) {
      console.error(this.props.url, status, err.toString());
    }.bind(this));
  },
  render: function() {
    return (
      <Row items={this.state.data} />
    );
  }
});

ReactDOM.render(
  <Request url="/dist/api/home_trail.json" />,
  document.getElementById('movies')
);
