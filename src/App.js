import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './Pages/Home';
import Nav from './Component/Nav/Nav';
import Footer from './Component/Footer/Footer';
import AddProduct from './Pages/AddProduct';
import ViewProduct from './Pages/ViewProduct';

function App() {
  return (
    <div >
      <BrowserRouter>
      <Nav/> 
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/addproduct" element={<AddProduct/>}/>
        <Route path="/viewproduct" element={<ViewProduct/>}/>

      </Routes> 
      <Footer/>     
      </BrowserRouter>
     
    </div>
  );
}

export default App;
