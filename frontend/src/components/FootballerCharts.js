import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import './FootballerCharts.css';

const FootballerCharts = () => {
    const [footballers, setFootballers] = useState([]);
    const [positionFilter, setPositionFilter] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/api/footballers')
            .then(response => {
                console.log('Fetched footballers:', response.data);
                setFootballers(response.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const filteredFootballers = positionFilter
        ? footballers.filter(footballer => footballer.Position === positionFilter)
        : footballers;

    const goalsData = filteredFootballers.map(footballer => ({
        name: footballer.Surname,
        goals: footballer.Goals
    }));

    const assistsData = filteredFootballers.map(footballer => ({
        name: footballer.Surname,
        assists: footballer.Assists
    }));

    const heightData = filteredFootballers.map(footballer => ({
        name: footballer.Surname,
        height: footballer.Height
    }));

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-4 text-white">Football Player Stats</h1>
            <div className="mb-4">
                <label htmlFor="position" className="mr-2 text-white">Filter by Position:</label>
                <select
                    id="position"
                    value={positionFilter}
                    onChange={e => setPositionFilter(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="">All</option>
                    <option value="Forward">Forward</option>
                    <option value="Midfielder">Midfielder</option>
                    <option value="Defender">Defender</option>
                </select>
            </div>
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-white">Goals</h2>
                <ResponsiveContainer width="100%" height={500}>
                    <BarChart data={goalsData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }} barCategoryGap="20%">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-90} textAnchor="end" interval={0} />
                        <YAxis />
                        <Tooltip />
                        <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '20px' }} />
                        <Bar dataKey="goals" fill="#4caf50" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-white">Assists</h2>
                <ResponsiveContainer widthassistsData="100%" height={500}>
                    <BarChart data={assistsData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }} barCategoryGap="20%">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-90} textAnchor="end" interval={0} />
                        <YAxis />
                        <Tooltip />
                        <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '20px' }} />
                        <Bar dataKey="assists" fill="#fe7f00" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-white">Height</h2>
                <ResponsiveContainer width="100%" height={500}>
                    <BarChart data={heightData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }} barCategoryGap="20%">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-90} textAnchor="end" interval={0} />
                        <YAxis />
                        <Tooltip />
                        <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '20px' }} />
                        <Bar dataKey="height" fill="#f44336" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default FootballerCharts;
