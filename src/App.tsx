import React from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'use-react-router-breadcrumbs';
import { recommendationsRoutes } from "./features/recommendations/routes";

function App() {
  return (
    <Routes>
        <Route path={recommendationsRoutes.path}
        element={<recommendationsRoutes.Component/>}/>
    </Routes>
  );
}

export default App;
