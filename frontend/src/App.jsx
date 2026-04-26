import { useState } from "react";
import { getContract } from "./hooks/useContract";
import PassportView from "./components/PassportView";
import UpdateOwner from "./components/UpdateOwner";
import AddMaintenance from "./components/AddMaintenance";
import MaintenanceHistory from "./components/MaintenanceHistory";
import UploadIPFS from "./components/UploadIPFS";
import EquipmentDocuments from "./components/EquipmentDocuments";

function App() {

  const [name,setName] = useState("");
  const [owner,setOwner] = useState("");

  const connectWallet = async () => {

    await window.ethereum.request({
      method: "eth_requestAccounts"
    });

  };

  const registerEquipment = async () => {

    try {

      if (!name || !owner) {
        alert("Please fill in all fields");
        return;
      }

      const contract = await getContract();

      const tx = await contract.registerEquipment(name, owner);

      await tx.wait();

      alert("✅ Equipment registered!");

      setName("");
      setOwner("");

    } catch (error) {

      console.error(error);
      alert("❌ " + (error.reason || error.message));

    }

  };

  return (

    <div style={{padding:"40px"}}>

      <h1>Equipment Passport</h1>

      <button onClick={connectWallet}>
        Connect Wallet
      </button>

      <br/><br/>

      <input
        placeholder="Equipment name"
        onChange={(e)=>setName(e.target.value)}
      />

      <br/><br/>

      <input
        placeholder="Owner"
        onChange={(e)=>setOwner(e.target.value)}
      />

      <br/><br/>

      <button onClick={registerEquipment}>
        Register Equipment
      </button>

      <br/><br/>

      <PassportView/>

      <br/><br/>

      <UpdateOwner/>

      <br/><br/>

      <AddMaintenance/>

      <br/><br/>

      <UploadIPFS/>

      <br/><br/>

      <MaintenanceHistory/>
      <br/><br/>

      <EquipmentDocuments/>

    </div>

  );

}

export default App;