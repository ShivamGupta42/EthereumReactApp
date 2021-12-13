import React, { Component, Suspense, lazy } from "react";
import AddressInput from './AddressInput'
import TicTacToe from "./TicTacToe";

class TicTacToeLoader extends Component {
    render() {
        const [bothAddressReceived] = AddressInput()
        if (!bothAddressReceived) {
           return <TicTacToe />
        }
    }
}