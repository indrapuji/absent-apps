import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));

const ChangePassword = React.lazy(() => import("./views/pages/ChangePassword"));

const UserPage = React.lazy(() => import("./views/pages/UserPage"));
const DetailUser = React.lazy(() => import("./views/pages/DetailUserPage"));
const RegisterUser = React.lazy(() => import("./views/pages/RegisterUserPage"));
const ReferalPage = React.lazy(() => import("./views/pages/ReferalPage"));
const RegisterReferal = React.lazy(() => import("./views/pages/RegisterReferalPage"));
const DetailReferal = React.lazy(() => import("./views/pages/DetailReferalPage"));
const EventPage = React.lazy(() => import("./views/pages/EventPage"));
const DetailEvent = React.lazy(() => import("./views/pages/DetailEventPage"));
const RegisterEvent = React.lazy(() => import("./views/pages/RegisterEventPage"));
const RecordPage = React.lazy(() => import("./views/pages/RecordPage"));
const DetailRecord = React.lazy(() => import("./views/pages/DetailRecordPage"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },

  { path: "/password", exact: true, name: "Change Password", component: ChangePassword },

  { path: "/user", exact: true, name: "User", component: UserPage },
  { path: "/user/register", exact: true, name: "Register", component: RegisterUser },
  { path: "/user/:dataId", exact: true, name: "Detail", component: DetailUser },
  { path: "/referal", exact: true, name: "Referal", component: ReferalPage },
  { path: "/referal/register", exact: true, name: "Register", component: RegisterReferal },
  { path: "/referal/:dataId", exact: true, name: "Detail", component: DetailReferal },
  { path: "/event", exact: true, name: "Event", component: EventPage },
  { path: "/event/register", exact: true, name: "Register", component: RegisterEvent },
  { path: "/event/:dataId", exact: true, name: "Detail", component: DetailEvent },
  { path: "/record", exact: true, name: "Record", component: RecordPage },
  { path: "/record/:dataId", exact: true, name: "Detail", component: DetailRecord },
];

export default routes;
