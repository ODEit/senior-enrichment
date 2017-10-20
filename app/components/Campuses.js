import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom'

export default class Campuses extends Component {

    constructor() {
        super()
        this.state = {
            Campuses: []
        }
    }

    componentDidMount() {
        axios.get('/api/campus')
            .then(res => res.data)
            .then(campuses => this.setState({ campuses }))
    }

    render() {
        console.log(this.props)
        return (
            <div className='Campus'>
                {this.state.campuses && this.state.campuses.map((campus, index) => {
                    return (
                        <div className='Campus_image' key= {campus.id}>
                        <h3>{campus.name}</h3>
                        <NavLink to={`/campus/:${campus.id}`} key={index}><img src={campus.image}></img></NavLink>
                        </div>
                    )
                })}
            </div>
        )
    }
}