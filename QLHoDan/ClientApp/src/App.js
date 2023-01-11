import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { routes, loginRoute } from '~/routes'
import { AuthContext } from './components/AuthenProvider';
import { useContext } from 'react';

function App() {
  const { auth } = useContext(AuthContext);
  return (
    <Router >
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
          (auth.hasOwnProperty('password') && auth.hasOwnProperty('username')) && (
            routes.map((route => {
              const Page = route.element;
              let Layout = route.layout;
              if (!route.hasOwnProperty('subRoutes')) {
                return <Route key={route.id} path={route.path} element={
                  <Layout>
                    <Page />
                  </Layout>
                } />
              }
              else {
                return (
                  route.subRoutes.map((subRoute) => {
                    const SubPage = subRoute.element;
                    return <Route key={subRoute.id} path={subRoute.subpath} element={
                      <Layout>
                        <SubPage />
                      </Layout>
                    } />
                  })
                )
              }
            }))
          )

        }
      </Routes>
    </Router>
  );
}

export default App;
