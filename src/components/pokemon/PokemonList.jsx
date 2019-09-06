import React from 'react';

import PokemonCard from "./PokemonCard";

export const PokemonList = (props) => 
(<React.Fragment>
    {props.pokemon ? (
        <div className="row">
            {props.pokemon.map(pokemon => (
                <PokemonCard 
                    key={pokemon.name}
                    name={pokemon.name}
                    url={pokemon.url}
                    handleCaughtPokemon={props.handleCaughtPokemon}
                />
            ))}
        </div>
    ) : (
    <h1>Loading</h1>
    )}
</React.Fragment>)