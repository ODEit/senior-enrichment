import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default class Campus extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            image: '',
            Campus: {},
            changer: false,
            changerOne:false,
            Students : []
        }
        this.handleChanger = this.handleChanger.bind(this)
        this.handleChangerOne = this.handleChangerOne.bind(this)
        this.handleImage = this.handleImage.bind(this)
        this.handleName = this.handleName.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleDeleteStudent = this.handleDeleteStudent.bind(this)
        this.handleAddStudent = this.handleAddStudent.bind(this)
    }

    componentDidMount() {
        let campusid = this.props.match.params.campusid.slice(1)
        axios.get(`/api/campus/${campusid}`)
            .then(res => res.data)
            .then(Campus => this.setState({ Campus }))
        axios.get(`/api/student`)
            .then(res => res.data)
            .then(Students => this.setState({Students}))
    }

    handleChanger() {
        this.setState({ changer: !this.state.changer })
    }

    handleChangerOne() {
        this.setState({changerOne: !this.state.changerOne})
    }


    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.Campus.id)
        var updater = {
            name: this.state.name || this.state.Campus.name,
            image: this.state.image || this.state.Campus.image
        }
        var Campus = Object.assign({},this.state.Campus,updater)
        this.setState({Campus})
        axios.put(`/api/campus/${this.state.Campus.id}`, updater)
            .then(console.log('finished'))
            .then(() => this.handleChanger())
    }

    handleImage(event) {
        let image = event.target.value
        this.setState({ image })
        console.log(this.state)
    }

    handleName(event) {
        let name = event.target.value
        this.setState({ name })
        console.log(this.state)
    }

    handleDelete(event) {
        const id = event.target.value;
        console.log(event.target.value)
        axios.delete(`/api/campus/${id}`)
        .then(()=> this.props.history.push('/campuses'))
    }

    handleDeleteStudent(event){
    var studentId = event.target.value
    var Campus = this.state.Campus;
    console.log(Campus.students)
    Campus.students = Campus.students.filter(student => student.id != studentId)
    console.log(Campus.students) 
    this.setState(()=>{Campus});
    axios.put(`/api/student/${studentId}`,{campusId: null})
    }
   
    handleAddStudent(event){
    var studentId = event.target.value
    var Student = this.state.Students.filter(student => student.id == studentId)[0]
    var Campus = Object.assign({},this.state.Campus)
    Campus.students = [...this.state.Campus.students, Student]
    this.setState({Campus})
    axios.put(`/api/student/${studentId}`, {campusId: this.state.Campus.id})
    .then(() => this.props.history.push('/'))
    .then(()=> this.props.history.push(`/campus/:${this.state.Campus.id}`))
    }


    render() {
        console.log(this.state.Campus.students)
        return (
            <div id='Campus_Student_table'>
                <h2>{this.state.Campus && this.state.Campus.name}</h2>
                <img src={this.state.Campus.image} />
                <button className='Delete' onClick={this.handleDelete} value={this.state.Campus.id}>Delete</button>
                <button className='Delete' onClick= {this.handleChangerOne}>Update Students</button>
                <button className='Delete' onClick={this.handleChanger}>Update Campus</button>
                {this.state.changer && (<div>
                    <form className="Form" onSubmit={this.handleSubmit}>
                        <label>Name<input type='text' onChange={this.handleName} ></input></label>
                        <label>Image<input type='url' onChange={this.handleImage} ></input></label>
                        <button className="Delete" type='submit' >Submit</button>
                    </form>
                </div>
                )}
                {
                    //expel and Add
                    this.state.changerOne && (<div>
                    <select onChange = {this.handleDeleteStudent} >
                    <option value = "">Expel A Student</option>
                    { this.state.Campus.students && this.state.Campus.students.map(student => {
                          return  <option value = {student.id} key = {student.id}>{student.name}</option>
                    })}
                    </select>
                    
                    <select onChange = {this.handleAddStudent} >
                    <option value = "">Steal a Student</option>
                    {
                        this.state.Students && this.state.Students.filter(student => student.campusId != this.state.Campus.id ).map(student => {
                          return  <option value = {student.id} key = {student.id}>{student.name}</option>
                    })}
                    </select>
                    </div>
                )

                }
                <table className = 'Student_table'>
                    <tr>
                        <th>Id#</th>
                        <th>Name</th>
                        <th>Link</th>
                    </tr>
                    {this.state.Campus.students && this.state.Campus.students.sort((a, b) => a.id - b.id).filter(student => student.campusId).map((student) => {
                        return (
                            <tr key={student.id} >
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td><NavLink to={`/student/:${student.id} `}><img className="UniStudentS" src="https://d30y9cdsu7xlg0.cloudfront.net/png/1173605-200.png" /></NavLink>
                                </td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        )
    }
}