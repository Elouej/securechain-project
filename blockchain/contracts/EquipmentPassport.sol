// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract EquipmentPassport is AccessControl {

    bytes32 public constant TECHNICIAN_ROLE = keccak256("TECHNICIAN_ROLE");
    bytes32 public constant AUDITOR_ROLE = keccak256("AUDITOR_ROLE");

    // =========================
    // STRUCTS
    // =========================

    struct Equipment {
        uint id;
        string name;
        string owner;
        uint createdAt;
    }

    struct Maintenance {
        uint equipmentId;
        string description;
        uint timestamp;
        address technician;
    }

    struct Document {
        uint equipmentId;
        string ipfsHash;
        uint timestamp;
    }

    // =========================
    // STORAGE
    // =========================

    uint public equipmentCount;

    mapping(uint => Equipment) public equipments;
    mapping(uint => Maintenance[]) public maintenanceHistory;
    mapping(uint => Document[]) public equipmentDocuments;

    // =========================
    // EVENTS
    // =========================

    event EquipmentRegistered(uint id, string name, string owner);
    event OwnerUpdated(uint id, string newOwner);
    event MaintenanceAdded(uint equipmentId, string description, address technician);
    event DocumentAdded(uint equipmentId, string ipfsHash);

    // =========================
    // CONSTRUCTOR
    // =========================

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    // =========================
    // EQUIPMENT MANAGEMENT
    // =========================

    function registerEquipment(string memory _name, string memory _owner)
        public
    {
        require(bytes(_name).length > 0, "Name required");
        require(bytes(_owner).length > 0, "Owner required");

        equipmentCount++;

        equipments[equipmentCount] = Equipment({
            id: equipmentCount,
            name: _name,
            owner: _owner,
            createdAt: block.timestamp
        });

        emit EquipmentRegistered(equipmentCount, _name, _owner);
    }

    function updateOwner(uint _id, string memory _newOwner)
        public
    {
        require(_id > 0 && _id <= equipmentCount, "Invalid equipment");
        require(bytes(_newOwner).length > 0, "Owner required");

        equipments[_id].owner = _newOwner;

        emit OwnerUpdated(_id, _newOwner);
    }

    function getEquipment(uint _id)
        public
        view
        returns (Equipment memory)
    {
        require(_id > 0 && _id <= equipmentCount, "Invalid equipment");

        return equipments[_id];
    }

    function getEquipmentCount() public view returns(uint){
        return equipmentCount;
    }

    // =========================
    // MAINTENANCE MANAGEMENT
    // =========================

    function addMaintenance(uint _equipmentId, string memory _description)
        public
        onlyRole(TECHNICIAN_ROLE)
    {
        require(_equipmentId > 0 && _equipmentId <= equipmentCount, "Invalid equipment");
        require(bytes(_description).length > 0, "Description required");

        maintenanceHistory[_equipmentId].push(
            Maintenance({
                equipmentId: _equipmentId,
                description: _description,
                timestamp: block.timestamp,
                technician: msg.sender
            })
        );

        emit MaintenanceAdded(_equipmentId, _description, msg.sender);
    }

    function getMaintenanceCount(uint _equipmentId)
        public
        view
        returns(uint)
    {
        require(_equipmentId > 0 && _equipmentId <= equipmentCount, "Invalid equipment");

        return maintenanceHistory[_equipmentId].length;
    }

    function getMaintenance(uint _equipmentId, uint _index)
        public
        view
        returns(Maintenance memory)
    {
        require(_equipmentId > 0 && _equipmentId <= equipmentCount, "Invalid equipment");
        require(_index < maintenanceHistory[_equipmentId].length, "Invalid index");

        return maintenanceHistory[_equipmentId][_index];
    }

    // =========================
    // DOCUMENT MANAGEMENT (IPFS)
    // =========================

    function addDocument(uint _equipmentId, string memory _ipfsHash)
        public
    {
        require(_equipmentId > 0 && _equipmentId <= equipmentCount, "Invalid equipment");
        require(bytes(_ipfsHash).length > 0, "IPFS hash required");

        equipmentDocuments[_equipmentId].push(
            Document({
                equipmentId: _equipmentId,
                ipfsHash: _ipfsHash,
                timestamp: block.timestamp
            })
        );

        emit DocumentAdded(_equipmentId, _ipfsHash);
    }

    function getDocumentCount(uint _equipmentId)
        public
        view
        returns(uint)
    {
        require(_equipmentId > 0 && _equipmentId <= equipmentCount, "Invalid equipment");

        return equipmentDocuments[_equipmentId].length;
    }

    function getDocument(uint _equipmentId, uint _index)
        public
        view
        returns(Document memory)
    {
        require(_equipmentId > 0 && _equipmentId <= equipmentCount, "Invalid equipment");
        require(_index < equipmentDocuments[_equipmentId].length, "Invalid index");

        return equipmentDocuments[_equipmentId][_index];
    }

    // =========================
    // ROLE MANAGEMENT
    // =========================

    function addTechnician(address _tech)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        require(_tech != address(0), "Invalid address");
        grantRole(TECHNICIAN_ROLE, _tech);
    }

    function addAuditor(address _auditor)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        require(_auditor != address(0), "Invalid address");
        grantRole(AUDITOR_ROLE, _auditor);
    }

    function isTechnician(address _addr) public view returns(bool){
        return hasRole(TECHNICIAN_ROLE,_addr);
    }

    function isAuditor(address _addr) public view returns(bool){
        return hasRole(AUDITOR_ROLE,_addr);
    }

}