import React, { useState, useEffect } from 'react';

const ItemModal2 = ({ handleModal, buttonStyling, id }) => {
  const [largeDescription, setLargeDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [time, setTime] = useState("");

  const inputs = [
    {
      title: "Large description",
      render: <input
        className="input bg-gray-200 p-1"
        type="text"
        placeholder='Enter the large description'
        value={largeDescription}
        onChange={(e) => setLargeDescription(e.target.value)}
      />
    },
    {
      title: "Short description",
      render: <input
        className="input bg-gray-200 p-1"
        type="text"
        placeholder='Enter the short description'
        value={shortDescription}
        onChange={(e) => setShortDescription(e.target.value)}
      />
    },
    {
      title: "Time",
      render: <input
        className="input bg-gray-200 p-1"
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
    },
  ];

  const cleanFormData = () => {
    setLargeDescription("");
    setShortDescription("");
    setTime("");
  }

  const handleCreateItem = async (event) => {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          largeDescription: largeDescription,
          shortDescription: shortDescription,
          time: time,
        }
      )
    };
    const response = await fetch("/api/items", requestOptions);

    if(!response.ok) {
      console.log("algo salio mal")
    } else {
      cleanFormData(); // Clean the form data
      handleModal(); // Close the modal window
    }
  }
  
  const handleUpdateItem = async (event) => {
    event.preventDefault();
    const requestOptions = {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          largeDescription: largeDescription,
          shortDescription: shortDescription,
          time: time,
        }
      )
    };
    const response = await fetch(`/api/items/${id}`, requestOptions);

    if(!response.ok) {
      // Something went wrong
    } else {
      cleanFormData(); // Clean the form data
      handleModal(); // Close the modal window
    }
  }

  // Helper function for getting the item to update
  useEffect(() => {
    const getItem = async () => {
      const requestOptions = {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      };

      const response = await fetch(`/api/items/${id}`, requestOptions)

      if(!response.ok) {
        // Something went wrong
      } else {
        const data = await response.json();
        setLargeDescription(data.largeDescription);
        setShortDescription(data.shortDescription);
        setTime(data.time);
      }
    }

    if(id) {
      console.log("id1: " + id);
      getItem();
    }
  }, [id])

  useEffect(() => {
    document.body.classList.add('overflow-hidden')

    return () => {document.body.classList.remove('overflow-hidden')}
  }, []);

  return (
    <div>
      <div onClick={handleModal} className="fixed inset-0 bg-gray-600 opacity-40" />
      
      <div className="fixed inset-40 p-5 bg-white rounded-lg">
        <div className='flex flex-col justify-between h-full'>
          <form>
            {inputs.map((input) => (
              <>
                <label className='px-8'>{input.title}</label>
                {input.render}
                <br /><br />
              </>
            ))}
          </form>

          <div className='flex items-center justify-between'>
            {console.log("id2: " + id)}
            {id ? (
              <button className={`${buttonStyling} `} onClick={handleUpdateItem}>Update</button>
            ) : (
              <button className={`${buttonStyling} `} onClick={handleCreateItem}>Create</button>
            )}
            <button className={buttonStyling} onClick={handleModal}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal2;