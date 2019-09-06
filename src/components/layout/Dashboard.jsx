import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import axios from "axios";
import { PokemonList } from "../pokemon/PokemonList";

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: "https://pokeapi.co/api/v2/pokemon",
            pokemons: [],
            offest: 0,
            pageCount: 800 / 20
        };
    }

    componentDidMount() {   
        this.loadPokemons();
    }

    async handlePageChange(event) {
        const offset = event.selected * 20;
        await this.setState({ offset });
        await this.loadPokemons();
    }

    async loadPokemons() {
        const response = await axios(`${this.state.url}?offset=${this.state.offset}`);
        const { results: pokemons } = response.data;
        this.setState({ pokemons });
    } 

    render() {
        const { pokemons, pageCount } = this.state;
        const { handleCaughtPokemon } = this.props;
        return (
            <div>
                <div>
                    <div className="col">
                        <PokemonList
                            pokemon={pokemons}
                            handleCaughtPokemon={handleCaughtPokemon}
                        />
                    </div>
                    
                </div>
                <nav aria-label="Page navigation">
                    <ul className="pagination pagination-lg">
                    <ReactPaginate
                        containerClassName={'pagination'}
                        pageCount={pageCount}
                        nextLabel={'Next'}
                        previousLabel={'Previous'}
                        pageClassName={"page-link"}
                        activeClassName={'page-item'}
                        previousLinkClassName={"page-link"}
                        nextLinkClassName={"page-link"}
                        breakLinkClassName={"page-link"}

                        //The method to call when a page is clicked.
                        onPageChange={this.handlePageChange.bind(this)}
                    />
                    </ul>
                </nav>
            </div>
            
        )
    }
}
