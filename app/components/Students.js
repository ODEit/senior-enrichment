import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom'
export default class Students extends Component {

  constructor() {
    super()
    this.state = {
      students: []
    }
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    axios.get('/api/student')
      .then(res => res.data)
      .then(students => this.setState({ students }))
  }

  handleDelete(event) {
    const id = event.target.value;
    var students = this.state.students
    students = students.filter(student => !(student.id == id))
    this.setState({students})
    axios.delete(`/api/student/${id}`)
  }

  render() {
    return (
      <div id='Student_table_div'>
        <table className='Student_table'>
          <tbody>
          <tr>
            <th>Id#</th>
            <th>Name</th>
            <th>Campus</th>
            <th>Delete</th>
            <th>Links</th>
          </tr>
          
          {this.state.students.length && this.state.students.filter(student => student.campusId).sort((a, b) => a.id - b.id).map((student) => {
            return (
              <tr key={student.id} >
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.campus.name}</td>
                <td><button className="Delete" value={student.id} onClick={this.handleDelete}>Delete</button></td>
                <td> <NavLink to={`/campus/:${student.campus.id} `}><img className="Uni" src="http://downloadicons.net/sites/default/files/university-of-small-icons-58871.png " /></NavLink>
                  <NavLink to={`/student/:${student.id} `}><img className="UniStudent" src="https://d30y9cdsu7xlg0.cloudfront.net/png/1173605-200.png" /></NavLink></td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    )
  }
}