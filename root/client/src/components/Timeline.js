import { useState, useEffect } from 'react'
import TimelineItem from './TimelineItem';

const Timeline = () => {
  const [items, setItems] = useState(null);

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

      // Sort items by date ascending
      const sortedData = data.sort(
        (p1, p2) => (p1.date > p2.date) ? 1 : (p1.date < p2.date) ? -1 : 0);

      setItems(sortedData);
    }
  };

  useEffect(() => {
    getItems(); // Initialize the items in the timeline
  }, []);

  return (
    <>
      {items ? (
        (<div className='mx-10'>
          {items.map((item, idx) => (
            <TimelineItem data={item} key={idx} />
          ))}
        </div>
        )) : (
        <p>You don't have items yet. Add one!</p>
      )}
    </>
  );
}

export default Timeline;