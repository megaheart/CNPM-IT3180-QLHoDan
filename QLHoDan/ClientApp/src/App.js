import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { routes, loginRoute } from '~/routes';

import RequireAuth from './services/ProtectedRoute/requireAuth';

/* A constant that is used to define the roles of the users. */

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '0.7rem',
        },
      },
    },
    '& MuiFormControl-root MuiFormControl-filled Mui-required': {
      styleOverrides: {
        root: {
          width: '300px'
        },
      },
    },
    MuiDatePicker: {
      styleOverrides: {
        root: {
          backgroundColor: 'red',
        },
      },
    },
  },
});


/**
 * It renders a Route for each route in the routes array, and a Route for each route in the loginRoute
 * array. 
 * 
 * The routes array contains objects that have a path, a layout, and an element. The layout is a React
 * component that wraps the element. The element is a React component that is rendered inside the
 * layout. 
 * 
 * The loginRoute array contains objects that have a path, a layout, and an element. The layout is a
 * React component that wraps the element. The element is a React component that is rendered inside the
 * layout. 
 * 
 * The routes array contains objects that have a path, a layout, and an element. The layout is a React
 * component that wraps the element. The element is a React component that is rendered inside the
 * layout. 
 * 
 * The routes array contains objects that have a path, a layout, and an element. The layout is a React
 * component that wraps the element
 * @returns The routes are being returned.
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        {
          loginRoute.map((route => {
            return <Route key={route.id} path={route.path} element={
              (
                <route.layout>
                  <route.element />
                </route.layout>
              )
            } />
          }))
        }
        {
          routes.map((route => {
            const Page = route.element;
            let Layout = route.layout;
            if (!route.hasOwnProperty('subRoutes')) {
              return <Route key={route.id} element={<RequireAuth allowedRoles={route.role} />}>
                <Route path={route.path} element={
                  <Layout>
                    <Page />
                  </Layout>
                } />
              </Route>
            }
            else {
              return (
                route.subRoutes.map((subRoute) => {
                  const SubPage = subRoute.element;
                  return <Route key={route.id} element={<RequireAuth allowedRoles={route.role} />}>
                    <Route key={subRoute.id} path={subRoute.subpath} element={
                      <Layout>
                        <SubPage />
                      </Layout>
                    } />
                  </Route>
                })
              )
            }
          }))


        }
      </Routes>
    </ThemeProvider>
  );
}

export default App;
