import React, { useState } from 'react';
// import axios from 'axios';

const Input = ({ getItems }) => {
  const [largeDescription, setLargeDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [date, setDate] = useState("");
  
  const addItem = async () => {
    const item = {
      largeDescription,
      shortDescription,
      date,
    };

    if (
      (item.largeDescription && item.largeDescription.length > 0)
      && (item.shortDescription && item.shortDescription.length > 0)
    ) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
      };
  
      const response = await fetch("/api/items", requestOptions);
      await response.json();
    } else {
      console.log('Input fields required');
    }
  };

  return (
    <div>
      <h1>Add Item to Timeline</h1>
        <div>
          <label>Large description</label>
          <div>
            <input 
              type='text'
              placeholder='Enter the large description'
              value={largeDescription}
              onChange={(e) => setLargeDescription(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label>Short description</label>
          <div>
            <input 
              type='text'
              placeholder='Enter the short description'
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="input"
            />
          </div>
        </div>

        <div>
          <label>Date</label>
          <div>
            <input 
              type='date'
              placeholder='Enter the date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input"
            />
          </div>
        </div>

      <button onClick={addItem}>Add Item!</button>
    </div>
  );
}

export default Input;