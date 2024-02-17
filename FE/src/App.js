import React, { Suspense } from 'react';
import { Alert, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import {
  RouterProvider, createHashRouter,
  createRoutesFromElements, defer,
  Route, useOutlet,
  useLoaderData, Await, Navigate
} from "react-router-dom";
import { AuthProvider, useAuth } from './auth/auth_provider';
import Login from './scenes/login';
import SplashScreen from './scenes/global/spashscreen';
import Dashboard from './scenes/admin/dashboard';
import SideMenu from './scenes/global/Menu';
import Home from './scenes/home';
import DaftarAdmin from './scenes/admin/admin';
import DataKabupaten from './scenes/admin/data_kabupaten';
import Kelembagaan from './scenes/admin/data_kelembagaan';
import DataDistrik from './scenes/admin/data_distrik';
import Datadesa from './scenes/admin/data_desa';



const App = () => {
  const [theme, colorMode] = useMode()
  // const { user } = useAuth();
  const router =
    createHashRouter(
      createRoutesFromElements(
        <Route path='/' element={<AuthLayout />}
          loader={() => defer({ userPromise: getUserData() })}
        >
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="admin" element={<ProtectedLayout />}>
            <Route index element={ <Dashboard /> } />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="datakabupaten" element={<DataKabupaten />} />
            <Route path="datadistrik" element={<DataDistrik />} />
            <Route path="datadesa" element={<Datadesa />} />
            <Route path="admin" element={<DaftarAdmin />} />
            <Route path="kelembagaan" element={<Kelembagaan />} />
          </Route>
        </Route>
      )
    );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </ColorModeContext.Provider>

  );
}

const getUserData = () =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      const user = window.localStorage.getItem("user");
      resolve(user);
      reject("Error");
    }, 3000)
  );


const ProtectedLayout = () => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      <SideMenu />
    </div>
  );
};



// const ProtectedUserLayout = () => {
//   const { user } = useAuth();
//   const outlet = useOutlet();

//   if (user.type === 'user') {
//     return <Alert severity="error">404: Halaman yang anda Cari tidak tersedia</Alert>;
//   }
//   return (<div>{outlet}</div>)
// };

// const ProtectedAdminLayout = () => {
//   const { user } = useAuth();
//   const outlet = useOutlet();

//   if (user.type === 'admin' || user.type === 'user') {
//     return <Alert severity="error">404: Halaman yang anda Cari tidak tersedia</Alert>;
//   }

//   return (<div>{outlet}</div>)
// };

const AuthLayout = () => {
  const oulet = useOutlet();
  const { userPromise } = useLoaderData();

  return (
    <Suspense fallback={<SplashScreen />}>
      <Await
        resolve={userPromise}
        errorElement={<Alert severity="error">404: Halaman yang anda Cari tidak tersedia</Alert>}
        children={
          (user) => (
            <AuthProvider userData={user}>
              {oulet}
            </AuthProvider>
          )
        }
      />
    </Suspense>
  );
}


export default App;
