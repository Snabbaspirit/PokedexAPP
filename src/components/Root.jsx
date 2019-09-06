import React, { Component } from 'react';
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import NavBar from "./layout/NavBar";
import Dashboard from './layout/Dashboard';
import Pokemon from "./pokemon/Pokemon";
import CaughtList from "./pokemon/CaughtList"
import backgroundImage from "../assets/pattern.png";

export default class Root extends Component {
    state = {
        pokemons: []
    };

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }
    

    changeCaught(data) {
        const { pokemons: oldPokemonsList } = this.state;
        const date = new Date().toLocaleString("ru");
        const pokemon = Object.assign({}, data, { date });

        const isPokemonIsTheList = oldPokemonsList.some(({ name }) => name === pokemon.name);
        if (isPokemonIsTheList) return;

        const pokemons = [...oldPokemonsList, pokemon];
        this.setState({ pokemons });
    }

    render() {
        return (
            <Router>
                <div className="App" style={{background: `url(${backgroundImage})`}}>
                <NavBar />
                <div className="container">
                <Switch>
                    <Route exact path="/pokemon/:pokemonIndex" component={Pokemon} />
                    <Route exact path="/caught" component={() => <CaughtList caught={this.state.pokemons}/>} />
                    <Route exact path="/" component={() => <Dashboard  handleCaughtPokemon={this.changeCaught.bind(this)} />}/>
                    </Switch>
                </div>
                </div>
            </Router>
        );
    }
};