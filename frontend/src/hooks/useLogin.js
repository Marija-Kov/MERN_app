import { useDispatch } from 'react-redux';
 
export const useLogin = () => {
 const dispatch = useDispatch();
 const login = async (credentials) => {
 dispatch({type: "LOGIN_REQ"}) 
     const response = await fetch(
       `${process.env.REACT_APP_API}/api/users/login`,
       {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(credentials),
       }
     );
        const json = await response.json();

        if (!response.ok){
          dispatch({type: "LOGIN_FAIL", payload: json.error}) 
        }
        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json));
            dispatch({type:'LOGIN_SUCCESS', payload:json});

        }


 }

    return { login }
}