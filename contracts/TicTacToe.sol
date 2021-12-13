pragma solidity >=0.4.21 <0.7.0;

contract TicTacToe {

    // initialize the box as 3 x 3 Array of unsigned integers
    uint [3][3] box;
    string gameResult;
    address payable public player1;
    address payable public player2;
    address public winner;
    mapping(address => uint256) bets;

    // initialize the box when the contract is deployed
    constructor() public {
        initializeBox();
    }

    // initialize the box the O values for each cell
    function initializeBox() public {
        box = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        gameResult = 'TBD';
    }

    // set players
    function setPlayers(address payable _player1, address payable _player2) public {
        player1 = _player1;
        player2 = _player2;
    }

    // save current move by user / computer
    function saveCurrentMove(uint rowVal, uint colVal, uint move) public {
        box[rowVal][colVal] = move;
    }

    // save the result of the game
    function saveResult(string memory result) public {
        gameResult = result;
    }

    // get bet amount from players
    function placeBets() public payable {
        bets[msg.sender] = msg.value;
    }

    function sendAmountViaCall(address payable _to) public {
        bool sent = _to.send(address(this).balance);
        require(sent, "Failed to send Ether");
    }

    // get the current box
    function getCurrentBox() public view returns (uint [3][3] memory) {
        return box;
    }

    // get the game RESULT
    function getGameResult() public view returns (string memory) {
        return gameResult;
    }


}