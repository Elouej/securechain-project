import { useState, useEffect } from "react";
import { getContract } from "../hooks/useContract";

function PassportView() {

  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadEquipments = async () => {

    try {
      setLoading(true);
      setError("");

      const contract = await getContract();

      const count = await contract.equipmentCount();

      let list = [];

      for (let i = 1; i <= Number(count); i++) {

        const eq = await contract.equipments(i);

        list.push({
          id: i,
          name: eq.name,
          owner: eq.owner
        });

      }

      setEquipments(list);

    } catch (err) {
      console.error("Error loading equipments:", err);
      setError("Failed to load equipments: " + err.message);
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    loadEquipments();
  }, []);

  return (

    <div style={{marginTop:"20px", padding:"10px", border:"1px solid #ccc"}}>

      <h2>Equipment List</h2>

      <button onClick={loadEquipments} disabled={loading}>
        {loading ? "Loading..." : "Reload Equipments"}
      </button>

      {error && <p style={{color:"red"}}>{error}</p>}

      <p>Total: {equipments.length}</p>

      <ul>

        {equipments.map((eq) => (

          <li key={eq.id} style={{padding:"5px", margin:"5px 0", backgroundColor:"#f0f0f0"}}>
            <strong>#{eq.id}</strong> - {eq.name} (Owner: {eq.owner.slice(0,6)}...)
          </li>

        ))}

      </ul>

    </div>

  );

}

export default PassportView;