import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSortUp, FaSortDown, FaEdit, FaTrash } from 'react-icons/fa';
import { toast, Toaster } from 'react-hot-toast';
import './FootballerTable.css';
import { useUser } from '../UserContext'; // Import useUser

const FootballerTable = () => {
    const { user } = useUser(); // Get the logged-in user
    const [footballers, setFootballers] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'Surname', direction: 'ascending' });
    const [searchQuery, setSearchQuery] = useState('');
    const [newFootballer, setNewFootballer] = useState({
        Surname: '',
        Age: '',
        Position: '',
        Club: '',
        Goals: '',
        Assists: '',
        Height: ''
    });
    const [showForm, setShowForm] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentFootballerId, setCurrentFootballerId] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/api/footballers')
            .then(response => {
                setFootballers(response.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const sortedFootballers = [...footballers].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1; //rosnąco, potem malejąco
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    //przy kliknieciu na gorze tabeli
    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const filteredFootballers = sortedFootballers.filter(footballer => footballer.Surname?.toLowerCase().includes(searchQuery.toLowerCase()));

    const handleAddFootballer = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/footballers/add', {
                ...newFootballer,
                createdBy: user.username // Use the logged-in user's username
            });
            if (response.status === 201) {
                setFootballers([...footballers, response.data]);
                toast.success('Footballer added successfully');
                setShowForm(false);
                setNewFootballer({
                    Surname: '',
                    Age: '',
                    Position: '',
                    Club: '',
                    Goals: '',
                    Assists: '',
                    Height: ''
                });
            } else {
                toast.error('Error adding footballer');
            }
        } catch (error) {
            toast.error('Error adding footballer');
        }
    };

    const handleEditFootballer = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8000/api/footballers/${currentFootballerId}`, {
                ...newFootballer,
                createdBy: user.username // bardzo istotny ellement
            });
            if (response.status === 200) {
                setFootballers(footballers.map(footb => (footb._id === currentFootballerId ? response.data : footb)));
                toast.success('Footballer updated successfully');
                setShowForm(false);
                setEditMode(false);
                setNewFootballer({
                    Surname: '',
                    Age: '',
                    Position: '',
                    Club: '',
                    Goals: '',
                    Assists: '',
                    Height: ''
                });
            } else {
                toast.error('Error updating footballer');
            }
        } catch (error) {
            toast.error('Error updating footballer');
        }
    };

    const handleDeleteFootballer = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/footballers/${id}`, {
                data: { createdBy: user.username } // Send the logged-in user's username
            });
            if (response.status === 200) {
                setFootballers(footballers.filter(footb => footb._id !== id));
                toast.success('Footballer deleted successfully');
            } else {
                toast.error('Error deleting footballer');
            }
        } catch (error) {
            toast.error('Error deleting footballer');
        }
    };

    const startEditFootballer = (footballer) => {
        setCurrentFootballerId(footballer._id);
        setNewFootballer({
            Surname: footballer.Surname,
            Age: footballer.Age,
            Position: footballer.Position,
            Club: footballer.Club,
            Goals: footballer.Goals,
            Assists: footballer.Assists,
            Height: footballer.Height
        });
        setEditMode(true);
        setShowForm(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewFootballer(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="container">
            <Toaster />
            <h1 className="heading">Football Player Stats</h1>
            <div className="header">
                <input
                    type="text"
                    placeholder="Search Player"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="input-field search-bar"
                />
                <button onClick={() => setShowForm(!showForm)} className="add-player-button">
                    Add Player
                </button>
            </div>
            {showForm && (
                <form onSubmit={editMode ? handleEditFootballer : handleAddFootballer} className="form-container">
                    <div className="mb-2">
                        <label className="block text-white">Surname:</label>
                        <input
                            type="text"
                            name="Surname"
                            value={newFootballer.Surname}
                            onChange={handleChange}
                            className="input-field"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-white">Age:</label>
                        <input
                            type="number"
                            name="Age"
                            min="1"
                            max="129"
                            value={newFootballer.Age}
                            onChange={handleChange}
                            className="input-field"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-white">Position:</label>
                        <select
                            name="Position"
                            value={newFootballer.Position}
                            onChange={handleChange}
                            className="select-field"
                            required
                        >
                            <option value="">Select Position</option>
                            <option value="Forward">Forward</option>
                            <option value="Midfielder">Midfielder</option>
                            <option value="Defender">Defender</option>
                            <option value="Goalkeeper">Goalkeeper</option>
                        </select>
                    </div>
                    <div className="mb-2">
                        <label className="block text-white">Club:</label>
                        <input
                            type="text"
                            name="Club"
                            value={newFootballer.Club}
                            onChange={handleChange}
                            className="input-field"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-white">Goals:</label>
                        <input
                            type="number"
                            name="Goals"
                            min="0"
                            value={newFootballer.Goals}
                            onChange={handleChange}
                            className="input-field"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-white">Assists:</label>
                        <input
                            type="number"
                            name="Assists"
                            min="0"
                            value={newFootballer.Assists}
                            onChange={handleChange}
                            className="input-field"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-white">Height:</label>
                        <input
                            type="number"
                            name="Height"
                            min="120"
                            max="250"
                            value={newFootballer.Height}
                            onChange={handleChange}
                            className="input-field"
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        {editMode ? 'Update' : 'Submit'}
                    </button>
                </form>
            )}
            <div className="table-container">
                <table className="table">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 cursor-pointer" onClick={() => handleSort('Surname')}>
                            Surname
                            {sortConfig.key === 'Surname' && (
                                sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />
                            )}
                        </th>
                        <th className="py-2 px-4 cursor-pointer" onClick={() => handleSort('Age')}>
                            Age
                            {sortConfig.key === 'Age' && (

                                sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />
                            )}
                        </th>
                        <th className="py-2 px-4 cursor-pointer" onClick={() => handleSort('Position')}>
                            Position
                            {sortConfig.key === 'Position' && (
                                sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />
                            )}
                        </th>
                        <th className="py-2 px-4 cursor-pointer" onClick={() => handleSort('Club')}>
                            Club
                            {sortConfig.key === 'Club' && (
                                sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />
                            )}
                        </th>
                        <th className="py-2 px-4 cursor-pointer" onClick={() => handleSort('Goals')}>
                            Goals
                            {sortConfig.key === 'Goals' && (
                                sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />
                            )}
                        </th>
                        <th className="py-2 px-4 cursor-pointer" onClick={() => handleSort('Assists')}>
                            Assists
                            {sortConfig.key === 'Assists' && (
                                sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />
                            )}
                        </th>
                        <th className="py-2 px-4 cursor-pointer" onClick={() => handleSort('Height')}>
                            Height
                            {sortConfig.key === 'Height' && (
                                sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />
                            )}
                        </th>
                        <th className="py-2 px-4">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredFootballers.map(footballer => (
                        <tr key={footballer._id} className="hover:bg-blue-800">
                            <td className="py-2 px-4">{footballer.Surname}</td>
                            <td className="py-2 px-4">{footballer.Age}</td>
                            <td className="py-2 px-4">{footballer.Position}</td>
                            <td className="py-2 px-4">{footballer.Club}</td>
                            <td className="py-2 px-4">{footballer.Goals}</td>
                            <td className="py-2 px-4">{footballer.Assists}</td>
                            <td className="py-2 px-4">{footballer.Height}</td>
                            <td className="py-2 px-4 flex">
                                {footballer.createdBy === user.username && (
                                    <>
                                        <button onClick={() => startEditFootballer(footballer)} className="action-button edit-button">
                                            <FaEdit />
                                        </button>
                                        <button onClick={() => handleDeleteFootballer(footballer._id)} className="action-button delete-button">
                                            <FaTrash />
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FootballerTable;
