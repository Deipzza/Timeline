import React, { useState, useEffect } from 'react';

const ItemModal = ({ handleModal, buttonStyling, id }) => {
  const [largeDescription, setLargeDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [date, setDate] = useState("");
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
      title: "Date",
      render: <input
        className="input bg-gray-200 p-1"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
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

  // Resets the inputs when the modal/form is closed or sent.
  const cleanFormData = () => {
    setLargeDescription("");
    setShortDescription("");
    setDate("");
    setTime("");
  }

  const handleCreateItem = async (event) => {
    event.preventDefault();

    if (
      (largeDescription && largeDescription.length > 0)
      && (shortDescription && shortDescription.length > 0)
      && (date && date.length > 0)
      && (time && time.length > 0)
    ) {
      const requestOptions = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
          {
            largeDescription: largeDescription,
            shortDescription: shortDescription,
            date: parseDateTime(date, time),
          }
        )
      };
      const response = await fetch("/api/items", requestOptions);
  
      if(!response.ok) {
        console.log("Something went wrong with the creation")
      } else {
        cleanFormData(); // Clean the form data
        handleModal(); // Close the modal window
      }
    } else {
      alert("Some input fields are empty");
    }
  }
  
  const handleUpdateItem = async (event) => {
    event.preventDefault();

    if (
      (largeDescription && largeDescription.length > 0)
      && (shortDescription && shortDescription.length > 0)
      && (date && date.length > 0)
      && (time && time.length > 0)
    ) {
      const requestOptions = {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
          {
            largeDescription: largeDescription,
            shortDescription: shortDescription,
            date: parseDateTime(date, time),
          }
        )
      };
      const response = await fetch(`/api/items/${id}`, requestOptions);
  
      if(!response.ok) {
        alert("Something went wrong with the update");
      } else {
        cleanFormData(); // Clean the form data
        handleModal(); // Close the modal window
      }
    } else {
      alert("Some input fields are empty");
    }
  }

  // Format date.
  const parseDateTime = (date, time) => {
    let newDate = new Date(date + "T" + time + ":00.000Z");
    return newDate.toLocaleString();
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
        console.log("Something went wrong getting the item");
      } else {
        const data = await response.json();
        setLargeDescription(data.largeDescription);
        setShortDescription(data.shortDescription);
        setDate(data.date.split('T')[0].toLocaleString());
        const hour = data.date.split('T')[1].split('.')[0].slice(0, -3).toString();
        setTime(hour);
      }
    }

    // Checks if it's an updating item.
    if(id) {
      getItem();
    }
  }, [id])

  // Disable scrolling when modal is opened.
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

export default ItemModal;