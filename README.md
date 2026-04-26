📘 Blockchain Project with Hardhat

📌 Project Overview

This project demonstrates the development, testing, and deployment of smart contracts using the Hardhat development environment.
It aims to provide a practical understanding of blockchain concepts and smart contract interactions.

⚙️ Tech Stack
Node.js
Hardhat
Solidity
Ethers.js
JavaScript

📁 Project Structure
/project-root
│
├── contracts/        # Smart contracts (Solidity)
├── scripts/          # Deployment scripts
├── test/             # Unit tests
├── hardhat.config.js # Hardhat configuration
├── package.json      # Project dependencies
└── README.md         # Documentation
🚀 Getting Started
1. Clone the repository
git clone <repository-url>
cd <project-name>
2. Install dependencies
npm install
▶️ Usage
🔹 Compile contracts
npx hardhat compile

Compiles Solidity smart contracts into bytecode.

🔹 Start local blockchain
npx hardhat node

Launches a local Ethereum network for testing.

🔹 Deploy contract
npx hardhat run scripts/deploy.js --network localhost

Deploys the smart contract to the local network.

🔹 Run tests
npx hardhat test

Executes unit tests for smart contracts.

❓ Key Notes
Always run compile after modifying contracts
Restart or keep node running for local testing
Redeploy contracts after any change
🧪 Example Smart Contract
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
🎯 Learning Objectives
Understand blockchain fundamentals
Develop smart contracts with Solidity
Use Hardhat for development and testing
Deploy contracts on a local network
👨‍💻 Author

ELOUEJ ACHRAF
Academic Project

📌 Additional Notes
Ensure all dependencies are installed before running commands
Check test results to validate contract behavior
Follow best practices for smart contract security
