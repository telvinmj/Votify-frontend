import React, { useState, useEffect ,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';
import { AiOutlineEye } from 'react-icons/ai';
import { MdDeleteOutline } from 'react-icons/md';
import { TfiInfoAlt } from 'react-icons/tfi';
import {Context} from "../../../utils/context"
import './PollHistory.css';
import axios from 'axios';

const TableHeader = ({ headers, changeSort, pagination }) => (
  <thead>
    <tr>
      {headers.map((header) => (
        <th key={header.value} onClick={() => changeSort(header.value)}>
          {header.text}
          {pagination.sortBy !== header.value && (
            <span className='iconn'>{<FaAngleDown style={{ display: 'inline' }} />}</span>
          )}
          {pagination.sortBy === header.value && (
            <span className='iconn'>
              {pagination.descending ? (
                <FaAngleDown style={{ display: 'inline' }} />
              ) : (
                <FaAngleUp style={{ display: 'inline' }} />
              )}
            </span>
          )}
        </th>
      ))}
    </tr>
  </thead>
);

const Checkview = ({ id, handleDelete }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/read/${id}`);
  };

  return (
    <div style={{display:'flex'}}>
      <div
        style={{
          backgroundColor: '#2563eb',
          color: 'white',
          padding: '5px',
          margin: '5px',
          width: '30px',
          borderRadius: '8px',
        }}
        onClick={handleClick}
      >
        <AiOutlineEye size={20} />
      </div>
      <div
        style={{
          backgroundColor: 'red',
          color: 'white',
          padding: '5px',
          margin: '5px',
          width: '30px',
          display: 'flex',
          justifyContent: 'center',
          borderRadius: '8px',
        }}
        onClick={() => handleDelete(id)}
      >
        <MdDeleteOutline size={20} />
      </div>
    </div>
  );
};

const TableRow = ({ dessert, handleDelete }) => (
  <tr key={dessert._id}>
    <td>
      <div className={dessert.status === 'Active' ? 'status-active' : 'status-inactive'} name='a'>
        {dessert.status}
      </div>
    </td>
    <td>
      <div className={dessert.type === 'Poll' ? 'type-poll' : 'type-vote'} name='a'>
        {dessert.type}
      </div>
    </td>
    <td style={{ textAlign: 'center' }}>{dessert._id}</td>
    <td>{dessert.title}</td>
    <td>
      <div>{new Date(dessert.starttime).toLocaleDateString()}</div>
      <div>{new Date(dessert.starttime).toLocaleTimeString()}</div>
    </td>
    <td>
      <div>{new Date(dessert.endtime).toLocaleDateString()}</div>
      <div>{new Date(dessert.endtime).toLocaleTimeString()}</div>
    </td>
    <td>{dessert.questions.length}</td>
    <td>
      <Checkview id={dessert._id} handleDelete={handleDelete} />
    </td>
  </tr>
);

const Table = ({ headers, desserts, pagination, changeSort, handleDelete }) => (
  <table>
    <TableHeader headers={headers} changeSort={changeSort} pagination={pagination} />
    <tbody>
      {desserts.map((dessert) => (
        <TableRow key={dessert._id} dessert={dessert} handleDelete={handleDelete} />
      ))}
    </tbody>
  </table>
);

const DessertTable = () => {
  const {user,setUser}=useContext(Context)
  console.log(user);
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get('https://backkk-2mdt.onrender.com/3001/getuser');
  
        if (response.status === 200) {
          setUser(response.data.user.email);
          console.log("setting");
          console.log(response.data.user.email);
          console.log(user); // This may not reflect the updated value immediately
        } else {
          console.log('Failed to get user.');
        }
      } catch (error) {
        console.error('Get user error:', error);
      }
    };
  
    getUser(); // Call the getUser function
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 
  useEffect(() => {
    axios.get("https://backkk-2mdt.onrender.com/3001/polls")
      .then((res) => {
        setDesserts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();
  const [pagination, setPagination] = useState({ sortBy: '_id', descending: false });
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const headers = [
    { text: 'Status', align: 'left', value: 'status' },
    { text: 'Type', align: 'left', value: 'type' },
    { text: 'ElectionID', value: '_id' },
    { text: 'Election Name', value: 'title' },
    { text: 'Start Date', value: 'starttime' },
    { text: 'End Date', value: 'endtime' },
    { text: 'Questions', value: 'questions' },
    { text: 'Action', value: 'action' },
  ];

  const [desserts, setDesserts] = useState([
    {
      type: 'Poll',
      _id: 1,
      title: 'General Election',
      starttime: new Date('2023-01-01T10:30:00'),
      endtime: new Date('2023-01-31T18:45:30'),
      questions: 98,
    },
    {
      type: 'Vote',
      _id: 2,
      title: 'Local Election',
      starttime: new Date('2023-02-01T15:20:45'),
      endtime: new Date('2023-02-28T12:10:15'),
      questions: 21,
    },
    {
      type: 'Poll',
      _id: 3,
      title: 'Presidential Election',
      starttime: new Date('2023-03-01T00:00:00'),
      endtime: new Date('2024-03-31T17:45:31'),
      questions: 33,
    },
  ]);

  const calculateStatus = (endtime) => {
    const currentTime = new Date();
    const end = new Date(endtime);
    return end > currentTime ? 'Active' : 'Finished';
  };

  const changeSort = (column) => {
    setPagination((prevPagination) => ({
      sortBy: column,
      descending: column === prevPagination.sortBy ? !prevPagination.descending : false,
    }));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleTypeChange = (event) => {
    setTypeFilter(event.target.value);
  };

  const handleDelete = (id) => {
    console.log(id);
    axios.delete(`https://backkk-2mdt.onrender.com/3001/polls/${id}`)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const filteredDesserts = desserts
    .filter((d) => d.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((d) => typeFilter === '' || d.type === typeFilter)
    .filter((d) => statusFilter === '' || calculateStatus(d.endtime) === statusFilter)
    .map((d) => ({ ...d, status: calculateStatus(d.endtime) }));

  const sortedDesserts = filteredDesserts.sort((a, b) => {
    const valueA = a[pagination.sortBy];
    const valueB = b[pagination.sortBy];

    if (pagination.sortBy === '_id') {
      return pagination.descending ? valueB - valueA : valueA - valueB;
    } else if (typeof valueA === 'string' && typeof valueB === 'string') {
      return pagination.descending ? valueB.localeCompare(valueA) : valueA.localeCompare(valueB);
    } else {
      return pagination.descending ? valueB - valueA : valueA - valueB;
    }
  });

  return (
    <div id="app">
      {!user&&(<div style={{textAlign:'center',fontSize:'60px',margin:'30px'}}>Login to continue</div>)}
      {!!user&&(<div>
      <div style={{ marginLeft: '6%', marginTop: '20px', display: 'flex', flexDirection: 'row' }}>
        <TfiInfoAlt style={{ display: 'inline', margin: '10px', color: 'red', marginTop: "2px" }} size={20} />
        <h4 style={{ display: 'inline' }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum esse modi necessitatibus laborum aliquam impedit, atque animi maxime ad cumque Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia, quo..</h4>
      </div>
      <div style={{ margin: 'auto', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '90%', marginTop: '50px' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'inline', borderRadius: '10px' }}>
            <input
              type="text"
              placeholder="Search by Election Name"
              value={searchTerm}
              onChange={handleSearchChange}
              className='sen'
            />
          </div>
          <div style={{ display: 'inline', marginLeft: '50px' }}>
            <div className="custom-select">
              <select value={statusFilter} onChange={handleStatusChange} className='sen'>
                <option value="">All</option>
                <option value="Active">Active</option>
                <option value="Finished">Finished</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'inline', marginLeft: '50px' }}>
            <div className="custom-select">
              <select value={typeFilter} onChange={handleTypeChange} className='sen'>
                <option value="">All</option>
                <option value="Vote">Vote</option>
                <option value="Poll">Poll</option>
              </select>
            </div>
          </div>
        </div>
        <div className="create-poll-div">
          <button className="arrow-button" onClick={() => { navigate('/polldetails') }}>Create New Poll<span className="arrow"></span></button>
        </div>
      </div>
      <div id="inspire">
        <Table headers={headers} desserts={sortedDesserts} pagination={pagination} changeSort={changeSort} handleDelete={handleDelete} />
      </div>
      </div>)}
    </div>
  );
};

export default DessertTable;
