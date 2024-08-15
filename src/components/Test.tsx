"use client";

import { useState } from "react";

const Test = () => {
  const [name, setName] = useState({
    ho: "nguyen",
    ten: "nhi",
    tuoi: 26
  });
  console.log(name);

  const setNamee = () => {
    setName((prev) => {
      console.log("👙 🏊‍♀️  🏄‍♀️ 🌴 🌊  ~ prev:", prev);
      return ({ ...prev, ho: "huỳnh" });
    });
  };

  return (
    <div className=''>
      <button onClick={setNamee} >Test</button>
    </div>
  );
};

export default Test;