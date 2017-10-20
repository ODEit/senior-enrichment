import React, {Component} from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom'

export default class NewCampus extends Component{
    constructor(){
        super()
        this.state = {
            name: '',
            image: ''
        }

        this.handleImage = this.handleImage.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
        // this.handleCampusId = this.handleCampusId.bind(this)
    }

    componentDidMount(){
    axios.get('/api/campus')
    .then(res => res.data)
    .then(Campuses => this.setState({Campuses: Campuses}))
    }

    handleSubmit(event){
    event.preventDefault();
    axios.post('/api/campus', this.state)
    .then(res => res.data)
    .then(campus => this.props.history.push(`/campus/:${campus.id}`))
    }

    handleImage(event){
    let image = event.target.value
    this.setState({image})
    console.log(this.state)
    }

    handleName(event){
    let name = event.target.value
    this.setState({name})
    console.log(this.state)
    }

   
   
    render(){
        console.log(this.state)
        return(
            <form onSubmit = {this.handleSubmit} className = 'Creator' >
                <h2>Create Campus</h2>
              <label>name </label><input type = 'text' name = "name" onChange = {this.handleName}></input>
              <label>imageUrl </label><input type = 'url' name = "image" onChange = {this.handleImage}></input>
              <button type = 'submit'>submit</button>
              <NavLink to = '/campuses' >Back to Home Page link</NavLink>
            </form>
        )
    }
}

// handleCampusId(event){
//     let campusId = event.target.value
//     this.setState({campusId})
//     }
// <select onChange = {this.handleCampusId} >
// <option value = "">Select a campus</option>
// {
//     this.state.Campuses && this.state.Campuses.map(campus => {
//       return  <option value = {campus.id} key = {campus.id}>{campus.name}</option>
// })}
// </select>