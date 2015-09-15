var Square = React.createClass({
    render :function (){
      console.log(this.props.div_width);
      var square_size = Math.floor((this.props.div_width - 1) / this.props.nb_squares);
      if (square_size > 150)
        square_size = 150;
      console.log(square_size);
      var style = {
        width:square_size,
        height:square_size
      }
      return (
      <div className="container">
        {this.props.raw.map(function (i){
          return <div className='square'
                      style={style}></div>
        })}
      </div>
      );
    }
});

var SquareDrawer = React.createClass({
  render : function (){
    var BigRows = [], i = 0;
    while (++i <= this.props.y)
    {
      var rows = [], j = 0;
      while (++j <= this.props.x)
      {
        rows.push(j);
      }
      BigRows.push(rows);
    }
    return (
      <div id="squares">
      {
        BigRows.map(function (i) {
          var size = 0, key;
          for (key in i){
            if (i.hasOwnProperty(key))
              size++;
          }
          return <Square raw={i}
                       div_width={document.getElementById("squares").offsetWidth}
                       nb_squares={size}/>;
      })}
      </div>
    );
  }
});

var SizeSelector = React.createClass({
  getInitialState: function(){
     return {
       x : 0,
       y : 0,
     }
  },
  render: function(){
    return (
      <div className='container'>
      <div className='input-group col-md-2'>
          <span className="input-group-addon" id="basic-addon1">whidth</span>
          <input  type="number" className="form-control" placeholder="X"
                aria-describedby="basic-addon1" onChange={this.changeX}></input>
          </div>
          <div className='input-group col-md-2'>
          <span className="input-group-addon" id="basic-addon1">heigh</span>
          <input  type="number" className="form-control" placeholder="Y"
                aria-describedby="basic-addon1" onChange={this.changeY}></input>
          </div>
          <SquareDrawer x={this.state.x} y={this.state.y}/>
          </div>
    );
  },
  changeX : function(event){
    this.setState({x: event.target.value})
  },
  changeY : function(event){
    this.setState({y: event.target.value})
  }

});


React.render(<SizeSelector/>, document.getElementById('size_selector'));
