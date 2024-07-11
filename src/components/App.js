import '../styles/App.css';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import Signup from './pages/Signup';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route exact path="/" Component={Home} />
            <Route exact path="/login" Component={Login} />
            <Route exact path="/signup" Component={Signup} />
            <Route exact path="/quiz" Component={Quiz} />
            <Route exact path="/result" Component={Result} />
          </Routes>
        </Layout>
      </AuthProvider>
      
    </Router>
  );
}

export default App;
