import React from "react"
import { BiSearchAlt } from 'react-icons/bi'
import { MdMyLocation, MdHome } from 'react-icons/md'
const navButtons = [
  {
    label: "Beranda",
    path: "/",
    icon: <MdHome />
  },
  {
    label: "Terdekat",
    path: "/nearby",
    icon: <MdMyLocation />
  },
  {
    label: "Pencarian",
    path: "/search/all",
    icon: <BiSearchAlt />
  }
]
export default navButtons