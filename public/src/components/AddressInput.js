import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import '../styles.css'

const AddressInput = (props) => {
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [bothAddressReceived, setBothAddressReceived] = useState(false);


    function setAddressReceived() {
        setBothAddressReceived(true)
        console.log("Both addresses received")
        console.log("Address one :"+address1)
        console.log("Address two :"+address2)
    }

    return (
        <div className="box-container">
        <form>
            <label className="label">
                Player's ETH address   :<input type="text"  className="input" onInput={e => setAddress1(e.target.value)} />
            </label>
            <br />
            <label className="label">
                Computer's ETH address  :<input type="text"  className="input" onInput={e => setAddress2(e.target.value)}/>
            </label>
            <br />
            <button type="submit" className="submit" onClick={e => setAddressReceived()}>Submit</button>
            <br />
        </form>

            <Link className="contents" to={{
                pathname: '/Game',
                state: {
                    address1: {address1},
                    address2: {address2}
                }
            }}>Go To Game</Link>

        </div>
    )
}

export default AddressInput;