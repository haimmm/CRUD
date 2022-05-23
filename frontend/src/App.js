import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Login, Dashboard, User } from "routes"
import AuthContext from 'context/AutoContext';
import { useAuth } from 'hooks/useAuth';
import axios from "axios";


function App() {
  const auth = useAuth();
  const user = auth.user;
  axios.defaults.headers.common['Authorization'] = user ? `bearer ${user.access_token}` : "";

  return (
    <div className="App">
      <AuthContext.Provider value={auth}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Login />} />
          <Route path={"/users/:id"} element={<User />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;