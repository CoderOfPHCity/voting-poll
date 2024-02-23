// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

contract Votting {

    error POLL_EXIST();

    struct Poll {
        string title;
        uint256 id;
        string description;
        address[] candidates;
        bool voted;
    }

    mapping(uint256 => Poll) polls;
    mapping(address => bool) registered;
    Poll[] pollArray;

    function createPool(
        string memory _title,
        uint256 _id,
        string memory _description
    ) public {

        if (pollExists(_id)) {
            revert POLL_EXIST();
        }

        Poll storage poll = polls[_id];
        poll.title = _title;
        poll.id = _id;
        poll.description = _description;

        pollArray.push(poll);
    }

    function candidatesToBeVoted(uint256 _id) public {
        require(!registered[msg.sender], "already registered");
        require(msg.sender != address(0), "not a valid address");
        
        // if (!pollExists(_id)) {
        //     revert POLL_EXIST();
        // }
        Poll storage poll = polls[_id];
        poll.candidates.push(msg.sender);
        poll.voted = true;
    }

    function getPolls() public view returns (Poll[] memory) {
        return pollArray;
    }

    function getSinglePoll(uint256 _id) public view returns (Poll memory) {
        return polls[_id];
    }

    function pollExists(uint256 _id) public view returns (bool) {
        return polls[_id].id == _id;
    }
}
