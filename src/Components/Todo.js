import React from 'react';
import TodoList from './Todoinner';
import TodoForm from './TodoForm';
class Wack extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			taskInput:'',
			todoData : []
			};
		
	}
componentDidMount(){
		/*let array = JSON.parse(localStorage.getItem("todo")); //loads list from localstorage
		this.setState({todoData:array});
			somethings broke with this one lol
		*/
}
inputHandler=(event)=>{
	this.setState({taskInput: event.target.value})
}
clickHandler=(event)=>{
	let target = event.target.getAttribute('id');
	let array = [...this.state.todoData]; 
	let index = array.findIndex((term)=>term.id === target)
	if (array[index].completed===true){
		array[index].completed=false;
		this.setState({todoData:array})
		event.target.setAttribute("style", "text-decoration: none")
	}
	else{
	array[index].completed=true;
	this.setState({todoData:array})
	event.target.setAttribute("style", "text-decoration: line-through")
	}
	localStorage.todo = JSON.stringify(this.state.todoArray);//stores list in localstorage for future sessions
}
submitHandler=(event)=>{
	
	let input = this.state.taskInput;
	let array = [...this.state.todoData];
	if (input.length > 20 || input.length===0){
		alert('Listing is empty or over 20 characters long')
		
	}
	else{
			if(array.findIndex((term)=>term.id === input)===-1){
				
			array.push({id:input,content:input,completed:false})
			this.setState({todoData:array})
			this.setState({taskInput:''})
			localStorage.todo = JSON.stringify(this.state.todoArray);//stores list in localstorage for future sessions
			
			}
			else{
				alert('No duplicate listings allowed');
				
			}
	}
	event.preventDefault();
}
taskRemover=(event)=>{
	
	let array = [...this.state.todoData];
	let array2 = array.filter(bool => bool.completed === false)
	console.log(array2)
	this.setState({todoData:array2})
	localStorage.todo = JSON.stringify(this.state.todoData);//stores list in localstorage for future sessions
	event.preventDefault();
}
	render(){
		return(
		
		<div className="content2">
			<div className="DivPoggers"> 
				<h4><a href="https://youtu.be/vox4teymdGw?t=2" target="blank" className="a1"> poggers </a></h4>
			</div>
			<div className="todoRow">
				<div className="todo">
					<h2>Todo-list</h2> 
					<TodoList clickHandler={this.clickHandler}todoData={this.state.todoData}/>
					<TodoForm submit={this.submitHandler} inputHandler={this.inputHandler} taskInput={this.state.taskInput} taskRemover={this.taskRemover}/>
				</div>
			</div>
		</div>
   );
	}
}
function Todo() {
	
	return (
	
		<Wack />	
	
	)
}
export default Todo;