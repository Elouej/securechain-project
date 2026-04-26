import { useState } from "react";
import { getContract } from "../hooks/useContract";

function UploadIPFS(){

  const [file,setFile] = useState(null);
  const [equipmentId,setEquipmentId] = useState("");

  const uploadFile = async () => {

    if(!file){
      alert("Select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file",file);

    try{

      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method:"POST",
          headers:{
            Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyNTgwYjZlYS1kNjlmLTQ4ODItOWI2Mi02YzNkZjc0MmMxMDQiLCJlbWFpbCI6ImFjaHJhZi5lbG91ZWpAc2VzYW1lLmNvbS50biIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJhNDMwMjYxMmMzYjk0YmY1NGY5MCIsInNjb3BlZEtleVNlY3JldCI6ImFmMzcxYTg2NjYxZjM0YTQ1MjNhNTNkY2I1NTU1ODYyMGYzMzNiOTMyODQxOWVhNDU5NzgyYTA2OGRlN2M2NWQiLCJleHAiOjE4MDY3NTg5OTN9.P9dNQEGs8cCINZrM08rk5N02txtB9qymMiVCHmOj5TQ"
          },
          body:formData
        }
      );

      const data = await res.json();

      const ipfsHash = data.IpfsHash;

      // 🔗 connexion au smart contract
      const contract = await getContract();

      const tx = await contract.addDocument(equipmentId, ipfsHash);

      await tx.wait();

      alert("File linked to equipment : " + ipfsHash);

    }catch(error){

      console.error(error);
      alert("Upload failed");

    }

  };

  return(

    <div>

      <h2>Upload Document (IPFS)</h2>

      <input
      placeholder="Equipment ID"
      onChange={(e)=>setEquipmentId(e.target.value)}
      />

      <br/><br/>

      <input
        type="file"
        onChange={(e)=>setFile(e.target.files[0])}
      />

      <br/><br/>

      <button onClick={uploadFile}>
        Upload File
      </button>

    </div>

  );

}

export default UploadIPFS;