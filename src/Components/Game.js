import React from 'react';


	

class Gameplay extends React.Component{
	constructor(props){
		super(props);
        
		this.state = { //Variables
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
				colorarray:['#001eff','#ff0000','#ffffff','#f6ff00'],
				color :'white',
				ehp : 5,
				xpReq:30,
				ename: 'hmm',
				xpRew: 0,
				desc:'hmm',
				enemyDamaged:false,
				playerDamaged:false,
				canAttack:true,
				missmsg:['Miss','Dodged','Blocked'],
				emiss: 'hmm',
				pmiss:'hmm',
				showpmiss:false,
				showemiss:false,
				};

}
componentDidMount(){//Mostly math for some variables
	let descrng=Math.round(Math.random()*3)
	let hprng=Math.ceil(6+(this.state.level*1.5))
	this.setState({ehp: hprng})
	this.setState({xpRew: hprng})
	this.setState({xpReq: (this.state.level*10)*3})
	this.setState({ename: this.state.name[Math.round(Math.random()*3)]})
	this.setState({desc: this.state.description[descrng]})
	this.setState({color: this.state.colorarray[descrng]})
}
generateEnemy(){//"Heals" Player, does some math for variables again
		let hprng=Math.ceil(6+(this.state.level*1.5))
		let descrng=Math.round(Math.random()*3)
		this.setState({ehp: hprng})
		this.setState({xpRew: hprng})
		this.setState({ename: this.state.name[Math.round(Math.random()*3)]})
		this.setState({desc: this.state.description[descrng]})
		this.setState({color: this.state.colorarray[descrng]})
		this.setState({hp: 4+(this.state.endurance*2)})
		this.setState({canAttack:true});
}
battleEnd(){ //End of battle calculations
	this.setState({enemyDamaged:false});
	this.setState({playerDamaged:false});
	
	if ((this.state.xp+this.state.xpRew) < this.state.xpReq){//checks if xp has overflown past requirement and generates another enemy
		this.setState(prevstate =>({xp: prevstate.xp+this.state.xpRew}))
		this.generateEnemy()
	}
	else {//opens store on levelup and does some math for variables once more
		this.setState(prevstate =>({xp: (prevstate.xp+this.state.xpRew) -this.state.xpReq}))
		this.setState(prevstate =>({level: prevstate.level +1}))
		this.setState(prevstate =>({skillpoints: prevstate.skillpoints +1}))
		this.setState({xpReq: (this.state.level*10)*3})
		this.setState({display: 'store'})
		
		
	}
	
}
enemyAttack(){//attack function to perform an attack towards the player
		this.setState({enemyDamaged:false});
		if (Math.round((Math.random()*100)<=(this.state.accuracy*100))){//checks if attack hits
			this.setState({playerDamaged:true});//changes bool to true, results in animation being played
				const ehit = Math.round(Math.random()*(3+this.state.level));//dmg done on attack hit
				if ((this.state.hp-ehit)<=0){//if hp below 0 render 0 instead of rendering a negative number
					this.setState({hp:0});
					setTimeout(() =>{//timeout to wait for the animation to finish
					this.setState({display:'loss'});
					},1500);
					
				}
				else{//else render new value based on math, probs shouldve used prevstate but works anyway for now
					this.setState({hp : this.state.hp - ehit});
					setTimeout(() =>{//timeout to wait for the animation to finish
					this.setState({playerDamaged:false});
					this.setState({canAttack:true});
					},1500);
				}
			}
			else{
				this.setState({emiss: this.state.missmsg[Math.round(Math.random()*2)]});
				this.setState({showemiss: true});
			setTimeout(() =>{//timeout to wait for the animation to finish
					this.setState({showemiss: false});
					this.setState({playerDamaged:false});
					this.setState({canAttack:true});
					
					},750);
			}
}

Attack(){//attack function to perform an attack against the enemy
			this.setState({canAttack: false});
			if (Math.round((Math.random()*100)<=(this.state.accuracy*100))){//checks if attack hits
			
				this.setState({enemyDamaged:true});//changes bool and plays animation as result
				
				if ((this.state.ehp-this.state.strength)<=0){//if ehp below 0, render 0 instead of rendering a negative number
					this.setState({ehp:0});
					setTimeout(() =>{//timeout to wait for the animation to finish
					this.battleEnd();
					},1500);
					
				}
				else{
					this.setState({ehp : this.state.ehp - this.state.strength});//else render new value based on math
					setTimeout(() =>{//timeout to wait for the animation to finish
					this.enemyAttack();
					},1500);
				}
			}
			else{
				this.setState({pmiss: this.state.missmsg[Math.round(Math.random()*2)]})
				this.setState({showpmiss: true})
			setTimeout(() =>{//timeout to wait for the animation to finish
					this.setState({showpmiss: false})
					this.enemyAttack();
					},750);
			}
	}
StrUp(){//function to expend 1 skillpoint for 1 strength point
	if (this.state.skillpoints>0)
	{
		this.setState(prevstate =>({skillpoints: (prevstate.skillpoints-1)}))
		this.setState(prevstate =>({strength: prevstate.strength +1}))
	}
}
EndUp(){//function to expend 1 skillpoint for 1 endurance point
	if (this.state.skillpoints>0)
	{
		this.setState(prevstate =>({skillpoints: (prevstate.skillpoints-1)}))
		this.setState(prevstate =>({endurance: prevstate.endurance +1}))
	}
}
ExitStore(){//switches display back to game
	this.setState({display: 'game'})
	this.generateEnemy();
}

Play(){//switches display to game
	this.setState({display: 'game'})
}
Restart() {//resets the game
		
				this.setState({display:'game'});
				this.setState({level:1});
				this.setState({strength:3});
				this.setState({endurance:3});
				this.setState({skillpoints:0});
				this.setState({xp:0});
				this.setState({hp:10});
				this.setState({xpReq:30});
				this.setState({playerDamaged:false});
				this.generateEnemy();
}
	render(){
	
	
	
	

			switch(this.state.display){
				case 'menu': //displayed content when display=menu
					return(<div className="storeTitle">
						<p className="gameh"> GAME TO TAKE UP SPACE</p>
						<button className="playbutton" onClick={this.Play.bind(this)}>PLAY</button>
					</div>
					);
					
			
				case 'game'://displayed content when display=game
					return(<div className="gameplayContainer"> 
					<div className="divleft">{/*divleft displays playerinfo*/}
						<p className="gamep">
							Player LVL {this.state.level}<br/>
							HP: {this.state.hp} <br/>
							XP: {this.state.xp}/{this.state.xpReq}
						</p>
					{this.state.playerDamaged ?<p className="playerDMG"> &#9744;</p>:<p className="player"> &#9744;</p>}
					{this.state.showemiss ?<p className="gamepa">{this.state.emiss}</p>:null}
					{this.state.canAttack ?<button className="attackbutton" onClick={this.Attack.bind(this)}> Attack </button>:null}
					</div>
			
					<div className="divright">{/*divright display enemy info*/}
						<p className="gamep" style={{marginBottom : 0}}>
						{this.state.ename} <br/>
						HP: {this.state.ehp} 
					</p>
					<p className="gamed" style={{color: this.state.color, textShadowColor: this.state.color}}> {this.state.desc} </p>
					
					{this.state.enemyDamaged ?<p className="enemyDMG"> &#9744;</p>:<p className="enemy"> &#9744;</p>}
					{this.state.showpmiss ?<p className="gamepa">{this.state.pmiss}</p>:null}
			
					</div>
					</div>
					);
					
					
				case 'store'://displayed content when display=store
					return(
					
					<div className="storeContainer"> 
						<div className="storeTitle">
							<p className="gamep">UPGRADES <br/>AVAILABLE SKILLPOINTS: {this.state.skillpoints}</p>{/*displays spendable skillpoints*/}
						</div>
						<div className="storeContent">
							<div className="storebox">
								<p className="storep">STRENGTH</p>
								<p className="storep">{this.state.strength}</p>
								<button className="storebutton" onClick={this.StrUp.bind(this)}> UPGRADE </button>{/*button to buy a strength upgrade*/}
							</div>
							<div className="storebox">
								<p className="storep">ENDURANCE</p>
								<p className="storep">{this.state.endurance}</p>
								<button className="storebutton" onClick={this.EndUp.bind(this)}> UPGRADE </button>{/*button to buy an endurance upgrade*/}
							</div>
						</div>
						<div className="storeBottom"> 
							<button className="storebutton" onClick={this.ExitStore.bind(this)}> EXIT SHOP </button>{/*switches display back to game*/}
						</div>
					</div>
					);
					
					case 'loss': //displayed content when display=loss
					return(<div className="storeTitle">
						<p className="gameh"> You died at Level {this.state.level}</p>
						<p className="gamep">Restart?</p>
						<button className="playbutton" onClick={this.Restart.bind(this)}>RESTART</button>
					</div>
					);
					
					default:
					return(
					alert('something broke, L')
					);
					
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