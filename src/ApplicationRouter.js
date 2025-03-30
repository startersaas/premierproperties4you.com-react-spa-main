// ./src/ApplicationRouter.js
import React from 'react';
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IndexPage from 'pages/Public/IndexPage';
import PublicLayout from 'layouts/PublicLayout';
import SnackbarOpen from './SnackbarOpen';
import { DarkMode } from 'contexts/DarkMode';
import { ScrolledProvider } from 'contexts/ScrolledContext';
import { DashboardDrawerProtectedProvider } from 'contexts/DashboardDrawerProtectedContext';
import { DashboardDrawerProvider } from 'contexts/DashboardDrawerContext';
import { DrawerProvider } from 'contexts/DrawerContext';
import { TvMode } from 'contexts/TvMode';
import { DrawerComponentProvider } from 'contexts/DrawerComponentContext';
import { AccordionProvider } from 'contexts/AccordionContext';
import { AuthProvider } from 'contexts/AuthContext';
import { SlideProvider } from 'contexts/SlideContext';
import { RolesProvider } from 'contexts/RolesContext';
import { PlanTypeProvider } from 'contexts/PlanTypeContext';
import { MenuProvider } from 'contexts/MenuContext';
import { YiMode } from 'contexts/YiMode';
import './App.css';
import './Fonts.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const ApplicationRouter = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TvMode>
        <YiMode>
          <DrawerComponentProvider>
            <AuthProvider>
              <SlideProvider>
                <AccordionProvider>
                  <MenuProvider>
                    <ScrolledProvider>
                      <DashboardDrawerProtectedProvider>
                        <DashboardDrawerProvider>
                          <DrawerProvider>
                            <DarkMode>
                              <Router>
                                <Routes>
                                  <Route
                                    path="/"
                                    element={
                                      <RolesProvider>
                                        <PlanTypeProvider>
                                          <PublicLayout>
                                            <SnackbarOpen>
                                              <IndexPage />
                                            </SnackbarOpen>
                                          </PublicLayout>
                                        </PlanTypeProvider>
                                      </RolesProvider>
                                    }
                                  />
                                </Routes>
                              </Router>
                            </DarkMode>
                          </DrawerProvider>
                        </DashboardDrawerProvider>
                      </DashboardDrawerProtectedProvider>
                    </ScrolledProvider>
                  </MenuProvider>
                </AccordionProvider>
              </SlideProvider>
            </AuthProvider>
          </DrawerComponentProvider>
        </YiMode>
      </TvMode>
    </QueryClientProvider>
  );
};

export default ApplicationRouter;