import { useState, useEffect } from 'react'
import TimelineItem from './TimelineItem';
import ItemModal2 from './ItemModal2';
import { createPortal } from 'react-dom';

const Timeline = () => {
  const [id, setId] = useState(null);
  const [items, setItems] = useState(null);
  const [activeModal, setActiveModal] = useState(false);

  const handleModal = async () => {
    setActiveModal(!activeModal);
    await getItems();
    setId(null);
  }

  const handleUpdate = async (idd) => {
    setId(idd);
    console.log("id update: " + id);
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
      // Something went wrong
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

    } else {
      const data = await response.json();

      // Sort items by time ascending
      const sortedData = data.sort(
        (p1, p2) => (p1.time > p2.time) ? 1 : (p1.time < p2.time) ? -1 : 0);

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
            <ItemModal2
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
            
            <ul className="relative z-0 border-l-8 border-blue-500 ">
              {items.map((item) => (
                <TimelineItem 
                  data={item}
                  // id={item._id}
                  keyValue={item._id}
                  handleUpdate={handleUpdate}
                  handleDelete={handleDelete}
                />
                // <li key={item.id} className="mb-10 ml-6">
                //   <div className="z-0">
                //     <h3 className="text-lg font-bold mb-1">{item.shortDescription}</h3>
                //     <time className="text-gray-500 text-sm mb-2">{item.time}</time>
                //     <p className="text-gray-700">{item.largeDescription}</p>
                //     <span className="circle" />
                //     <button className={buttonStyling} onClick={() => handleUpdate(item._id)}>Update</button>
                //     <button className={buttonStyling} onClick={() => handleDelete(item._id)}>Delete</button>
                //   </div>
                // </li>
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