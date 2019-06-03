import React from 'react'
import "./styles/HymnInput.scss"

const HymnInputWithLabel = ({ label, placeholder, id, classProp }) => {
  return (
    <div className={`hymn-input-with-label`}>
      <label className={`hymn-input--label`} htmlFor={id}>{label}</label>
      <input type={`text`} placeholder={placeholder} id={id} className={`hymn-input--input ${classProp}`}/>
    </div>
  );
};

export {
  HymnInputWithLabel
}
