import React, { Component } from 'react'
import axios from 'axios';

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
                .then(Campuses => this.setState({ Campuses: Campuses })))
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
        console.log(this.state.Student.id)
        var updater = {
            name: this.state.name || this.state.Student.name,
            email: this.state.email || this.state.Student.email,
            campusId: this.state.campusId || this.state.Student.campusId
        }
        axios.put(`/api/student/${this.state.Student.id}`, updater)
            .then(console.log('finished'))
            .then(() => this.handleChanger())
    }



    render() {
        this.state.Student.campus && console.log(this.state.Student.campus.image)
        const student = this.state.Student
        return (
            <div className='Campus_Student_table'>
                {student.campus && <div><img src={student.campus.image} /></div>}
                <table>
                    <tr>
                        <th>Id#</th>
                        <th>Name</th>
                        <th>Campus</th>
                    </tr>
                    <tr key={student.id} >
                        <td>{student.id}</td>
                        <td>{student.name}</td>
                        {student.campus && <td>{student.campus.name}</td>}
                    </tr>
                </table>
                <button className="Delete" onClick={this.handleChanger} >Update</button>
                {this.state.changer && (
                    <form className="Campus_Student_table " onSubmit={this.handleSubmit}>
                        <h2>Create Student</h2>
                        <label>name </label><input type='text' name="name" onChange={this.handleName}></input>
                        <label>Email </label><input type='email' name="email" onChange={this.handleEmail}></input>
                        <select onChange={this.handleCampusId} >
                            <option value="">Select a campus</option>
                            {
                                this.state.Campuses && this.state.Campuses.map(campus => {
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