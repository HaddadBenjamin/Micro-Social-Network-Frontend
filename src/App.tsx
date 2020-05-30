import React, {useEffect} from 'react';
import './App.css';
import AppPage from "./components/AppPage/AppPage";
import {useDispatch} from "react-redux";
import {identifyUser} from "./actions/user.action";

const App: React.FC = () =>
{
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(identifyUser())
    });

    return (
      <>
        <AppPage/>
      </>
  );
}

export default App;
