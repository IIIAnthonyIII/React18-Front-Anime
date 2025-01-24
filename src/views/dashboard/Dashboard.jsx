import React, { useEffect, useState } from 'react';

const Dashboard = ({navigHandled}) => {
  const [width, setWidth] = useState(navigHandled);
  useEffect(() => {
    setWidth(navigHandled);
  }, [navigHandled]);
  return (
    <div style={{width: width+'vw', transition: '0.5s'}}>
      <div>Dashboard</div>
    </div>
  )
}

export default Dashboard;