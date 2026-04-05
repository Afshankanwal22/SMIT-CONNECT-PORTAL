// import * as XLSX from "xlsx";
import { Link, useNavigate } from "react-router-dom";

import {supabase} from '../lib/supabase'; // ✅ correct now

export default function UploadStudents() {
  const handleFile = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onload = async (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet);

      // Insert into DB
      await supabase.from("students").insert(json);

      alert("Students Uploaded!");
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="my-4">
      <input type="file" onChange={handleFile} />
    </div>
  );
}