import React from 'react';
import ReactDOM from 'react-dom';

	

class Gameplay extends React.Component{
	constructor(props){
		super(props);
        
		this.state = {
				display:'menu',
				level:1,
				accuracy:0.85,
				strength:3,
				endurance:3,
				skillpoints:0,
				xp:0,
				hp:10,
				name:['Bandit', 'Orc', 'Undead', 'Wolf'],
				description:['Cringe', 'Angry', 'Tired', 'Hamborgor'],
				ehp : 5,
				xpReq:30,
				ename: 'hmm',
				xpRew: 0,
				desc:'hmm',
				};

}
componentDidMount(){
	let hprng=Math.ceil(6+(this.state.level*1.5))
 this.setState({ehp: hprng})
 this.setState({xpRew: hprng})
 this.setState({xpReq: (this.state.level*10)*3})
 this.setState({ename: this.state.name[Math.round(Math.random()*3)]})
 this.setState({desc: this.state.description[Math.round(Math.random()*3)]})
}
generateEnemy(){
		let hprng=Math.ceil(6+(this.state.level*1.5))
		this.setState({ehp: hprng})
		this.setState({xpRew: hprng})
		this.setState({ename: this.state.name[Math.round(Math.random()*3)]})
		this.setState({desc: this.state.description[Math.round(Math.random()*3)]})
		this.setState({hp: 4+(this.state.endurance*2)})
		
}
battleEnd(){
	
	if ((this.state.xp+this.state.xpRew) < this.state.xpReq){
		this.setState(prevstate =>({xp: prevstate.xp+this.state.xpRew}))
		this.generateEnemy()
	}
	else {
		this.setState(prevstate =>({xp: (prevstate.xp+this.state.xpRew) -this.state.xpReq}))
		this.setState(prevstate =>({level: prevstate.level +1}))
		this.setState(prevstate =>({skillpoints: prevstate.skillpoints +1}))
		this.setState({xpReq: (this.state.level*10)*3})
		this.setState({display: 'store'})
		
		
	}
	
}
enemyAttack(){
		if (Math.round((Math.random()*100)<=(this.state.accuracy*100))){
			
				const ehit = Math.round(Math.random()*(3+this.state.level));
				if ((this.state.hp-ehit)<=0){
					this.setState({hp:0});
					
				}
				else{
					this.setState({hp : this.state.hp - ehit});
				}
				
			}
	
}
Attack(){
			if (Math.round((Math.random()*100)<=(this.state.accuracy*100))){

				
				if ((this.state.ehp-this.state.strength)<=0){
					this.setState({ehp:0});
					this.battleEnd();
					
				}
				else{
					this.setState({ehp : this.state.ehp - this.state.strength});
					this.enemyAttack();
				}
				
			}
	}
StrUp(){
	if (this.state.skillpoints>0)
	{
		this.setState(prevstate =>({skillpoints: (prevstate.skillpoints-1)}))
		this.setState(prevstate =>({strength: prevstate.strength +1}))
	}
}
EndUp(){
	if (this.state.skillpoints>0)
	{
		this.setState(prevstate =>({skillpoints: (prevstate.skillpoints-1)}))
		this.setState(prevstate =>({endurance: prevstate.endurance +1}))
	}
}
ExitStore(){
	this.setState({display: 'game'})
	this.generateEnemy();
}
Play(){
	this.setState({display: 'game'})
}
	render(){
			
			switch(this.state.display){
				case 'menu':
					return(<div className="storeTitle">
						<p className="gameh"> GAME TO TAKE UP SPACE</p>
						<button className="playbutton" onClick={this.Play.bind(this)}>PLAY</button>
					</div>
					);
					break;
			
				case 'game':
					return(<div className="gameplayContainer"> 
					<div className="divleft">
						<p className="gamep">
							Player LVL {this.state.level}<br/>
							HP: {this.state.hp} <br/>
							XP: {this.state.xp}/{this.state.xpReq}
						</p>
						<p className="player"> &#9744; </p>
						<button className="attackbutton" onClick={this.Attack.bind(this)}> Attack </button>
					</div>
			
					<div className="divright">
						<p className="gamep">
						{this.state.ename} <br/>
						HP: {this.state.ehp} <br/>
						{this.state.desc}
					</p>
					<p className="enemy"> &#9744; </p>
					</div>
					</div>
					);
					break;
					
				case 'store':
					return(
					
					<div className="storeContainer"> 
						<div className="storeTitle">
							<p className="gamep">UPGRADES <br/>AVAILABLE SKILLPOINTS: {this.state.skillpoints}</p>
						</div>
						<div className="storeContent">
							<div className="storebox">
								<p className="gamep">STRENGTH<br/>{this.state.strength}</p>
								<button className="storebutton" onClick={this.StrUp.bind(this)}> UPGRADE </button>
							</div>
							<div className="storebox">
								<p className="gamep">ENDURANCE<br/>{this.state.endurance}</p>
								<button className="storebutton" onClick={this.EndUp.bind(this)}> UPGRADE </button>
							</div>
						</div>
						<div className="storeTitle"> 
						<button className="storebutton" onClick={this.ExitStore.bind(this)}> EXIT SHOP </button>
						</div>
					</div>
					);
					break;
		}
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