import { useState } from "react";
import { getContract } from "../hooks/useContract";

function MaintenanceHistory() {

  const [equipmentId, setEquipmentId] = useState("");
  const [maintenances, setMaintenances] = useState([]);

  const loadHistory = async () => {

    try {

      if (!equipmentId) {
        alert("Please enter Equipment ID");
        return;
      }

      const contract = await getContract();

      const count = await contract.getMaintenanceCount(equipmentId);

      let list = [];

      for (let i = 0; i < Number(count); i++) {

        const m = await contract.getMaintenance(equipmentId, i);

        list.push({
          description: m.description,
          timestamp: Number(m.timestamp),
          technician: m.technician
        });

      }

      setMaintenances(list);

    } catch (error) {

      console.error(error);
      alert("Error loading history");

    }

  };

  return (

    <div>

      <h2>Maintenance History</h2>

      <input
        placeholder="Equipment ID"
        value={equipmentId}
        onChange={(e) => setEquipmentId(e.target.value)}
      />

      <br /><br />

      <button onClick={loadHistory}>
        Load History
      </button>

      <ul>

        {maintenances.map((m, index) => (

          <li key={index}>
            {m.description} - {new Date(m.timestamp * 1000).toLocaleString()} - Technician: {m.technician}
          </li>

        ))}

      </ul>

    </div>

  );

}

export default MaintenanceHistory;