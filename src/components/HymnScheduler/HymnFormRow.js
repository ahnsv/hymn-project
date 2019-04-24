import React, { useState } from "react";

const HymnFormRow = ({ label, placeholder }) => {
  const [formData, setFormData] = useState("");
  return (
    <div className="hymn-form-row">
      <label>{label}</label>
      <input
        placeholder={placeholder}
        className="hymn-form-input"
        onChange={e => setFormData(e.target.value)}
      />
    </div>
  );
};

export default HymnFormRow;
