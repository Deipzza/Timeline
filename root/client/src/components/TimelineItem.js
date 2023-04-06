const TimelineItem = ({ data, key }) => {
  const formatedData = {
    shortDescription: data.shortDescription,
    largeDescription: data.largeDescription,
    date: new Date(data.date).toLocaleString(),
  };

  return (
    <div>
      <ol className="relative border-l border-gray-200 dark:border-gray-700">
        <li key={key} className="mb-10 ml-6">
          <h3 className="flex items-center z-0 mb-1 text-lg font-semibold text-gray-900 dark:text-white">{formatedData.shortDescription}</h3>
          <time className="block z-0 mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{formatedData.date.toLocaleString()}</time>
          <p className="z-0">{formatedData.largeDescription}</p>
          
          <span className="circle" />
        </li>
      </ol>
    </div>
  );
}

export default TimelineItem;