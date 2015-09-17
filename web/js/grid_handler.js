var Code = React.createClass({
  getInitialState : function (){
    return {
      code : 'static const uint8_t img[] = {\n};',
      hexDigits : ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"]
    }
  },

  hex : function(x) {
  return isNaN(x) ? "00" : this.state.hexDigits[(x - x % 16) / 16] + this.state.hexDigits[x % 16];
},

  rgb2hex : function(rgb) {

 rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
 return "#" + this.hex(rgb[1]) + this.hex(rgb[2]) + this.hex(rgb[3]);
  },

  handleClick : function (){
      var row = 0;
      var parent;
      var code = 'static const uint8_t img[] = {\n';
      while ((parent = document.getElementById('row_' + row)) != null)
        {
          var squares = parent.childNodes.length, i = 0;
          while (i < squares)
          {
            var color = this.rgb2hex(parent.childNodes[i].style.backgroundColor);
            code += color + ',';
            i++;
          }
          code += '\n';
          row++;
        }
      code +='};';
      this.setState({code : code});
  },

  render : function(){
    var type = 'button', class_name = "btn btn-default btn-lg";
    return (
      <div>
      <div className="form-group">
      <button type="button" className="btn btn-default btn-lg" onClick={this.handleClick}>
      <span className="glyphicon glyphicon glyphicon-wrench" aria-hidden="true"></span>
      Convert to array
      </button>
      </div>
      <pre><code className="C++ hljs">{this.state.code}</code></pre>
      </div>
    );
  }
})

var Square = React.createClass({
  getInitialState : function(){
    return {
      backcolor : '#000000'
    };
  },
  handleClick : function(){
    this.setState({backcolor : document.getElementById('colorpicker').value});

  },
    render : function(){
      var style = {
        width:this.props.square_size,
        height:this.props.square_size,
        background:this.state.backcolor
      }
      var id = "square_" + this.props.id;
      return (
        <div className='square' style={style}
            onClick={this.handleClick} id={id}></div>
      );
    }
})

var SquareRow = React.createClass({
  getComponent: function(index) {
    $(this.getDOMNode()).find('div:nth-child(' + index + ')').css({
      'background-color': '#AE42F0'
    });
  },

  render : function (){
    var square_size = Math.floor((this.props.div_width - 1) / this.props.nb_squares);
    if (square_size > 70)
    square_size = 70;
    var style = {
      width:square_size,
      height:square_size
    }
    var row_id = 'row_' + this.props.id;
    var id_square = 0;
    return (
      <div className="container" id={row_id}>
      {this.props.raw.map(function(i){
        return <Square square_size={square_size} id={id_square++}/>;
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
    var id = 0;
    return (
      <div id="squares">
      {
        BigRows.map(function (i) {
          var size = 0, key;
          for (key in i){
            if (i.hasOwnProperty(key))
            size++;
          }
          return <SquareRow raw={i}
          div_width={document.getElementById("squares").offsetWidth}
          nb_squares={size} id={id++}/>;
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
        <div>
        <div className="form-group">
        <div className='input-group col-md-6'>
        <span className="input-group-addon" id="basic-addon1">whidth</span>
        <input  type="number" className="form-control" placeholder="X"
        aria-describedby="basic-addon1" onChange={this.changeX}></input>
        <span className="input-group-addon" id="basic-addon1">heigh</span>
        <input  type="number" className="form-control" placeholder="Y"
        aria-describedby="basic-addon1" onChange={this.changeY}></input>
        </div>
        </div>
        <div className="form-group">
        <SquareDrawer x={this.state.x} y={this.state.y}/>
        </div>
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
  React.render(<Code />, document.getElementById('code_viewer'));
