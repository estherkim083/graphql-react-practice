import { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { isLoggedIn } from "./auth";
import CompanyDetail from "./components/CompanyDetail";
import LoginForm from "./components/LoginForm";
import JobBoard from "./components/JobBoard";
import JobDetail from "./components/JobDetail";
import JobForm from "./components/JobForm";
import NavBar from "./components/NavBar";
import { client } from "./graphql/queries";

function App() {
  // const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);

  const handleLogin = () => {
    setLoggedIn(true);
    // navigate('/');
    window.location.href = "/";
  };

  const handleLogout = () => {
    setLoggedIn(false);
    // navigate('/');
    window.location.href = "/";
  };

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <nav>
          <NavBar loggedIn={loggedIn} onLogout={handleLogout} />
        </nav>
        <main className="section">
          <Routes>
            <Route path="/" element={<JobBoard />} />
            <Route path="/companies/:companyId" element={<CompanyDetail />} />
            <Route path="/jobs/new/:jobId?" element={<JobForm />} />
            <Route path="/jobs/:jobId" element={<JobDetail />} />
            <Route
              path="/login"
              element={<LoginForm onLogin={handleLogin} />}
            />
          </Routes>
        </main>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
