import React from 'react';
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import Navbar from'../components/Navbar'
import { useWorkoutsContext } from '../hooks/useWorkoutContext'
import { useAuthContext } from "../hooks/useAuthContext";
import Search from "../components/Search";

export default function Home() {
    const [addWorkoutForm, setAddWorkoutForm] = React.useState(false);
    const { workouts } = useWorkoutsContext(); 
    const { user } = useAuthContext();
    const [page, setPage] = React.useState(0);

   function hideForm(){
       setAddWorkoutForm(false)
   }

   function goToPageOne(){
    setPage(0)
   }

    return (
      <>
        <Navbar page={page} setPage={setPage}/>
        {user && (
          <Search page={page} setPage={setPage} pageSpread={pageSpread} />
        )}
        <div className="home">
          <div className="workouts">
            {workouts &&
              workouts.map((workout) => (
                <WorkoutDetails
                  key={workout._id}
                  id={workout._id}
                  title={workout.title}
                  reps={workout.reps}
                  load={workout.load}
                  createdAt={workout.createdAt}
                  updatedAt={workout.updatedAt}
                  page={page}
                />
              ))}
          </div>
          {addWorkoutForm && 
          <WorkoutForm 
          goToPageOne={() => goToPageOne()}
          hideForm={() => hideForm()} />}
          {!addWorkoutForm && (
            <button
              className="add--workout"
              onClick={() => setAddWorkoutForm(true)}
            >
              + Add workout
            </button>
          )}
        </div>
      </>
    );
};
