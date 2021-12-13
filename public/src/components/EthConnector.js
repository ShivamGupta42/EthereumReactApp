// dependencies
import React, { useState, useEffect } from 'react';
import Web3 from 'web3'
// JSON interfaces of Solidity contracts
import TicTacToeJSON from '../../abis/TicTacToe.json'
import AddressInput from './AddressInput'

// Constants
import Constants from '../Constants'

const initializeAll = (address1,address2) => {

    console.log("Eth Connector initialize "+address1+" "+address2)
    const allConstants = new Constants()
    const web3 = new Web3(new Web3.providers.HttpProvider(allConstants.ETH_URL));
    console.log('Web3 as connected', web3)
    const { eth } = web3

    // abi and contract address from the JSON interface of the contract
    const { abi, networks } = TicTacToeJSON
    const networkIds = Object.keys(networks)
    const contractAddress = networks[networkIds[0]].address
    console.log("contract address", contractAddress, " and abi\n", abi)

    // initialize the contract 
    const contract = new eth.Contract(abi, contractAddress)
    contract.methods.setPlayers(address1,address2).call();

    console.log('contract', contract)
    return { eth, contract, contractAddress };
}


const useEthConnector = (props1,props2) => {

    console.log("Eth Connector Properties" + props1+ " "+props2)
    const {address1} = props1
    const {address2} = props2
    console.log("Eth Connector Addresses "+address1+" "+address2)
    const { eth, contract,contractAddress} = initializeAll(address1,address2)

    const [box, setBox] = useState()
    const [gameResult, setResult] = useState('')


    const placeBet = async () => {
        let addr;
        try {
            addr = address1;
            const result1 = await contract.methods.placeBets().send({ from: address1 , value: '1'+'0'.repeat(19)})
            console.log('Placed bet of address '+address1)

            addr = address2
            const result2 = await contract.methods.placeBets().send({ from: address2 , value: '1'+'0'.repeat(19)})
            console.log('Placed bet of address '+address2)
        } catch (err) {
            console.log('Unable to place bet of address'+addr, err)
        }
    }


    const transferMoneyToWinner = async (address) => {
        let addr = address =='player1' ? address1: address2
        try {
            console.log("Winners balance before transfer "+ (await eth.getBalance(addr)))
            const result = await contract.methods.sendAmountViaCall(addr).send({ from: contractAddress })
            console.log('Transfer money to winner successful '+addr)
            console.log("Winners balance after transfer "+ (await eth.getBalance(addr)))
        } catch (err) {
            console.log('Transfer money to winner failure '+addr+ " contract : "+contractAddress, err)
        }
    }



    const getBox = async () => {
        const boxReceived = await contract.methods.getCurrentBox().call()
        console.log("box received :"+boxReceived)
        setBox(boxReceived)
    }

    const saveBox = async (rowVal, colVal, move) => {
        try {
            // use the address of the first account in the block chain
            const accountsReceived = await eth.getAccounts()
            const result = await contract.methods.saveCurrentMove(rowVal, colVal, move).send({ from: accountsReceived[0] })
            console.log('Move is captured successfully')
        } catch (err) {
            console.log('unable to save the move', err)
        }
    }

    const getResult = async () => {
        const gameResultReceived = await contract.methods.getGameResult().call()
        setResult(gameResultReceived)
    }

    const saveResult = async (gameResult) => {
        try {
            // use the address of the first account in the block chain
            const accountsReceived = await eth.getAccounts()
            const result = await contract.methods.saveResult(gameResult).send({ from: accountsReceived[0] })
            console.log('Result is captured successfully')
        } catch (err) {
            console.log('unable to save the Result', err)
        }
    }

    return ([box, getBox, saveBox, gameResult, getResult, saveResult,placeBet, transferMoneyToWinner]);
}

export default useEthConnector;