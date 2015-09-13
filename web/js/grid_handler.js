var Square = React.createClass({
    render :function (){
      return (
        <div className='square'></div>
      );
    }
});

var SquareDrawer = React.createClass({
  render : function (){
    var rows = [], i = 0
    while (++i <= this.props.x)
    {
      console.log("plop");
      rows.push(i);
    }
    return (
      <div>
      {
        rows.map(function (i) {
        return <Square/>;
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
