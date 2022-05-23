import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth, Dashboard, Error, Landing, Layout } from "components";
import { RequireAuth, CheckAuth } from "utils";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<CheckAuth />}>
            <Route index element={<Landing />} />
            <Route element={<Auth.Layout />}>
              <Route path="/login" element={<Auth.Login />} />
              <Route path="/register" element={<Auth.Register />} />
            </Route>
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard.Layout />}>
              <Route index element={<Dashboard.Stats />} />
              <Route path="all-jobs" element={<Dashboard.Jobs />} />
              <Route path="add-job">
                <Route index element={<Dashboard.AddJob />} />
                <Route path=":jobId" element={<Dashboard.AddJob isEdit />} />
              </Route>
              <Route path="profile" element={<Dashboard.Profile />} />
            </Route>
          </Route>
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
