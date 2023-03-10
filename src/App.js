
import {Route, Routes, Outlet } from 'react-router-dom';

import Home from "./routes/home/home.component";
import Navigation from './routes/navigation/navigation.compoment';
import Authentication from './routes/authentication/authentication.component';

const Shop = () =>{
  return (
    <h1>I am the shop page</h1>
  )
}
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
      <Route index element={<Home />}></Route>
      <Route path='shop' element={<Shop />} />
      <Route path='auth' element={<Authentication />} />
      </Route>
    
    </Routes>

  );
}

export default App;
