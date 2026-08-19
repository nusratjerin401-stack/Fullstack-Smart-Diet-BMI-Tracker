// code written Devonte Allen

import React, { useEffect, useState } from 'react';
import { LineChart, ComposedChart, BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { IonPage, IonTitle, IonContent } from '@ionic/react';
import './Dashboard.css';
import byDayMacros from './byDayMacros.json';
import byDayCalories from './byDayCalories.json';

const barData = [
  {
    macro: 'Calories',
    breakfast: 1.1,     // 22/2000 *100
    lunch: 0.55,        // 11/2000 *100
    dinner: 16.65,      // 333/2000 *100
    snack: 0,
    target: 100
  },
  {
    macro: 'Protein',
    breakfast: 22,       // 22/100 *100
    lunch: 11,           // 11/100 *100
    dinner: 11,          // 11/100 *100
    snack: 0,
    target: 100
  },
  {
    macro: 'Carbs',
    breakfast: 8.8,      // 22/250 *100
    lunch: 4.4,          // 11/250 *100
    dinner: 8.8,         // 22/250 *100
    snack: 0,
    target: 100
  },
  {
    macro: 'Fat',
    breakfast: 9.23,     // 6/65 *100
    lunch: 16.92,        // 11/65 *100
    dinner: 24.62,       // 16/65 *100
    snack: 0,
    target: 100
  }
];



type ChartData = {
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

type MealTotals = {calories: number; protein: number; carbs: number; fat:number};
type TodayByType = {breakfast:MealTotals; lunch: MealTotals; dinner: MealTotals; snack: MealTotals};
type DRV = { dailyCalories: number; dailyProtein: number; dailyCarbs: number; dailyFat: number};

type BarRow = {
  macro: string;
  breakfast: number;
  lunch: number;
  dinner: number;
  snack: number;
  target: number;
};

const Dashboard: React.FC = () => {
  //const token = useAuthStore((state) => state.token);
  //const [chartData, setChartData] = useState<ChartData[]>([]);
  //  const [barData, setBarData] = useState<BarRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [barLoading, setBarLoading] = useState(false);

  /*
     const headers = {
     'Content-type': 'application/json',
     'Authorization': `Bearer ${token}`
     };
     
     useEffect(() => {
     const fetchData = async () => {
     try {
     const response = await fetch('http://localhost:3000/meal', {
     method: 'GET',
     headers
     });
     const data: ChartData[] = await response.json();
     const sorted = [...data].sort((a, b) => a.date.localeCompare(b.date));
     setChartData(sorted);
     } catch (error) {
     console.log(error);
     } finally {
     setLoading(false);
     }
     };
     fetchData();
     }, []);

     useEffect(() => {
     const fetchBarData = async () => {
     try{
     const todayStr = new Date().toLocaleDateString('en-CA');

     const [drvRes, mealsRes] = await Promise.all([
     fetch('http://localhost:3000/survey/me', {headers}),
     fetch(`http://localhost:3000/meal/today-by-type?date=${todayStr}`, {headers}),
     ]);
     const drv: DRV = await drvRes.json();
     const meals: TodayByType = await mealsRes.json();

     const rows: BarRow[] = [
     {macro: 'Calories', 
     breakfast: drv.dailyCalories ? (meals.breakfast.calories / drv.dailyCalories) *100 : 0, 
     lunch:drv.dailyCalories ? (meals.lunch.calories / drv.dailyCalories) *100 : 0, 
     dinner: drv.dailyCalories ? (meals.dinner.calories / drv.dailyCalories) *100 : 0, 
     snack: drv.dailyCalories ? (meals.snack.calories / drv.dailyCalories) *100 : 0,
     target: 100},
     {macro: 'Protein', 
     breakfast: drv.dailyProtein ? (meals.breakfast.protein / drv.dailyProtein) *100 : 0, 
     lunch:drv.dailyProtein ? (meals.lunch.protein / drv.dailyProtein) *100 : 0, 
     dinner: drv.dailyProtein ? (meals.dinner.protein / drv.dailyProtein) *100 : 0, 
     snack: drv.dailyProtein ? (meals.snack.protein / drv.dailyProtein) *100 : 0,
     target: 100},
     {macro: 'Carbs', 
     breakfast: drv.dailyCarbs ? (meals.breakfast.carbs / drv.dailyCarbs) *100 : 0, 
     lunch:drv.dailyCarbs ? (meals.lunch.carbs / drv.dailyCarbs) *100 : 0, 
     dinner: drv.dailyCarbs ? (meals.dinner.carbs / drv.dailyCarbs) *100 : 0, 
     snack: drv.dailyCarbs ? (meals.snack.carbs / drv.dailyCarbs) *100 : 0,
     target: 100},
     {macro: 'Fat', 
     breakfast: drv.dailyFat ? (meals.breakfast.fat / drv.dailyFat) *100 : 0, 
     lunch:drv.dailyFat ? (meals.lunch.fat / drv.dailyFat) *100 : 0, 
     dinner: drv.dailyFat ? (meals.dinner.fat / drv.dailyFat) *100 : 0, 
     snack: drv.dailyFat ? (meals.snack.fat / drv.dailyFat) *100 : 0,
     target: 100},
     ];
     console.log('DRV:', drv);
     console.log('Meals today:', meals);
     console.log('Bar rows:', rows);
     setBarData(rows);
     } catch(error) {
     console.log(error);
     } finally {
     setBarLoading(false);
     }
     };
     fetchBarData();
     }, []);
   */
  return (
    <IonPage>
      <IonContent className='dashboard-content' fullscreen>
        <IonTitle className='dashboard-title'>Dashboard</IonTitle>

        <div className='charts-row'>
          <div className='chart-card'>
            <IonTitle size="small"> Macros over Time </IonTitle>
            <div className='chart-card-body'>
              {loading ?  (
		<div className='chart-loading'>loading...</div>
              ) : (
		<ResponsiveContainer>
		  <LineChart
		    style={{ width: '100%', maxWidth: '700px', height: '100%', maxHeight: '70vh', aspectRatio: 1.618 }}
		    data = {byDayMacros}
		    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
		  >
		    
		    <CartesianGrid strokeDasharray="3 3" />
		    <XAxis dataKey="date" stroke="var(--color-text-3)" />
		    <YAxis width={50} stroke="var(--color-text-3)" />
		    
		    <Tooltip />
		    <Legend />
		    <Line type="monotone" dataKey="protein"  stroke="#3b82f6" dot={{ fill: '#3b82f6' }} activeDot={{ r: 8 }} />
		    <Line type="monotone" dataKey="carbs"    stroke="#22c55e" dot={{ fill: '#22c55e' }} activeDot={{ r: 8 }} />
		    <Line type="monotone" dataKey="fat"      stroke="#ef4444" dot={{ fill: '#ef4444' }} activeDot={{ r: 8 }} />
		  </LineChart>
		</ResponsiveContainer>
              )}
            </div>
          </div>
          <div className='chart-card'>
            <IonTitle size="small"> Macros over Time </IonTitle>
            <div className='chart-card-body'>
              {loading ?  (
		<div className='chart-loading'>loading...</div>
              ) : (
		<ResponsiveContainer>
		  <LineChart
		    style={{ width: '100%', maxWidth: '700px', height: '100%', maxHeight: '70vh', aspectRatio: 1.618 }}
		    data = {byDayCalories}
		    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
		  >
		    
		    <CartesianGrid strokeDasharray="3 3" />
		    <XAxis dataKey="date" stroke="var(--color-text-3)" />
		    <YAxis width={50} stroke="var(--color-text-3)" />
		    
		    <Tooltip />
		    <Legend />
		    <Line type="monotone" dataKey="calories" stroke="#f97316" dot={{ fill: '#f97316' }} activeDot={{ r: 8 }} />
		  </LineChart>
		</ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="chart-card">
            <IonTitle>Today vs. Daily Goals</IonTitle>
            <div className="chart-card-body">
              {barLoading ?  (
		<div className="chart-loading">Loading...</div>
              ) : (
		<ResponsiveContainer width="100%" height="100%">
		  <ComposedChart data={barData} margin={{top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="macro" />
                    <YAxis unit ="%" domain={[0, 150]} allowDataOverflow/>
                    <Tooltip formatter={(value: number) => `${value.toFixed(0)}%`} />
                    <Legend />
                    <Bar dataKey="breakfast" stackId="a" fill="#f97316" />
                    <Bar dataKey="lunch" stackId="a" fill="#3b82f6" />
                    <Bar dataKey="dinner" stackId="a" fill="#22c55e" />
                    <Bar dataKey="snack" stackId="a" fill="#a855f7" />
                    <Line dataKey="target" stroke="#000" strokeWidth={2} dot={{ r: 5}} name="Daily Goal" />
		  </ComposedChart>
		</ResponsiveContainer>
              )}
            </div>
          </div>
	</div>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
