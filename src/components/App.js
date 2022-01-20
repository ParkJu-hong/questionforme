import React, { useState, useEffect } from 'react';
import { authService } from '../fBase';
import AppRoute from "./AppRouter";
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const [init, setInit] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      console.log(user)
      if (user) {
        // 뭐 Object.assign 이런식으로 객체를 할당해도 된다. 
        // setUserObj(Object.assign({}, user, {}))
        let userObj = {
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        }
        dispatch({
          type: 'SET_USER_OBJ',
          payload: {
            userObj
          }
        });
        dispatch({
          type: 'LOGGED_IN'
        })
      }else{
        dispatch({type:'LOG_OUT'})
      }
      setInit(true);
    })
  }, [])

  return (
    <div>
      {init ? <AppRoute /> : "Initializing..."}
    </div>
  );
}

export default App;
