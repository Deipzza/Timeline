import React, { useState } from 'react';
import ItemModal2 from './ItemModal2';

const Header = ({ title }) => {
  const [activeModal, setActiveModal] = useState(false);

  const handleModal = () => {
    console.log("b4 " + activeModal);
    setActiveModal(!activeModal);
    console.log("af " + activeModal);
    activeModal ? console.log("activated") : console.log("deactivated");
  }

  const buttonStyling = "px-3 py-1.5 border mb-5 border-blue-500 bg-blue-500 text-white rounded";

  const actionBar = <div>
    <button className={buttonStyling} onClick={handleModal}>aaa</button>
  </div>

  const inputs = [
    {
      title: "Large description",
      render: <input className="input" type="text" placeholder='Enter the large description'></input>
    },
    {
      title: "Short description",
      render: <input className="input" type="text" placeholder='Enter the short description'></input>
    },
    {
      title: "Date",
      render: <input className="input" type="date" placeholder='Enter the date'></input>
    },
  ];

  const content = (
    <div>
      <ItemModal2 handleModal={handleModal} actionBar={actionBar} inputs={inputs} />
    </div>
  )
  
  console.log(activeModal);

  return (
    <>
      <div className="grid place-items-center">
        <h1 className="text-5xl m-10 font-bold">{title}</h1>
        <button onClick={handleModal} className={buttonStyling}>Add item</button>
      </div>
      {activeModal && content}
    </>
  );
}

export default Header;