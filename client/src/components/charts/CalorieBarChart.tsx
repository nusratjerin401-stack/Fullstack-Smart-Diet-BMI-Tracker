'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

const calorieData = [
  { day: 'Mon', calories: 1850 },
  { day: 'Tue', calories: 2100 },
  { day: 'Wed', calories: 1950 },
  { day: 'Thu', calories: 2300 },
  { day: 'Fri', calories: 1780 },
  { day: 'Sat', calories: 2250 },
  { day: 'Sun', calories: 1900 },
];

export function CalorieBarChart() {
  const dailyTarget = 2000;

  return (
    <div className="w-full h-80 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Daily Calorie Intake (kcal)</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={calorieData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" />
          <YAxis domain={[0, 2600]} />
          <Tooltip />
          <ReferenceLine y={dailyTarget} label="Target" stroke="#EF4444" strokeDasharray="3 3" />
          <Bar dataKey="calories" fill="#6366F1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
