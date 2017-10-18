import React, {Component} from 'react'
import Navbar from './Navbar'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Students from './Students'
import Campuses from './Campuses'
import Campus from './Campus'
import SingleStudent from './SingleStudent'
import NewStudent from './NewStudent'
import NewCampus from './NewCampus'

export default class Main extends Component{

    render(){
        return(
            <Router>
            <div>
            <div>
            <Navbar />
            </div>
            <Switch>
            <Route exact path = '/campuses' component = {Campuses} />
            <Route exact path = '/students' component = {Students} />
            <Route exact path ='/campus/:campusid' component = {Campus} />
            <Route exact path ='/student/:studentid' component = {SingleStudent} />
            <Route exact path = '/NewStudent' component = {NewStudent} />
            <Route exact path = '/NewCampus' component = {NewCampus} />
            </Switch>
            </div>
            </Router>
        )
    }

}