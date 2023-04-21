const TimelineItem = ({ data, keyValue, handleUpdate, handleDelete }) => {
  const formatedData = {
    shortDescription: data.shortDescription,
    largeDescription: data.largeDescription,
    date: data.date
  };

  return (
    <>
      <li key={keyValue} className="mb-10 ml-6">
        <div className="z-0">
          <h3 className="text-lg font-bold mb-1">{formatedData.shortDescription}</h3>
          <p className="text-gray-500 text-sm mb-2">{new Date(formatedData.date.slice(0, -5)).toLocaleString('es-CO')}</p>
          <p className="text-gray-700">{formatedData.largeDescription}</p>
          <span className="circle" />
          <button className="px-3 py-1.5 border border-blue-500 bg-blue-500 text-white rounded" onClick={() => handleUpdate(data._id)}>Update</button>
          <button className="px-3 py-1.5 border ml-2 border-blue-500 bg-blue-500 text-white rounded" onClick={() => handleDelete(data._id)}>Delete</button>
        </div>
      </li>
    </>
  );
}

export default TimelineItem;