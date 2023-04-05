import React from 'react';

const ListItems = ({ items, updateItem }) => {
  return (
    <ul>
      {items && items.length > 0 ? (
        items.map((item) => {
          return (
            <li key={item._id} onClick={() => updateItem(item._id)}>
              <h3>{item.largeDescription}</h3>
              <p>{item.shortDescription}</p>
              <p>{item.date}</p>
            </li>
          );
        })
      ) : (
        <li>You have no items</li>
      )}
    </ul>
  );
};
export default ListItems;