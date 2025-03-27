const WeeklyTournament = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4 text-black">Weekly Tournament</h2>
      <p className="text-gray-600 mb-2">Vote for your favorite meals in our weekly tournament!</p>
      <button className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
        Join Tournament
      </button>
    </div>
  );
};

export default WeeklyTournament;