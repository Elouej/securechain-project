import { useState } from "react";
import { getContract } from "../hooks/useContract";

function UpdateOwner() {

  const [id, setId] = useState("");
  const [newOwner, setNewOwner] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateOwner = async () => {

    try {
      setError("");
      setLoading(true);

      if (!id || !newOwner) {
        alert("Please fill in all fields");
        return;
      }

      console.log("Updating owner for equipment:", id, "to:", newOwner);
      
      const contract = await getContract();

      if (!contract) {
        alert("Could not connect to contract");
        return;
      }

      console.log("Sending transaction...");
      const tx = await contract.updateOwner(id, newOwner);

      console.log("Waiting for confirmation...");
      await tx.wait();

      alert("✅ Owner updated!");
      setId("");
      setNewOwner("");

    } catch (err) {
      console.error("Error:", err);
      setError("❌ Error: " + (err.reason || err.message));
      alert("❌ Error: " + (err.reason || err.message));
    } finally {
      setLoading(false);
    }

  };

  return (

    <div style={{marginTop:"20px", padding:"10px", border:"1px solid #ccc"}}>

      <h2>Update Equipment Owner</h2>

      <input
        placeholder="Equipment ID"
        value={id}
        onChange={(e)=>setId(e.target.value)}
      />

      <br/><br/>

      <input
        placeholder="New Owner"
        value={newOwner}
        onChange={(e)=>setNewOwner(e.target.value)}
      />

      <br/><br/>

      <button onClick={updateOwner} disabled={loading}>
        {loading ? "Updating..." : "Update Owner"}
      </button>

      {error && <p style={{color:"red"}}>{error}</p>}

    </div>

  );

}

export default UpdateOwner;