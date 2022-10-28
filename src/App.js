import './assets/css/App.css';
import "@identitybuilding/idb-react-ui-elements/dist/styles/Colors.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home"
import ResultsPage from "./pages/ResultsPage"
import DetailsPage from "./pages/DetailsPage"
import Meta from './components/Meta';
import { useEffect } from 'react';
import CookieMessage from './components/CookieMejsxssage';
import { useSelector } from "react-redux";

const App = () => {
  const { translate } = useSelector(state => state.general);

  useEffect(() => {
    if (window.location.hostname !== 'localhost') {
      if (window.location.hostname.includes("stad-gemeente.be")) {
        if (!window.location.hostname.includes("mijn")) {
          window.location.href = `https://mijn.stad-gemeente.be${window.location.pathname}`
      }
    }
    else if (window.location.hostname.includes("ville-commune.be")) {
      if (!window.location.hostname.includes("ma")) {
        window.location.href = `https://ma.ville-commune.be${window.location.pathname}`
    }
  }
  }
    

  }, [])
  return (
    <div className="App">
      <BrowserRouter>
        <Meta />
        <CookieMessage />
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props}/>} />
          <Route path={`/${translate("search_slug")}/:keyword?`} render={(props) => <ResultsPage {...props} />} />
          <Route path="/business/:id?" render={(props) => <DetailsPage {...props} />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
