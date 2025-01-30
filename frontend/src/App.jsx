import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Page1 from "./components/Page1";
import LoginPage from "./components/Loginpage";
import Dashboard from "./components/Dashboard";
import NewsPage from "./components/NewsPage";

function App() {
  return (
    <Auth0Provider
      domain="dev-wcbj6ku3e6hjqg6e.us.auth0.com"
      clientId="Ajwm7A1kdZfhxas13PjoSvc78IRU3jLv"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      cacheLocation="localstorage"
    >
      <Router>
        <Routes>
          <Route path="/" element={<Page1 />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/news" element={<NewsPage/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </Router>
    </Auth0Provider>
  );
}

export default App;
