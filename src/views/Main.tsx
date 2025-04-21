import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../constants/Routes";
import { BaseActivityFlow, RoundActivityFlow } from "../types/activities.types";
import { ActivityContext } from "../hooks/ActivityContext";
import { flowGuard } from "../utils/activity.utils";
import Button from "../components/Button";
import styles from "../styles/views/Main.module.css";

const Main = () => {
  const navigate = useNavigate();
  const [activityStore, dispatch] = useContext(ActivityContext)!;
  const [title, setTitle] = useState<string | null>(null);
  const [headings, setHeadings] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const goToActivity = (
    index: number,
    activity: BaseActivityFlow | RoundActivityFlow,
  ) => {
    dispatch({
      type: "SET_SELECTED_ACTIVITY",
      payload: {
        activities: activityStore.activities,
        selectedActivity: index,
        flow: flowGuard(activity),
      },
    });
    navigate(ROUTES.activity.path);
  };

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch("/api/payload.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setTitle(data.name);
        setHeadings(data.heading);
        dispatch({
          type: "SET_ACTIVITIES",
          payload: {
            activities: data.activities,
            selectedActivity: activityStore.selectedActivity,
            flow: activityStore.flow,
          },
        });
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
    <div className={styles["menu"]}>
      <h1>{title} 🔍</h1>
      <div className={styles["menu__headings"]}>{headings}</div>
      <div className={styles["menu__activity-list"]}>
        <p>Select an activity to begin:</p>
        {(
          activityStore.activities as (BaseActivityFlow | RoundActivityFlow)[]
        ).map(
          (activity: BaseActivityFlow | RoundActivityFlow, index: number) => (
            <div className={styles["menu__activity-button"]}>
              <Button
                func={() => goToActivity(index, activity)}
                isWide={true}
                key={index}
              >
                {activity.activity_name}
              </Button>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default Main;
