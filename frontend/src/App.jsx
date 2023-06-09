import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Termekek from './components/Termekek';
import Login from './components/Login';
import Regist from './components/Regist';
import Kosar from './components/Kosar';
import { UserProvider } from './components/context/UserContext';
import Profile from './components/Profile';
import TermekFelvitel from './components/TermekFelvitel';
import TermekModosit from './components/TermekModosit';
import Termek from './components/Termek';

function App() {
  return (
    <div>
      <Router>
        <UserProvider>
          <Navbar />
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/termekek' element={<Termekek />} />
            <Route path='/kosar' element={<Kosar />} />
            <Route path='/login' element={<Login />} />
            <Route path='/regist' element={<Regist />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/termek' element={<Termek />} />
            <Route path='/termekfelvitel' element={<TermekFelvitel />} />
            <Route path='/termekmodosit' element={<TermekModosit />} />
          </Routes>
        </UserProvider>
      </Router>
    </div>
  )
}

export default App
