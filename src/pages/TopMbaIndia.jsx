import React from "react";

const topMbaColleges = [
  {
    name: "Indian Institute of Management Ahmedabad (IIMA)",
    location: "Ahmedabad, Gujarat",
    fees: "₹23 Lakhs",
    exams: "CAT",
    ranking: 1,
  },
  {
    name: "Indian Institute of Management Bangalore (IIMB)",
    location: "Bangalore, Karnataka",
    fees: "₹24 Lakhs",
    exams: "CAT",
    ranking: 2,
  },
  {
    name: "Indian Institute of Management Calcutta (IIMC)",
    location: "Kolkata, West Bengal",
    fees: "₹23 Lakhs",
    exams: "CAT",
    ranking: 3,
  },
  {
    name: "Indian School of Business (ISB)",
    location: "Hyderabad, Telangana",
    fees: "₹35 Lakhs",
    exams: "GMAT, GRE",
    ranking: 4,
  },
  {
    name: "Faculty of Management Studies (FMS), Delhi University",
    location: "New Delhi",
    fees: "₹2 Lakhs",
    exams: "CAT",
    ranking: 5,
  },
];

const TopMbaIndia = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Top MBA Colleges in India</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {topMbaColleges.map((college, index) => (
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

export default TopMbaIndia;
