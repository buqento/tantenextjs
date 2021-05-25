import NavButton from "./NavButton"
import { AiFillHome, AiOutlineHome } from 'react-icons/ai'
import { HiLocationMarker, HiOutlineLocationMarker } from 'react-icons/hi'
import { useRouter } from 'next/router'
import { BiSearch, BiSearchAlt } from "react-icons/bi"
function NavMobile(props) {
  const router = useRouter()
  const navButtons = [
    {
      label: "Beranda",
      path: "/",
      icon: router.pathname === '/' ? <AiFillHome /> : <AiOutlineHome />,
      color: router.pathname === '/' ? 'text-indigo-700' : 'text-gray-700'
    },
    {
      label: "Terdekat",
      path: "/nearby",
      icon: router.pathname === '/nearby' ? <HiLocationMarker /> : <HiOutlineLocationMarker />,
      color: router.pathname === '/nearby' ? 'text-indigo-700' : 'text-gray-700'
    },
    {
      label: "Cari Kost",
      path: "/search/all",
      icon: router.pathname === '/search/[search]' ? <BiSearchAlt /> : <BiSearch />,
      color: router.pathname === '/search/[search]' ? 'text-indigo-700' : 'text-gray-700'
    }
  ]
  return (
    <div className="nav-bottom flex bottom-0 fixed border-top bg-gray-100 py-3 px-3 z-50">
      {navButtons.map(button => (
        <NavButton
          key={button.path}
          path={button.path}
          label={button.label}
          icon={button.icon}
          color={button.color}
        />
      ))}
    </div>
  )
}
export default NavMobile