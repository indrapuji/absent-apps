import React from "react";
import CIcon from "@coreui/icons-react";

const _SuperAdminnav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  //   {
  //     _tag: "CSidebarNavItem",
  //     name: "Register",
  //     to: "/add",
  //     icon: "cil-user-follow",
  //   },
  {
    _tag: "CSidebarNavItem",
    name: "Record",
    to: "/record",
    icon: "cil-magnifyingGlass",
  },
  {
    _tag: "CSidebarNavItem",
    name: "User",
    to: "/user",
    icon: "cil-people",
  },
  //   {
  //     _tag: "CSidebarNavItem",
  //     name: "Pasien",
  //     to: "/pasien",
  //     icon: "cil-people",
  //   },
  //   {
  //     _tag: "CSidebarNavDivider",
  //   },
  //   {
  //     _tag: "CSidebarNavItem",
  //     name: "Master Dokter",
  //     to: "/doctor",
  //     icon: "cil-user",
  //   },
  {
    _tag: "CSidebarNavItem",
    name: "Event",
    to: "/event",
    icon: "cil-building",
  },
  //   {
  //     _tag: "CSidebarNavItem",
  //     name: "Master Petugas",
  //     to: "/operator",
  //     icon: "cil-voice-over-record",
  //   },
  //   {
  //     _tag: "CSidebarNavItem",
  //     name: "Master Harga",
  //     to: "/harga",
  //     icon: "cil-money",
  //   },
  //   {
  //     _tag: "CSidebarNavItem",
  //     name: "Master Laboratorium",
  //     to: "/lab",
  //     icon: "cil-money",
  //   },
  {
    _tag: "CSidebarNavItem",
    name: "Referal",
    to: "/referal",
    icon: "cil-address-book",
  },
  //   {
  //     _tag: "CSidebarNavItem",
  //     name: "Griya Medika",
  //     to: "/pasien-gm",
  //     icon: "cil-bank",
  //   },
];
export { _SuperAdminnav };
