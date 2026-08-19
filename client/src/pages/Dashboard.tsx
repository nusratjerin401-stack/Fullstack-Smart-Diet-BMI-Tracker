import React from 'react';
import { MacroPieChart } from '../components/charts/MacroPieChart';
import { BMITrendChart } from '../components/charts/BMITrendChart';
import { CalorieBarChart } from '../components/charts/CalorieBarChart';
import { LineChart, BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';
import { IonPage, IonTitle } from '@ionic/react';


type ChartData = {
  name: string;
  value: number;
};

const data: ChartData[] = [
  { name: 'Page A', value: 400 },
  { name: 'Page B', value: 300 },
  { name: 'Page C', value: 200 },
  { name: 'Page D', value: 278 },
  { name: 'Page E', value: 189 },
  { name: 'Page E', value: 189 },
  { name: 'Page E', value: 189 },
  { name: 'Page E', value: 189 },
  { name: 'Page E', value: 189 },
  { name: 'Page E', value: 189 },
  { name: 'Page E', value: 189 },
];

const Dashboard: React.FC = () => {
  return (
    <IonPage>
      
      <div style={{height: '30vh'}} >
        <IonTitle> Nutrients over Time </IonTitle>
        <ResponsiveContainer>
          <LineChart
            data = {data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="var(--color-text-3)" />
            <YAxis width={50} stroke="var(--color-text-3)" />  
            <Tooltip />
            <Legend />
	    <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#82ca9d" 
            />
          </LineChart>
        </ResponsiveContainer>
	
      </div>
      
    </IonPage>
  );
};

export default Dashboard;
