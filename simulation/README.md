#  SecureChain Project

##  Overview

SecureChain is a blockchain-based application designed to securely manage equipment data using smart contracts.

This project demonstrates the development, testing, and deployment of smart contracts using Hardhat, along with a modern React frontend for user interaction.

---

##  Tech Stack

* **Blockchain:** Solidity, Hardhat
* **Frontend:** React (Vite)
* **Web3 Interaction:** Ethers.js
* **Language:** JavaScript

---

##  Project Structure

```
securechain-project/
│
├── blockchain/      # Smart contracts & Hardhat configuration
├── frontend/        # React frontend application
├── simulation/      # Simulation scripts
├── README.md        # Project documentation
```

---

##  Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Elouej/securechain-project.git
cd securechain-project
```

### 2. Install dependencies

```bash
npm install
cd frontend
npm install
```

---

## Usage

### 🔹 Compile Smart Contracts

```bash
npx hardhat compile
```

Compiles Solidity contracts into bytecode.

---

### 🔹 Start Local Blockchain

```bash
npx hardhat node
```

Starts a local Ethereum network for testing.

---

### 🔹 Deploy Smart Contract

```bash
npx hardhat run scripts/deploy.js --network localhost
```

Deploys contracts to the local network.

---

### 🔹 Run Tests

```bash
npx hardhat test
```

Executes unit tests for smart contracts.

---

##  Key Notes

* Always run `compile` after modifying contracts
* Keep the Hardhat node running during testing
* Redeploy contracts after any changes

---

##  Example Smart Contract

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint public data;

    function set(uint _data) public {
        data = _data;
    }

    function get() public view returns (uint) {
        return data;
    }
}
```

---

##  Features

* Equipment tracking using blockchain
* Role-based access control
* Maintenance history management
* IPFS document upload integration
* Interactive React frontend

---

## Author

**ELOUEJ ACHRAF**
Blockchain Academic Project

---

##  Future Improvements

* Deploy on Ethereum testnet (Sepolia / Goerli)
* Integrate MetaMask authentication
* Improve UI/UX design
* Add backend API (optional)

---


