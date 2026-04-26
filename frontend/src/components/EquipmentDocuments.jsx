import { useState } from "react";
import { getContract } from "../hooks/useContract";

function EquipmentDocuments(){

  const [equipmentId,setEquipmentId] = useState("");
  const [documents,setDocuments] = useState([]);

  const loadDocuments = async () => {

    try{

      const contract = await getContract();

      const count = await contract.getDocumentCount(equipmentId);

      let list = [];

      for(let i=0;i<count;i++){

        const doc = await contract.getDocument(equipmentId,i);

        const hash = doc.ipfsHash;

        const url = "https://gateway.pinata.cloud/ipfs/" + hash;

        list.push(url);

      }

      setDocuments(list);

    }catch(error){

      console.error(error);
      alert(error.message);

    }

  };

  return(

    <div>

      <h2>Equipment Documents</h2>

      <input
      placeholder="Equipment ID"
      onChange={(e)=>setEquipmentId(e.target.value)}
      />

      <br/><br/>

      <button onClick={loadDocuments}>
        Load Documents
      </button>

      <ul>

      {documents.map((url,index)=>(
        <li key={index}>
          <a href={url} target="_blank">
            Open Document {index+1}
          </a>
        </li>
      ))}

      </ul>

    </div>

  );

}

export default EquipmentDocuments;