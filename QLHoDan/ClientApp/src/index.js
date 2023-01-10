import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from './components/GlobalStyles';
import { AuthProvider } from './components/AuthenProvider';
import authenticationService from './services/account/authentication';
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <GlobalStyles>
//       <AuthProvider>
//         <App />
//       </AuthProvider>
//     </GlobalStyles>
//   </React.StrictMode>
// );


authenticationService.onAccountChanged = (user) => {
  console.log("User changed");
  console.log(user);
};
console.log(authenticationService.isAuthenticated()? "Authenticated" : "Not authenticated");
if(authenticationService.isAuthenticated()){
  console.log(authenticationService.User);
  authenticationService.fetchProfile().then((data) => {
    console.log(data);
  });
}
else{
  authenticationService.signIn("admin", "admin")
.then((data) => {console.log(data)})
.catch((error) => {console.error(error)});
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
