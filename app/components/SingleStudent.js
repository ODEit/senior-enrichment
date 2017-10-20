import React, { Component } from 'react'
import axios from 'axios';
import {NavLink} from 'react-router-dom'

export default class Campus extends Component {
    constructor() {
        super()
        this.state = {
            Student: {},
            changer: false,
            name: '',
            email: '',
            campusId: '',
            Campuses: []
        }
        this.handleName = this.handleName.bind(this)
        this.handleChanger = this.handleChanger.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleEmail = this.handleEmail.bind(this)
        this.handleCampusId = this.handleCampusId.bind(this)
    }

    componentDidMount() {
        let studentid = this.props.match.params.studentid.slice(1)
        console.log(studentid)
        axios.get(`/api/student/${studentid}`)
            .then(res => res.data)
            .then(Student => this.setState({ Student }))
            .then(axios.get('/api/campus')
                .then(res => res.data)
                .then(Campuses => this.setState( { Campuses })))
    }

    // {this.state.Student&& this.state.Student.students.sort((a,b) => a.id-b.id).map((student) => {
    // return(

    // )})}
    handleName(event) {
        let name = event.target.value
        this.setState({ name })
        console.log(this.state)
    }

    handleChanger() {
        this.setState({ changer: !this.state.changer })
    }

    handleEmail(event) {
        let email = event.target.value
        this.setState({ email })
        console.log(this.state)
    }

    handleCampusId(event){
        let campusId = event.target.value
        this.setState({campusId})
        }    

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.Student)
        var updater = {
            name: this.state.name || this.state.Student.name,
            email: this.state.email || this.state.Student.email,
            campusId: this.state.campusId || this.state.Student.campusId
        }
        var Student = Object.assign({},this.state.Student, updater)
        this.setState({Student})
            axios.put(`/api/student/${this.state.Student.id}`, updater)
            .then(console.log('finished'))
            .then(() => this.handleChanger())
            .then(() => this.props.history.push('/'))
            .then(()=> this.props.history.push(`/student/:${this.state.Student.id}`))
    }

    // this.props.history.push('/students')

    render() {
        this.state.Student.campus && console.log(this.state.Campuses)
        const student = this.state.Student
        return (
            <div className ='Creator'>
                {student.campus && <h2>{student.campus.name}</h2>}
                {student.campus && <div><img src={student.campus.image} /></div>}
                <table className = 'Student_table'>
                    <tr>
                        <th>Id#</th>
                        <th>Name</th>
                        <th>Campus</th>
                        <th>Link</th>
                    </tr>
                    <tr>
                        <td>{student.id}</td>
                        <td>{student.name}</td>
                        {student.campus && <td>{student.campus.name}</td>}
                        {student.campus && <td> <NavLink to={`/campus/:${student.campus.id} `}><img className="Uni" src="http://downloadicons.net/sites/default/files/university-of-small-icons-58871.png " /></NavLink></td>}
                    </tr>
                </table>
                <button className="Delete" onClick={this.handleChanger} >Update</button>
                {this.state.changer && (
                    <form className="Creator Student_table" onSubmit={this.handleSubmit}>
                        <h2>Update Student</h2>
                        <label>name </label><input type='text' name="name" onChange={this.handleName}></input>
                        <label>Email </label><input type='email' name="email" onChange={this.handleEmail}></input>
                        <select onChange={this.handleCampusId} >
                            <option value="">Select a campus</option>
                            {
                                this.state.Campuses.length && 
                                this.state.Campuses.map(campus => {
                                    return <option value={campus.id} key={campus.id}>{campus.name}</option>
                                })}
                        </select>
                        <button type='submit'>submit</button>
                    </form>
                )}
            </div>
        )
    }
}