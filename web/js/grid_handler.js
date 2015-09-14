var Square = React.createClass({
    render :function (){
      return (
        <div className="col-md-12">
        {this.props.raw.map(function (i){
          return <div className='square'></div>
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
        console.log("plop");
        rows.push(j);
      }
      BigRows.push(rows);
    }
    return (
      <div>
      {
        BigRows.map(function (i) {
        return <Square raw={i} />;
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
