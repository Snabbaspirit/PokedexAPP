import React, { Component } from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import styled from "styled-components";

import loading from "../../assets/loading.gif";

const Sprite = styled.img`
    width: 12em;
    height: 12em;
    display: none;
`;

const Card = styled.div`
    width: 220px;
    text-align: center;
    margin-bottom: 20px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    &:hover {
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    }
    -moz-user-select: none;
    -website-user-select: none;
    user-select: none;
    -o-user-select: none;
`;

const StyledLink = styled(Link)`

    text-decoration: none;
    color: black;
    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
        text-decoration: none;
    }
`;


export default class PokemonCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            imageUrl: "",
            pokemonIndex: "",
            imageLoading: true,
            isCaught: false,
            data: {}
        };
        this.handleCatchPokemon = this.handleCatchPokemon.bind(this);
    }

    async componentDidMount() {
        const { name, url } = this.props;
        const result = await axios.get(url);
        const { data } = result;
        const { sprites, id } = data;
        const imageUrl = sprites.front_default;

        this.setState({
            name,
            imageUrl,
            pokemonIndex: id,
            data
        });
    }

    async handleCatchPokemon(event) {
        event.preventDefault();

        const { name } = this.state;
        const { url } = this.props;
        const isCaught = true;
        this.setState({ isCaught });
        this.props.handleCaughtPokemon({ name, url });
    }

    render() {
        return (
            <div className="col mx-20 mb-30">
                
                <StyledLink to={`pokemon/${this.state.pokemonIndex}`}>
                <Card className="card">
                    <h5 className="card-header">{this.state.pokemonIndex}</h5>
                    {this.state.imageLoading ? (
                        <img
                        alt="loading"
                        src={loading}
                        style={{width: "5em", height: "5em"}}
                        className="card-img-top rounded mx-auto d-block mt-2"
                        />
                    ) : null}
                    <Sprite
                    className="card-img-top rounded mx-auto mt-2"
                    onLoad={() => this.setState({ imageLoading: false })}
                    src={this.state.imageUrl}
                    style={
                        this.state.imageLoading ? null : { display: "block" }
                    }
                    />
                    <div className="card-body mx-auto">
                        <h6 className="card-title">
                            {this.state.name
                            .toLowerCase()
                            .split(' ')
                            .map(letter => letter.charAt(0).toUpperCase() + letter.substring(1))
                            .join("")}
                        </h6>
                        {this.props.date ?

                                <div>
                                    <article>
                                        <mark className="text-warning bg-danger h5">
                                            Well Done!
                                        </mark>
                                    </article>
                                    <div>
                                        <mark className="text-success">
                                        You caught this pokemon at:
                                        </mark><div>{this.props.date}</div>
                                    </div>
                                </div>
                            :

                            <button
                                className="btn btn-outline-success btn-lg"
                                onClick={this.handleCatchPokemon}
                                disabled={this.state.isCaught}
                            >
                                Catch me!
                            </button>
                        }
                    </div>
                    
                </Card>
                
                </StyledLink>
            </div>
        )
    }
}
