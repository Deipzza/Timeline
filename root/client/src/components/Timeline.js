import { useState, useEffect } from 'react'
import TimelineItem from './TimelineItem';
import ItemModal from './ItemModal';
import { createPortal } from 'react-dom';

const Timeline = () => {
  const [id, setId] = useState(null);
  const [items, setItems] = useState(null);
  const [activeModal, setActiveModal] = useState(false);

  // Activates and deactivates the modal.
  const handleModal = async () => {
    setActiveModal(!activeModal);
    await getItems();
    setId(null);
  }

  const handleUpdate = async (id) => {
    setId(id);
    setActiveModal(true);
  }

  const handleDelete = async (id) => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      }
    };

    const response = await fetch(`/api/items/${id}`, requestOptions);

    if(!response.ok) {
      console.log("Something went wrong with the delete");
    } else {
      await getItems();
    }
  };

  const getItems = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch("/api/items", requestOptions);
    
    if(!response.ok) {
      console.log("Something went wrong with the creation");
    } else {
      const data = await response.json();

      // Sort items by date ascending.
      const sortedData = data.sort(
        (p1, p2) => (p1.date > p2.date) ? 1 : (p1.date < p2.date) ? -1 : 0
      );

      setItems(sortedData);
    }
  };

  const buttonStyling = "px-3 py-1.5 border border-blue-500 bg-blue-500 text-white rounded";

  useEffect(() => {
    getItems(); // Initialize the items in the timeline
  }, []);

  return (
    <div>
      <div className='add-item flex justify-center'>
        <button onClick={handleModal} className={`${buttonStyling} mb-5`}>Add item</button>
      </div>

      {createPortal(
        <div>
          {activeModal && (
            <ItemModal
              handleModal={handleModal}
              buttonStyling={buttonStyling}
              id={id}
            />
          )}
        </div>,
        document.body
      )}

      <div className='timeline-items'>
        {items?.length > 0 ? (
          <div className='mx-10 z-0'>
            
            <ul className="relative z-0 border-l-4 border-gray-500 ">
              {items.map((item) => (
                <TimelineItem 
                  data={item}
                  keyValue={item._id}
                  handleUpdate={handleUpdate}
                  handleDelete={handleDelete}
                />
              ))}
            </ul>
          </div>
          ) : (
          <p className='mb-10 ml-6'>You don't have items yet. Add one!</p>
        )}
      </div>
    </div>
  );
}

export default Timeline;