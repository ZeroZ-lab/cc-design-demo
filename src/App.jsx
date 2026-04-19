import { Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { routeConfigs } from './data/routeConfigs';

function RouteEffects() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const current = routeConfigs.find((item) => item.path === location.pathname);
    document.title = current ? current.title : 'CC Design Demo';
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <RouteEffects />
      <Suspense fallback={<div className="app-loading">Loading…</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {routeConfigs
            .filter((item) => item.path !== '/')
            .map((item) => (
              <Route key={item.path} path={item.path} element={<item.component />} />
            ))}
        </Routes>
      </Suspense>
    </>
  );
}
