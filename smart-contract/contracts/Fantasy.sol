//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/LSP7DigitalAsset.sol";

contract Fantasy is LSP7DigitalAsset {
  struct Manager {
    string cid;
    address sender;
    uint256 id;
  }

  struct League {
    string cid;
    address creator;
    Manager[] managers;
    uint256 id;
  }

  League newLeague;
  Manager[] private emptyManagerArr;
  Manager[] private tempManagerArr;
  uint256[] public leagueIds;

  mapping(uint256 => League) public leagueByTokenId;

  uint256 private leaguesCounter;
  uint256 private managersCounter;
  uint256 private prizePool;

  address private admin;

  constructor(
    string memory _name,
    string memory _symbol,
    address _newOwner,
    bool _isNFT
  ) LSP7DigitalAsset(_name, _symbol, _newOwner, _isNFT) {
    admin = _newOwner;
  }

  modifier onlyAdmin() {
    require(msg.sender == admin);
    _;
  }

  //League FUNCTION
  function createLeague(string calldata _cid) public {
    newLeague.cid = _cid;
    newLeague.creator = msg.sender;
    newLeague.id = ++leaguesCounter;

    leagueByTokenId[leaguesCounter] = newLeague;
    leagueIds.push(leaguesCounter);

    _mint(msg.sender, leaguesCounter, true, "");
  }

  function editLeague(uint256 _tokenId, string calldata _cid) public {
    require(
      leagueByTokenId[_tokenId].creator == msg.sender || admin == msg.sender,
      "Only creator or admin can edit a league"
    );
    leagueByTokenId[_tokenId].cid = _cid;
  }

  function deleteLeague(uint256 _tokenId) public {
    require(
      leagueByTokenId[_tokenId].creator == msg.sender,
      "only creator or admin can delete a league"
    );

    uint256[] memory leaguesList = leagueIds;
    uint256 totalLeagues = leaguesList.length;
    uint256 leagueIndex;
    for (uint256 i = 0; i < totalLeagues; ) {
      if (leaguesList[i] == _tokenId) {
        leagueIndex = i;
        break;
      }
      unchecked {
        ++i;
      }
    }

    for (uint256 i = leagueIndex; i < totalLeagues - 1; ) {
      leaguesList[i] = leaguesList[i + 1];
      unchecked {
        ++i;
      }
    }
    leagueIds = leaguesList;
    leagueIds.pop();
  }

  function fetchLeagues()
    public
    view
    returns (
      League[] memory leagues,
      uint256,
      uint256,
      address
    )
  {
    uint256 leaguesLength = leagueIds.length;
    uint256[] memory leagueArray = leagueIds;
    leagues = new League[](leaguesLength);

    for (uint256 i = 0; i < leaguesLength; ) {
      leagues[i] = leagueByTokenId[leagueArray[i]];
      unchecked {
        ++i;
      }
    }

    return (leagues, leaguesCounter, managersCounter, admin);
  }

  //MANAGER FUNCTIONS
  function joinLeague(uint256 _tokenId, string calldata _cid) public {
    Manager memory manager = Manager({cid: _cid, sender: msg.sender, id: ++managersCounter});
    leagueByTokenId[_tokenId].managers.push(manager);
  }

  function _managerProfile(uint256 _tokenId, uint256 _managerId)
    internal
    view
    returns (address sender)
  {
    for (uint256 i = 0; i < leagueByTokenId[_tokenId].managers.length; ) {
      if (leagueByTokenId[_tokenId].managers[i].id == _managerId) {
        sender = leagueByTokenId[_tokenId].managers[i].sender;
        break;
      }
      unchecked {
        ++i;
      }
    }
    return sender;
  }

  function exitLeague(uint256 _tokenId, uint256 _managerId) public {
    require(
      leagueByTokenId[_tokenId].creator == msg.sender ||
        _managerProfile(_tokenId, _managerId) == msg.sender ||
        admin == msg.sender,
      "Only admin or sender can remove a manager from league"
    );

    Manager[] memory managers = leagueByTokenId[_tokenId].managers;
    uint256 totalManagers = managers.length;

    if (totalManagers == 1) {
      leagueByTokenId[_tokenId].managers = emptyManagerArr;
    } else {
      tempManagerArr = emptyManagerArr;
      for (uint256 i = 0; i < totalManagers; ) {
        if (managers[i].id != _managerId) {
          tempManagerArr.push(leagueByTokenId[_tokenId].managers[i]);
        }
        unchecked {
          ++i;
        }
      }
      leagueByTokenId[_tokenId].managers = tempManagerArr;
    }
  }

  function fetchManagers(uint256 _tokenId) public view returns (Manager[] memory managers) {
    uint256 managersLength = leagueByTokenId[_tokenId].managers.length;
    Manager[] memory managerArray = leagueByTokenId[_tokenId].managers;
    managers = new Manager[](managersLength);

    for (uint256 i = 0; i < managersLength; ) {
      managers[i] = managerArray[i];
      unchecked {
        ++i;
      }
    }

    return managers;
  }

  //ADMIN FUNCTION
  function changeAdmin(address _newAdmin) public onlyAdmin {
    admin = _newAdmin;
  }
}
