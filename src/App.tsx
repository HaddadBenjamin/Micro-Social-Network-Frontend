import React, {useEffect} from 'react';
import './App.css';
import AppPage from "./components/AppPage/AppPage";
import {useDispatch} from "react-redux";
import {getIp} from "./actions/user.action";

const App: React.FC = () =>
{
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getIp())
    });

    return (
      <>
        <AppPage/>
      </>
  );
}

export default App;
