import { useSelector, useDispatch } from 'react-redux'; 

export const useCreateWorkout = () => { 
   const dispatch = useDispatch();
   const { user } =  useSelector(state => state.user)
  
   const createWorkout = async (workout) => {
      dispatch({type: "CREATE_WORKOUT_REQ"})
      if (!user) {
       dispatch({type: "CREATE_WORKOUT_FAIL", payload: "Not authorized"})
       return;
     }
     const response = await fetch(`${process.env.REACT_APP_API}/api/workouts`, {
       method: "POST",
       body: JSON.stringify(workout),
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${user.token}`,
       },
     });
     const json = await response.json();

     if (!response.ok) {
      dispatch({type: "CREATE_WORKOUT_FAIL", payload: "Please fill out the empty fields"})
       return
     }

     if (response.ok) {
       dispatch({ type: "CREATE_WORKOUT_SUCCESS", payload: json });
       dispatch({type: "GO_TO_PAGE_NUMBER", payload: 0})
     }
    }

  return { createWorkout }
}
