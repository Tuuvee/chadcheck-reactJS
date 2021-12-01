import React from 'react';
import ReactDOM from 'react-dom';
let diceroll = Math.round(Math.random()*3);
	

class Gameplay extends React.Component{
	constructor(props){
		super(props);
        
		this.state = {
				level:1,
				accuracy:0.85,
				strength:3,
				endurance:3,
				skillpoints:0,
				xp:0,
				hp:10,
				name:['Bandit', 'Orc', 'Undead', 'Wolf'],
				damageModifier : [1.0, 1.2, 0.8, 2],
				ehp : 5,
				xpReq:30,
				ename: 'hmm',
				};

}
componentDidMount(){
	
 this.setState({ehp: Math.ceil(6+(this.state.level*1.5))})
 this.setState({xpReq: (this.state.level*10)*3})
 this.setState({ename: this.state.name[Math.round(Math.random()*3)]})
}
Attack(){
			if (Math.round((Math.random()*100)<=(this.state.accuracy*100))){
				console.log('hit');
				this.setState({ehp : this.state.ehp - this.state.strength});
				if (this.state.ehp<0){
					this.state.ehp=0;
				}
			}
	}

	render(){
		return( 
		
		<div className="gameplayContainer"> 
			<div className="divleft">
			<p className="gamep">Player <br/>
			HP: {this.state.hp} <br/>
			XP: {this.state.xp}/{this.state.xpReq}
			</p>
			<p className="player"> &#9744; </p>
			<button className="attackbutton" onClick={this.Attack.bind(this)}> Attack </button>
			</div>
			
			<div className="divright">
			<p className="gamep">{this.state.ename} <br/>
			HP: {this.state.ehp} <br/>
			DMG Modifier: {this.state.dmgmod}
			</p>
			<p className="enemy"> &#9744; </p>
			
			</div>
			
		</div>
		);
	}
	
}



	




function Game() {
	return (
	
    <div className="gameWindow">
		<Gameplay />
	</div>
	);
	
}

export default Game;