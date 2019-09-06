import React, { Component } from 'react';
import { Link } from 'react-router-dom';



export default class NavBar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expend-md navbar-dark bg-dark fixed-top">
                    <Link to="/" className="btn btn-danger">Home</Link>
                    <Link to="/caught" className="btn btn-danger">Caught Pokemons</Link>
                </nav>
            </div>
        )
    }
}
