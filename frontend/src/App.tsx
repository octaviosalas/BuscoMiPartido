import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Calendar from "./components/Calendar";
import Main from './components/Main/Main';
import NavbarComponent from './components/Navbar/NavbarComponent';
import MainLoginQuestion from './components/Login/MainLoginQuestion';
//import { userStore } from './store/store';

function App() {


  useEffect(() => {
      document.body.style.backgroundImage = '#FFFFFF';
  }, [location.pathname]);
  
  //const {user} = userStore()



  return (
    <>
          <div className=''>
            <NavbarComponent/>
            <Routes>       
               <Route path="/calendar" element={<Calendar />} />   
               <Route path="/" element={<MainLoginQuestion />} />   
               <Route path="/main" element={<Main />} />   

            </Routes>
           
          </div>
    </>
  )
}

export default App