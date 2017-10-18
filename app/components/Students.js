import React, {Component} from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom'
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
        .then(students => this.setState({students}))
      }
    
    handleDelete(event){
      const id = event.target.value;
      console.log(event.target.value)
     
      axios.delete(`/api/student/${id}`)
    }  

    render() {
        return (
          <div className='Student_table'>
        <table>
          <tr>
          <th>Id#</th>
          <th>Name</th>
          <th>Campus</th>
          </tr>
        {this.state.students.length && this.state.students.sort((a,b) => a.id-b.id).map((student) => {
        return(
            <tr key = {student.id} >
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td>{student.campus.name}</td>
          <button className = "Delete"  value = {student.id} onClick = {this.handleDelete}>Delete</button>
          <NavLink to = {`/campus/:${student.campus.id} `}><img className = "Uni" src = "http://downloadicons.net/sites/default/files/university-of-small-icons-58871.png "/></NavLink>
          <NavLink to = {`/student/:${student.id} `}><img className = "Uni" src = "http://downloadicons.net/sites/default/files/university-of-small-icons-58871.png "/></NavLink>
          </tr>
        )})}
        </table>
          </div>
        )
      }
    }