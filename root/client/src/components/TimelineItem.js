const TimelineItem = ({ data, keyValue }) => {
  const formatedData = {
    shortDescription: data.shortDescription,
    largeDescription: data.largeDescription,
    date: new Date(data.date).toLocaleString(),
  };

  const buttonStyling = "px-3 py-1.5 border mb-5 border-blue-500 bg-blue-500 text-white rounded";

  return (
    <>
      <li key={keyValue} className="mb-10 ml-6">
        <div className="z-0">
          <h3 className="text-lg font-bold mb-1">{formatedData.shortDescription}</h3>
          <time className="text-gray-500 text-sm mb-2">{formatedData.date.toLocaleString()}</time>
          <p className="text-gray-700">{formatedData.largeDescription}</p>
          <span className="circle" />
          <button className={buttonStyling}>Actualizar</button>
        </div>
      </li>
    </>
  );
}

export default TimelineItem;