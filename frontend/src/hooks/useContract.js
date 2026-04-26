import { ethers } from "ethers";
import contractJSON from "../abi/EquipmentPassport.json";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // ✅ Le VRAI contrat déployé

export const getContract = async () => {

  if (!window.ethereum) {
    alert("Please install MetaMask");
    return;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);

  const signer = await provider.getSigner();

  const contract = new ethers.Contract(
    contractAddress,
    contractJSON.abi,
    signer
  );

  return contract;
};