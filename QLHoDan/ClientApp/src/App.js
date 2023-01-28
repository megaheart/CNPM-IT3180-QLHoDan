import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { routes, loginRoute } from '~/routes';
import useAuth from "~/hooks/useAuth";
import RequireAuth from './services/ProtectedRoute/requireAuth';
function App() {
  const { auth } = useAuth();
  return (
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
        )

      }
    </Routes>
  );
}

export default App;
