import React from 'react';

const ListItems = ({ items, updateItem }) => {
  return (
    <>
      {items && items.length > 0 ? (
        items.map((item) => {
          return (
            <ul>
              <li key={item._id} onClick={() => updateItem(item._id)}>
                <h3>{item.largeDescription}</h3>
                <p>{item.shortDescription}</p>
                <p>{item.time}</p>
              </li>
            </ul>
          );
        })
      ) : (
        <p>You have no items on your timeline. Add one!</p>
        )}
    </>
  );
};
export default ListItems;