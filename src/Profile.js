import React, { Component } from 'react';
import './Profile.css'
import request from 'superagent';


class Profile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: this.props.userId,
      name: '',
      username: '',
      email: '',
      palette_name: '',
      palette_id: this.props.paletteId,
      colors: [],
      looks: []
		}
	}
	componentDidMount() {
		const id = this.state.id;
		console.log(id);
		request
			.get("http://localhost:9292/users/" + id)
			.end((err, res) => {
				if (err) console.log(err);
					// console.log(res)
				const parsedResponse = JSON.parse(res.text);
				console.log(parsedResponse)
				this.setState({
					name: parsedResponse.name,
					username: parsedResponse.username,
					email: parsedResponse.email,
					palette_name: parsedResponse.palette_name,
					colors: parsedResponse.colors,
					looks: parsedResponse.looks
				})
			})
	}

    render() {
    	console.log(this.state.looks)
    	const looks = this.state.looks
    	const lookList = this.state.looks.map((look, i) => {
    		// const theLook = look[i]
    		// console.log(i)
    		// console.log(look)
    		// console.log(look[i])
    		for (let j = 0; j < look.length; j++){
    			console.log(look[j])
    			console.log(look[j].image)
    			return <img key={j} src={look[j].image} id={look[j].id}/>
    		}
    		
    	})

    	const colorList = this.state.colors.map((color, i) => {
    		return <div key={i}>
    			<h3>{color.color_name}</h3>

    		</div>
    	})

        return (        	  
            <div>
            	<h1 id="greeting">Hi, {this.state.name}</h1>
            	<h2>You are a {this.state.palette_name}</h2>
            	<div>
            		{colorList}
            		{lookList}
            	</div>
            </div>

        );
    }
}

export default Profile;