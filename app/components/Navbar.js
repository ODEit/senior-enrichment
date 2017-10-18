import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';


export default class Navbar extends Component{
    render(){
        return(
            <nav>
                <div className="nav-item">
                    <NavLink to = '/campuses' >Home</NavLink> 
                </div>
                <div className="nav-item">
                    <NavLink to = '/students' >Students</NavLink> 
                </div>
                <div className="nav-item">
                <NavLink to = '/NewStudent' >NewStudent</NavLink> 
                 </div>
                 <div className="nav-item">
                 <NavLink to = '/NewCampus' >NewCampus</NavLink> 
                  </div>
            </nav>
        )
    }
}