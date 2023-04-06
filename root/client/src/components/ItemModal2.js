import React, { useState, useEffect } from 'react';

const ItemModal2 = ({ handleModal, actionBar, inputs }) => {
  // const [largeDescription, setLargeDescription] = useState("");
  // const [shortDescription, setShortDescription] = useState("");
  // const [date, setDate] = useState("");

  // const largeDescription = document.querySelector('input[name="largeDescription"]');
  // const shortDescription = document.querySelector('input[name="shortDescription"]');
  // const date = document.querySelector('input[name="date"]');

  // const renderedData = inputs.map((element) => (
  //   <div key={element.title}>
  //     <label>{element.title}</label>
  //     {element.render}
  //   </div>
  // ));
  useEffect(() => {
    document.body.classList.add('overflow-hidden')

    return () => {
        document.body.classList.remove('overflow-hidden');
    }
}, []);

  return (
    <div className='z-50'>
      <div onClick={handleModal} className="fixed inset-0 bg-gray-300 opacity-10" />
      <div className="fixed inset-40 p-10 bg-white">
        <div className='flex flex-col justify-between h-full'>
          <form>
            {/* {renderedData} */}
            {inputs.map((input) => (
              <>
                <label>{input.title}</label>
                {input.render}
              </>
            ))}
          </form>
          <div className='flex justify-end'>
            {actionBar}
          </div>

        </div>

      </div>
    </div>
  );
}

export default ItemModal2;