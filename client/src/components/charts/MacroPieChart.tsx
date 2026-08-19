'use client';

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const macroData = [
  { name: 'Protein (g)', value: 120, color: '#3B82F6' },
  { name: 'Carbs (g)', value: 210, color: '#10B981' },
  { name: 'Fat (g)', value: 55, color: '#F59E0B' },
];

export function MacroPieChart() {
  return (
    <div className="w-full h-80 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Daily Macronutrient Split</h3>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={macroData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={4}
            dataKey="value"
          >
            {macroData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => [`${value}g`, 'Amount']} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
