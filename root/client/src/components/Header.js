import React, { useState } from 'react';
import ItemModal from './ItemModal';

const Header = ({ title }) => {
  const [activeModal, setActiveModal] = useState(false);

  const handleModal = () => {
    setActiveModal(true);
    console.log("activated");
  }

  return (
    <div>
      <h1>{title}</h1>
      <button onClick={handleModal}>Add item</button>
      <ItemModal active={activeModal} handleModal={handleModal} />
    </div>
  );
}

export default Header;