import React from "react";

const delhiMbaColleges = [
  {
    name: "Faculty of Management Studies (FMS), DU",
    location: "Delhi",
    fees: "₹2 Lakhs",
    exams: "CAT",
    ranking: 1,
  },
  {
    name: "Indian Institute of Foreign Trade (IIFT)",
    location: "Delhi",
    fees: "₹21 Lakhs",
    exams: "IIFT, CAT",
    ranking: 2,
  },
  {
    name: "International Management Institute (IMI)",
    location: "Delhi",
    fees: "₹19 Lakhs",
    exams: "CAT, XAT",
    ranking: 3,
  },
  {
    name: "Delhi School of Business",
    location: "Delhi",
    fees: "₹8 Lakhs",
    exams: "CAT, MAT, XAT",
    ranking: 4,
  }
];

const TopMbaDelhi = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Top MBA Colleges in Delhi</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {delhiMbaColleges.map((college, index) => (
          <div key={index} className="bg-white shadow-md rounded-xl p-4 border hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold mb-2">{college.name}</h2>
            <p><strong>Location:</strong> {college.location}</p>
            <p><strong>Fees:</strong> {college.fees}</p>
            <p><strong>Accepted Exams:</strong> {college.exams}</p>
            <p><strong>Ranking:</strong> #{college.ranking}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopMbaDelhi;
