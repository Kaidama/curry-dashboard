import React from "react";
import MainRouter from "./MainRouter";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { teal, orange, red } from "@material-ui/core/colors";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import Spinner from "./components/Spinner/Spinner";
import checkTokenAuth from "./redux/lib/helpers/checkTokenAuth";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#52c7b8",
      main: "#A94B97",
      dark: "#00675b",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ffd95b",
      main: "#FE2548",
      dark: "#c77800",
      contrastText: "#000"
    },
    openTitle: teal["700"],
    protectedTitle: red["700"],
    type: "light"
  }
});

checkTokenAuth(store);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <React.Suspense fallback={<Spinner />}>
          <MuiThemeProvider theme={theme}>
            <MainRouter />
          </MuiThemeProvider>
        </React.Suspense>
      </Router>
    </Provider>
  );
}

export default App;
