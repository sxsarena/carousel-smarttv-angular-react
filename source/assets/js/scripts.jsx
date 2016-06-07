var NavBar = React.createClass({
  generateItem: function(item){
    return <NavBarItem title={item.title} image={item.image_tv} />
  },
  render: function() {
    var items = this.props.items.map(this.generateItem);
    return (
      <ul className="movies-list">
      {items}
      </ul>
    );
  }
});

var NavBarItem = React.createClass({
  generateLink: function(){
    return <NavBarLink image={this.props.image} title={this.props.title} />;
  },
  generateContent: function(){
    var content = [this.generateLink()];
    return content;
  },
  render: function() {
    var content = this.generateContent();
    return (
      <li className="movies-item">
        {content}
      </li>
    );
  }
});

var NavBarLink = React.createClass({
  render: function() {
    return (
      <a className="movies-link">
        <img src={this.props.image} />
      </a>
    );
  }
});

var Sections = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    $.getJSON( this.props.url, function() {
      console.log( "success" );
    })
    .done(function(data) {
      this.setState({data: data.trails[0].items});
    }.bind(this))
    .fail(function(xhr, status, err) {
      console.error(this.props.url, status, err.toString());
    }.bind(this));
  },
  render: function() {
    return (
      <nav className="movies">
        <NavBar items={this.state.data} />
      </nav>
    );
  }
});

ReactDOM.render(
  <Sections url="/dist/api/home_trail.json" />,
  document.getElementById('movies')
);
