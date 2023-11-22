// VotingReview.js

import React,{useContext, useEffect} from 'react';
import './VotingReview.css';
import img1 from "../../../../staticImages/CandidateA.jpg"
import img2 from "../../../../staticImages/CandidateB.jpg"
import img3 from "../../../../staticImages/CandidateC.jpg"
import img4 from "../../../../staticImages/CandidateD.jpg"
import { useNavigate } from 'react-router-dom';
import {Context} from "../../../../utils/context"
import axios from 'axios';
const VotingReview = () => {
  const {vote_id,vote_setId}=useContext(Context)
  const navigate=useNavigate();
  const voteDetails = {
    name: 'General Election',
    startTime: '2023-01-01T10:30:00',
    endTime: '2023-01-31T18:45:30',
    voters: ['John Doe', 'Jane Smith', 'Bob Johnson'],
    question: 'Who should be the next president?',
    options: [
      { name: 'Candidate A', image:img1 },
      { name: 'Candidate B', image:img2 },
      { name: 'Candidate C', image: img3 },
      { name: 'Candidate D', image: img4 }
    ],
  };
useEffect(() => {
  console.log(vote_id)

  
}, [])

  const handleSubmit = () => {
    axios.post("https://backkk-2mdt.onrender.com/vote",vote_id)
    .then(result=>{console.log(result)})
    .catch(err=>console.log(err));
    // console.log('Form submitted!');
    // console.log("helllll")
    navigate("/history");
  };

  return (
    <div className="voting-review">
      <h1>Voting Review - {voteDetails.name}</h1>

      <div className="vote-details">
        <p>
          <strong>Start Time:</strong> {new Date(voteDetails.startTime).toLocaleString()}
        </p>
        <p>
          <strong>End Time:</strong> {new Date(voteDetails.endTime).toLocaleString()}
        </p>
      </div>

      <div className="voters-list">
        <h2>Voters:</h2>
        <ul>
          {voteDetails.voters.map((voter, index) => (
            <li key={index}>{voter}</li>
          ))}
        </ul>
      </div>

      <div className="question">
        <h2>Question:</h2>
        <p>{voteDetails.question}</p>
      </div>

      <div className="options">
        <h2>Options:</h2>
        <ul>
          {voteDetails.options.map((option, index) => (
            <li key={index}>
              <div className="candidate">
                <img src={option.image} alt={option.name} />
                <p>{option.name}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <button className="submit-button" onClick={handleSubmit}>
        Create Election
      </button>
    </div>
  );
};

export default VotingReview;
