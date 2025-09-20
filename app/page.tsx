'use client';
import React, { useState } from "react";
import data from "@/dataset/food.json";

const foodArray = Array.isArray(data) ? data : Object.values(data);

// Extract unique age groups for filter options
const ageGroups = Array.from(new Set(foodArray.map((item: any) => item.age_group)));

const Home = () => {
  const [selectedAge, setSelectedAge] = useState<string>("All");
  const [search, setSearch] = useState<string>("");

  // Filter logic
  const filteredFoods = foodArray.filter((item: any) => {
    const matchesAge = selectedAge === "All" || item.age_group === selectedAge;
    const matchesSearch =
      item.food_name.toLowerCase().includes(search.toLowerCase()) ||
      (item.nutrients &&
        Object.keys(item.nutrients)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase()));
    return matchesAge && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-green-400">
        Baby Food Recommendations
      </h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center items-center">
        <div>
          <label className="text-gray-300 mr-2 font-medium">Filter by Age Group:</label>
          <select
            value={selectedAge}
            onChange={(e) => setSelectedAge(e.target.value)}
            className="bg-gray-800 text-green-300 border border-gray-700 rounded px-3 py-2"
          >
            <option value="All">All</option>
            {ageGroups.map((age) => (
              <option key={age} value={age}>
                {age}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-gray-300 mr-2 font-medium">Search:</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Food name or nutrient"
            className="bg-gray-800 text-green-300 border border-gray-700 rounded px-3 py-2"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFoods.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 text-lg">
            No foods match your filters.
          </div>
        ) : (
          filteredFoods.map((item: any) => (
            <div
              key={item.id}
              className="bg-gray-800 rounded-xl shadow-md p-6 flex flex-col gap-3 border border-gray-700"
            >
              <h2 className="text-xl font-semibold text-green-300 mb-2">
                {item.food_name}
              </h2>
              <div>
                <span className="font-medium text-gray-300">Nutrients:</span>
                <ul className="list-disc list-inside ml-4 text-gray-400">
                  {Object.entries(item.nutrients).map(([key, value]) => (
                    <li key={key}>
                      <span className="font-semibold text-green-200">{key}</span>:{" "}
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-1 mt-2 text-sm text-gray-300">
                <span>
                  <span className="font-medium">Quantity Recommended:</span>{" "}
                  {item.quantity_recommendation}
                </span>
                <span>
                  <span className="font-medium">Age Group:</span> {item.age_group}
                </span>
                <span>
                  <span className="font-medium">Quantity Serve:</span> {item.quality}
                </span>
                <span>
                  <span className="font-medium">Nutrition Value:</span>{" "}
                  {item.nutritional_value}
                </span>
                {item.notes && (
                  <span className="italic text-gray-400">
                    <span className="font-medium not-italic text-green-200">
                      Notes:
                    </span>{" "}
                    {item.notes}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
