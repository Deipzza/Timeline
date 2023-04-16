import React, { useState, useEffect } from 'react';

const ItemModal2 = ({ handleModal, buttonStyling, id }) => {
  const [largeDescription, setLargeDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [date, setDate] = useState("");

  const inputs = [
    {
      title: "Large description",
      render: <input className="input bg-gray-200 p-1" type="text" placeholder='Enter the large description'></input>
    },
    {
      title: "Short description",
      render: <input className="input bg-gray-200 p-1" type="text" placeholder='Enter the short description'></input>
    },
    {
      title: "Date",
      render: <input className="input bg-gray-200 p-1" type="date" placeholder='Enter the date'></input>
    },
  ];

  const cleanFormData = () => {
    setLargeDescription("");
    setShortDescription("");
    setDate("");
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
          date: date,
        }
      )
    };
    const response = await fetch("/api/skills", requestOptions);

    if(!response.ok) {
      
    } else {
      cleanFormData(); // Clean the form data
      handleModal(); // Close the modal window
    }
  }
  
  const handleUpdateItem = async (event) => {

  }

  // Helper function for getting the skill to update
  useEffect(() => {
    const getSkill = async () => {
      const requestOptions = {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      };

      const response = await fetch(`/api/skills/${id}`, requestOptions)

      if(!response.ok) {
        // Something went wrong
      } else {
        const data = await response.json();
        setLargeDescription(data.largeDescription);
        setShortDescription(data.shortDescription);
        setDate(data.date);
      }
    }

    if(id) {
      getSkill();
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
            {id ? (
              <button className={`${buttonStyling} `} onClick={handleUpdateItem}>Actualizar</button>
            ) : (
              <button className={`${buttonStyling} `} onClick={handleCreateItem}>Actualizar</button>
            )}
            <button className={buttonStyling} onClick={handleModal}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal2;