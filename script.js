var st={margin:20};

var Box=React.createClass({
	getInitialState:function()
	{
		return ({val:[]});
	},
	up:function(pr)
	{
		this.state.val.push(pr);
		this.setState({val:this.state.val});
	},
	dl:function(idx)
	{
		this.state.val.splice(idx,1);
		this.setState({val:this.state.val});
	},
	render:function(){
		return (
			<div style={st}>
			<Task />
			<List dat ={this.state.val}/>
			</div>
			);
	}
});
var Task=React.createClass({
	getname:function(e)
	{
		this.setState({name:e.target.value});
	},
	getask:function(e)
	{
		this.setState({info:e.target.value});
	},
	addtask:function(e)
	{
		if(this.state.name!=''&&this.state.info!='')
		{
			mounted_box.up({k:this.state.name,v:this.state.info});
			this.setState({name:'',info:''});       
		}
		e.preventDefault();
	},
	componentDidMount:function()
	{
       ReactDOM.findDOMNode(this.refs.taskname).focus();
	},
	getInitialState:function()
	{
		return {name:'', info:''};
	},
	render:function(){
		return (
			<div className="form-inline row">
			<input type="text" className="form-control" ref="taskname" placeholder="Task Name" style={st} value={this.state.name} onChange={this.getname}/>
			<input type="text" className="form-control" id="taskinfo" placeholder="Description" style={st} value={this.state.info} onChange={this.getask}  />    
			<button type="submit" onClick={this.addtask} id="btn" className="btn btn-success" style={st}><span className="glyphicon glyphicon-plus" aria-hidden="true"></span>Add Task</button>    
			</div>
			);
	}
});
var List=React.createClass({ 
	opt:function(val)
	{
		mounted_box.dl(val);
	},
	deltask:function(val)
	{
		mounted_box.dl(val);
	},
	render:function(){
		var _this = this;
		var nam='';
		if(this.props.dat.length>0)
        {
		 var temp=this.props.dat.map(function(user, i){
			return (
				<tr key={i} >
				<td>{user.k}</td><td>{user.v}</td>
				<td><button className="btn btn-sm btn-warning" value={i} onClick={_this.opt.bind(_this,{i})}><span className="glyphicon glyphicon-minus" aria-hidden="true"></span> Done</button></td>
				</tr>
				);
		 });
		 nam=(
			<table className="table stripes table-hover">
			<thead>
			<tr>
			<th className="text-center"><h4>Task</h4></th>
			<th className="text-center"><h4>Description</h4></th>
			<th className="text-center"><h4>Status</h4></th>
			</tr>
			</thead>
			<tbody>
            {temp}
			</tbody>
			</table>
			);
		}
		else
		{
			nam=(
			<div className="jumbotron">
			<h1>No tasks to be done <span className="glyphicon glyphicon-ok"></span></h1>
			</div>);
		}
		return (
		<div>
		{nam}
		</div>
		);
	}
});
var mounted_box = ReactDOM.render(<Box />,document.getElementById('container'));