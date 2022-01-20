import React from 'react';

function Todoinner(props) {
	
//Maps data from the received array prop to list elements which are then inputed into a list below and then displayed in Todo.js
const todoList = props.todoData.map(listing => 
		<li style={{textDecoration:listing.completed ? "line-through":"none"}}onClick={props.clickHandler}id={listing.id}key={listing.id}> {listing.content}</li>
	)

	return (
		<ul>
		{todoList}
		</ul>
	  );
}
export default Todoinner;