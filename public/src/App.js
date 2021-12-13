// dependencies
import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Switch, Route, withRouter} from "react-router-dom"

// component dependencies
import AddressInput from './components/AddressInput'
import Title from './components/Title'
import TicTacToe from "./components/TicTacToe"

// css
import './styles.css'

const App = (props) => {
	const [title, setTitle] = useState('Shivam\'s Simple Tic Tac Toe')
    return (
        <div className="container">
        <Title titleToShow={title}/>
            <Switch>
                <Route path="/Address" exact component={AddressInput} />
                <Route path="/Game" exact component={TicTacToe} />
            </Switch>
        </div>
    );
}

export default withRouter(App)
