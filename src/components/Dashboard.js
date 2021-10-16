import './Dashboard.css';
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";
import Loading from "./Loading"
import { useEffect, useState } from 'react';

function Dashboard() {

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    totalNoOfUsers: "",
    data: []
  });
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:4000/users');
      const data = await res.json();
      const totalNoOfUsers = data.reduce((acc, curr) => {
        return acc + curr.users
      }, 0);
      setData(prevState => {
        return {
          ...prevState,
          data,
          totalNoOfUsers
        }
      });
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <div className="grid">
        <div className="card header">Dashboard</div>
        <div className="card info-1">{error ? error : `Total Users : ${data.totalNoOfUsers}`}</div>
        <div className="card list">
          PieChart: Type of users
          {isLoading ? <Loading /> :
            <PieChart width={500} height={400}>
              <Pie
                dataKey="users"
                isAnimationActive={false}
                data={data.data}
                cx={200}
                cy={200}
                outerRadius={120}
                fill="#0077b6"
                label
              />
              <Tooltip />
            </PieChart>
          }
        </div>
        <div className="card chart">
          BarChart: Type of users
          {isLoading ? <Loading /> :
            <BarChart
              width={500}
              height={300}
              data={data.data}
              margin={{
                top: 5,
                right: 30,
                left: 80,
                bottom: 5,
              }}
              barSize={20}
            >
              <XAxis
                dataKey="name"
                scale="point"
                padding={{ left: 10, right: 10 }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="users" fill="#0077b6" background={{ fill: "#eee" }} />
            </BarChart>
          }
        </div>
      </div>
    </div>
  );
}

export default Dashboard
