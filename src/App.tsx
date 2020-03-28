import React from 'react';
import './App.css';
import AppPage from "./components/AppPage/AppPage";
import ItemViewer from "./components/Items/ItemViewer";

const App: React.FC = () =>
{
  return (
      <>
        <AppPage/>
        <ItemViewer />
      </>
  );
}

export default App;
