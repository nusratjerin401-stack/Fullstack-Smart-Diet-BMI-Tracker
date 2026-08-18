'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const bmiHistoryData = [
  { date: 'Jun 01', weight: 68.0, bmi: 24.1 },
  { date: 'Jul 01', weight: 66.5, bmi: 23.6 },
  { date: 'Aug 01', weight: 64.8, bmi: 23.0 },
  { date: 'Sep 01', weight: 63.2, bmi: 22.4 },
  { date: 'Oct 01', weight: 62.5, bmi: 22.1 },
];

export function BMITrendChart() {
  return (
    <div className="w-full h-80 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">BMI & Weight History</h3>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={bmiHistoryData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="date" stroke="#6B7280" />
          <YAxis yAxisId="left" stroke="#3B82F6" domain={["dataMin - 2", "dataMax + 2"]} />
          <YAxis yAxisId="right" orientation="right" stroke="#10B981" domain={[18, 30]} />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="weight"
            name="Weight (kg)"
            stroke="#3B82F6"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="bmi"
            name="BMI"
            stroke="#10B981"
            strokeWidth={2}
            strokeDasharray="4 4"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
