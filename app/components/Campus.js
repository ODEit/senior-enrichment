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
            changer: false
        }
        this.handleChanger = this.handleChanger.bind(this)
        this.handleImage = this.handleImage.bind(this)
        this.handleName = this.handleName.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount() {
        let campusid = this.props.match.params.campusid.slice(1)
        axios.get(`/api/campus/${campusid}`)
            .then(res => res.data)
            .then(Campus => this.setState({ Campus }))
    }

    handleChanger() {
        this.setState({ changer: !this.state.changer })
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.Campus.id)
        var updater = {
            name: this.state.name || this.state.Campus.name,
            image: this.state.image || this.state.Campus.image
        }
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
    }




    render() {

        return (
            <div className='Campus_Student_table'>
                <h2>{this.state.Campus.name}</h2>
                <img src={this.state.Campus.image} />
                <button className='Delete' onClick={this.handleDelete} value={this.state.Campus.id}>Delete</button>
                <button className='Delete' onClick={this.handleChanger}>Update Campus</button>
                {this.state.changer && (<div>
                    <form className="Form" onSubmit={this.handleSubmit}>
                        <label>Name<input type='text' onChange={this.handleName} ></input></label>
                        <label>Image<input type='url' onChange={this.handleImage} ></input></label>
                        <button className="Delete" type='submit' >Submit</button>
                    </form>
                </div>
                )}
                <table>
                    <tr>
                        <th>Id#</th>
                        <th>Name</th>
                    </tr>
                    {this.state.Campus.students && this.state.Campus.students.sort((a, b) => a.id - b.id).map((student) => {
                        return (
                            <tr key={student.id} >
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <NavLink to={`/student/:${student.id} `}><img className="Uni" src="http://downloadicons.net/sites/default/files/university-of-small-icons-58871.png " /></NavLink>
                            </tr>
                        )
                    })}
                </table>
            </div>
        )
    }
}