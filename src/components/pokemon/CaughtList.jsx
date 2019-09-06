import React, { Component } from 'react';
import PokemonCard from "./PokemonCard";

export default class CaughtList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            caughtPokemons: []
        }; 
    }

    render() {
        return (
            <div className="container">
            <div className="row">
                {this.props.caught.map((pokemon, index) =>
                    <div key={index} className="col-md-3">
                    <PokemonCard
                        name={pokemon.name}
                        url={pokemon.url}
                        date={pokemon.date}
                    />
                    </div>)
                }
            </div>
            </div>
        );
    }
}