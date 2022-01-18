import React from 'react';


function TodoForm(props) {
	
	const Form=
	<form autoComplete="off" onSubmit={props.submit}>
		<h2> Add task</h2>
	<input type="text" value={props.taskInput} onChange={props.inputHandler}/>
		<br />
		<input type="Submit" />
		<button onClick={props.taskRemover.bind(this)}> Remove <br/>completed</button>
	</form>
	
	return (
<div className="form">
{Form}
</div>
);
}
	




export default TodoForm