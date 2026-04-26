import { useState } from "react";
import { getContract } from "../hooks/useContract";

function AddMaintenance() {

const [equipmentId,setEquipmentId] = useState("");
const [description,setDescription] = useState("");

const addMaintenance = async () => {

try{

const contract = await getContract();

const tx = await contract.addMaintenance(
equipmentId,
description
);

await tx.wait();

alert("Maintenance added");

}catch(error){

alert(error.message);

}

};

return (

<div>

<h2>Add Maintenance</h2>

<input
placeholder="Equipment ID"
onChange={(e)=>setEquipmentId(e.target.value)}
/>

<br/><br/>

<input
placeholder="Description"
onChange={(e)=>setDescription(e.target.value)}
/>

<br/><br/>

<button onClick={addMaintenance}>
Add Maintenance
</button>

</div>

);

}

export default AddMaintenance;