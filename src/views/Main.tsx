import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../constants/Routes";
import { ActivityList, BaseActivityFlow, RoundActivityFlow } from "../types/activities.types";

const Main = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState<ActivityList>();
  const [title, setTitle] = useState<string | null>(null);
  const [headings, setHeadings] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const goToActivity = () => {
    navigate(ROUTES.activity.path);
  };

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('/api/payload.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setActivities(data.activities);
        setTitle(data.name);
        setHeadings(data.heading);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>{title}</h1>
      <p>{headings}</p>
      {
        activities?.map((activity: (BaseActivityFlow | RoundActivityFlow), index: number) => (
          <button key={index}>{activity.activity_name}</button>
        ))
      }
    </div>
  );
};

export default Main;