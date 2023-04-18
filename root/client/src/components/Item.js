import React, { useState, useEffect } from 'react';
import Input from './Input';
import ListItems from './ListItems';

const Item = () => {
  const [largeDescription, setLargeDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [time, setTime] = useState("");
  const [items, ] = useState([]);

  const getItems = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch("/api", requestOptions);
    const data = await response.json();
  };

  useEffect(() => {
    getItems();
  }, []);

  const updateItem = async (id) => {
    const item = {
      largeDescription,
      shortDescription,
      time,
    };

    const requestOptions = {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item)
    };
    const response = await fetch(`/api/items/${id}`, requestOptions);
  };
  return (
    <div>
      <h1>My Timeline</h1>
      <Input getItems={getItems} />
      <ListItems items={items} updateItem={updateItem} />
    </div>
  );
}

export default Item;