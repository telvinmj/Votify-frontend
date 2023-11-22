import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TfiInfoAlt } from 'react-icons/tfi';
import './VoteHistory.css';

const electionData = [
  {
    id:6234,
    name: 'Election 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    startTime: '2023-10-16T17:30:00',
    endTime: '2023-11-16T16:34:00',
    completed:false,
    timeup:false,
  },
  {
    id:6355,
    name: 'Election 2',
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    startTime: '2023-10-18T08:00:00',
    endTime: '2023-11-16T17:44:00',
    completed:true,
    timeup:false,
  },
  {
    id:7365,
    name: 'Election 3',
    description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    startTime: '2023-11-20T12:15:00',
    endTime: '2023-11-21T22:30:00',
    completed:false,
    timeup:false,
  },
  {
    id:5344,
    name: 'Election 4',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    startTime: '2023-11-22T09:30:00',
    endTime: '2023-11-23T00:00:00',
    completed:true,
    timeup:false,
  },
  {
    id:3455,
    name: 'Election 5',
    description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    startTime: '2023-11-24T14:45:00',
    endTime: '2023-11-25T16:20:00',
    completed:false,
    timeup:false,
  },
];

const ElectionCard = ({ name, description, startTime, endTime,completed }) => {
  const navigate=useNavigate();
  const [isCountdownExpired, setCountdownExpired] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const calculateTimeRemaining = () => {
    const endTimeObj = new Date(endTime);
    const currentTime = new Date();
    const timeDiff = endTimeObj - currentTime;

    if (timeDiff <= 0) {
      setCountdownExpired(true);
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []); // Empty dependency array to run effect only once
  

useEffect(() => {
  const timer = setInterval(() => {
    for (var i = 0; i < electionData.length; i++) {
      const endTimeObj = new Date(electionData[i].endTime);
      const currentTime = new Date();
      const timeDiff = endTimeObj - currentTime;
      if (timeDiff <= 0) { electionData[i].timeup = true }
      console.log(electionData[i].timeup)
    }
  }, 1000);
  return () => clearInterval(timer);
}, []);

  return (
    <div className="election-card">
      <div className="left-section">
        <h2>{name}</h2>
        <p>{description}</p>
                <p className="datee" style={{ fontSize: '18px' }}>{`Started on: ${new Date(startTime).toLocaleString()}`}</p>
         <p className="datee" style={{ fontSize: '18px' }}>{`End Time: ${new Date(endTime).toLocaleString()}`}</p>
      </div>
      <div className="right-section">
        {!!isCountdownExpired && (
          <div className="countdown">
            <p style={{ fontSize: '30px', marginTop: '10px' }}>Time's Up</p>
          </div>
        )}
        {!isCountdownExpired && (
          <div className="countdown" style={{ marginTop: '30px' }}>
            <p style={{ fontSize: '20px' }}>Countdown Time</p>
            <div className="countdown-timer">
              {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s
            </div>
          </div>
        )}
        <div className="buttons">
          
          {!completed&&<button
            className="vote-button"
            disabled={isCountdownExpired}
            style={{ backgroundColor: isCountdownExpired ? 'grey' : '#9333EA' }}
            onClick={()=>{navigate("/uservote")}}
          >
            Poll Now
          </button>}
          {!!completed&&<button
            className="vote-button"
            disabled={isCountdownExpired}
            style={{ backgroundColor: isCountdownExpired ? 'grey' : '#9333EA' }}
          >
            Submitted
          </button>}

          <button className="submit-button" disabled={!isCountdownExpired}
            style={{ backgroundColor: !isCountdownExpired ? 'grey' : '#9333EA' }} onClick={()=>{navigate("/voteresults")}}>View Results</button>
        </div>
      </div>
    </div>
  );
};

const PollHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleStatusChange = (event) => {
    const value = event.target.value;
    setStatusFilter(value === "" ? "" : value === "true");
  };
  const handleTimeChange = (event) => {
    const value = event.target.value;
    setTimeFilter(value === "" ? "" : value === "true");
  };

  const [statusFilter, setStatusFilter] = useState('');
  const [timeFilter, setTimeFilter] = useState('');
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredElections = electionData
    .filter((election) => election.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((election) => timeFilter === '' || Boolean(timeFilter) === election.timeup)
    .filter((election) => statusFilter === '' || Boolean(statusFilter) === election.completed)
    

  return (
    <div className="pollhistory-main">
      <div style={{ marginLeft: '6%', marginTop: '20px', display: 'flex', flexDirection: 'row' }}>
        <TfiInfoAlt style={{ display: 'inline', margin: '10px', color: 'red', marginTop: "2px" }} size={20} />
        <h4 style={{ display: 'inline' }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum esse modi necessitatibus laborum aliquam impedit, atque animi maxime ad cumque Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia, quo..</h4>
      </div>
      <div style={{display:'flex',width:"80vw",marginTop:"50px",marginBottom:'50px',marginLeft:'20vw',justifyContent:'flex-start'}}>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by election name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className='sen'
        />
      </div>
      <div style={{ display: 'inline', marginLeft: '50px' }}>
            <div class="custom-select">
              <select value={statusFilter} onChange={handleStatusChange} className='sen'>
                <option value="">All</option>
                <option value={true}>Completed</option>
                <option value={false}>Not Completed</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'inline', marginLeft: '50px' }}>
            <div class="custom-select">
              <select value={timeFilter} onChange={handleTimeChange} className='sen'>
                <option value="">All</option>
                <option value={false}>Time is there</option>
                <option value={true}>Time's up</option>
              </select>
            </div>
          </div>
      </div>
      
      


      {filteredElections.map((election) => (
        <ElectionCard
          key={election.id}
          name={election.name}
          description={election.description}
          startTime={election.startTime}
          endTime={election.endTime}
          completed={election.completed}
        />
      ))}
    </div>
  );
};

export default PollHistory;
