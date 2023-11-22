import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import img1 from "../../../staticImages/Home1.png";
import "./VoteResults.css"; // Import the corresponding CSS file

const candidates = [
    {
      id: 1,
      name: "John Doe",
      photoUrl: img1,
      votes: 1000,
    },
    {
      id: 2,
      name: "Jane Doe",
      photoUrl: img1,
      votes: 800,
    },
    {
      id: 3,
      name: "Peter Smith",
      photoUrl: img1,
      votes: 600,
    },
    {
      id: 4,
      name: "Mary Jones",
      photoUrl: img1,
      votes: 400,
    },
    {
      id: 5,
      name: "David Williams",
      photoUrl: img1,
      votes: 200,
    },
    {
      id: 6,
      name: "Emily Brown",
      photoUrl: img1,
      votes: 180,
    },
    {
      id: 7,
      name: "Michael Davis",
      photoUrl: img1,
      votes: 150,
    },
    {
      id: 8,
      name: "Sophia Miller",
      photoUrl: img1,
      votes: 120,
    },
    {
      id: 9,
      name: "Daniel Wilson",
      photoUrl: img1,
      votes: 90,
    },
    {
      id: 10,
      name: "Olivia Taylor",
      photoUrl: img1,
      votes: 50,
    },
  ];

const VoteResults = () => {
  // Sort the candidates by the number of votes
  const sortedCandidates = candidates.sort((a, b) => b.votes - a.votes);

  useEffect(() => {
    // Function to trigger confetti effect
    const triggerConfetti = () => {
      confetti({
        particleCount: 1500,
        spread: 100,
      });
    };

    // Trigger confetti effect when the component mounts
    triggerConfetti();
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  return (
    <div className="vote-results-container">
      {/* Top three podiums */}
      <div className="podium-row">
        {/* Second place */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="podium-image">
            <img
              src={sortedCandidates[1].photoUrl}
              alt={sortedCandidates[1].name}
              width="150"
              height="150"
              className="candidate-image"
            />
          </div>
          <div className="podium podium-second">
            <div className="podium-info text-center">
              <h2 className="text-2xl font-bold">{sortedCandidates[1].name}</h2>
              <p className="text-gray-500">{sortedCandidates[1].votes} votes</p>
            </div>
          </div>
        </div>

        {/* Winner */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="podium-image">
            <img
              src={sortedCandidates[0].photoUrl}
              alt={sortedCandidates[0].name}
              width="200"
              height="200"
              className="candidate-image"
            />
          </div>
          <div className="podium podium-winner">
            <div className="podium-info text-center">
              <h2 className="text-2xl font-bold">{sortedCandidates[0].name}</h2>
              <p className="text-gray-500">{sortedCandidates[0].votes} votes</p>
            </div>
          </div>
        </div>

        {/* Third place */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="podium-image">
            <img
              src={sortedCandidates[2].photoUrl}
              alt={sortedCandidates[2].name}
              width="100"
              height="100"
              className="candidate-image"
            />
          </div>
          <div className="podium podium-third">
            <div className="podium-info text-center">
              <h2 className="text-2xl font-bold">{sortedCandidates[2].name}</h2>
              <p className="text-gray-500">{sortedCandidates[2].votes} votes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Remaining candidates */}
      <ul className="podium-list">
        {sortedCandidates.slice(3).map((candidate, index) => (
          <li key={candidate.id} className="podium-item">
            <div className="podium-image">
              <img
                src={candidate.photoUrl}
                alt={candidate.name}
                width="100"
                height="100"
                className="candidate-image"
              />
            </div>
            <div className="podium-info text-center">
              <h3 className="text-xl font-bold">{candidate.name}</h3>
              <p className="text-gray-500">{candidate.votes} votes</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VoteResults;
