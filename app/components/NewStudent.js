import React, {Component} from 'react';
import axios from 'axios';

export default class NewStudent extends Component{
    constructor(){
        super()
        this.state = {
            name: '',
            email: '',
            Campuses: [],
            campusId: ''
        }

        this.handleEmail = this.handleEmail.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCampusId = this.handleCampusId.bind(this)
    }

    componentDidMount(){
    axios.get('/api/campus')
    .then(res => res.data)
    .then(Campuses => this.setState({Campuses: Campuses}))
    }

    handleSubmit(event){
    event.preventDefault();
    axios.post('/api/student', this.state)
    .then(console.log('finished'));
    }

    handleEmail(event){
    let email = event.target.value
    this.setState({email})
    console.log(this.state)
    }

    handleName(event){
    let name = event.target.value
    this.setState({name})
    console.log(this.state)
    }

    handleCampusId(event){
    let campusId = event.target.value
    this.setState({campusId})
    }
   
    render(){
        console.log(this.state)
        return(
            <form className = "Campus_Student_table " onSubmit = {this.handleSubmit}>
                <h2>Create Student</h2>
              <label>name </label><input type = 'text' name = "name" onChange = {this.handleName}></input>
              <label>Email </label><input type = 'email' name = "email" onChange = {this.handleEmail}></input>
                <select onChange = {this.handleCampusId} >
                <option value = "">Select a campus</option>
                {
                    this.state.Campuses && this.state.Campuses.map(campus => {
                      return  <option value = {campus.id} key = {campus.id}>{campus.name}</option>
                })}
                </select>
              <button type = 'submit'>submit</button>
            </form>
        )
    }
}