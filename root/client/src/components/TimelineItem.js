const TimelineItem = ({ data, keyValue, handleUpdate, handleDelete }) => {
  const formatedData = {
    shortDescription: data.shortDescription,
    largeDescription: data.largeDescription,
    date: data.date
  };

  const buttonStyling = "px-3 py-1.5 border mb-5 border-blue-500 bg-blue-500 text-white rounded";

  return (
    <>
      <li key={keyValue} className="mb-10 ml-6">
        <div className="z-0">
          <h3 className="text-lg font-bold mb-1">{formatedData.shortDescription}</h3>
          <p className="text-gray-500 text-sm mb-2">{new Date(formatedData.date).toLocaleString('es-CO', { timeZone: 'UTC' })}</p>
          <p className="text-gray-700">{formatedData.largeDescription}</p>
          <span className="circle" />
          <button className={buttonStyling} onClick={() => handleUpdate(data._id)}>Update</button>
          <button className={buttonStyling} onClick={() => handleDelete(data._id)}>Delete</button>
        </div>
      </li>
    </>
  );
}

export default TimelineItem;