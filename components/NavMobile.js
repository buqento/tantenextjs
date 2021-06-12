import NavButton from "./NavButton"
import { AiFillHome, AiOutlineHome } from 'react-icons/ai'
import { HiLocationMarker, HiOutlineLocationMarker } from 'react-icons/hi'
import { useRouter } from 'next/router'
import { BiSearch, BiSearchAlt } from "react-icons/bi"
function NavMobile() {
  const router = useRouter()
  const navButtons = [
    {
      label: "Terdekat",
      path: "/nearby",
      icon: router.pathname === '/nearby' ? <HiLocationMarker /> : <HiOutlineLocationMarker />,
      color: router.pathname === '/nearby' ? 'text-indigo-700' : 'text-gray-700'
    },
    {
      label: "Cari Kost",
      path: "/location",
      icon: router.pathname === '/location' ? <BiSearchAlt /> : <BiSearch />,
      color: router.pathname === '/location' ? 'text-indigo-700' : 'text-gray-700'
    }
  ]
  const routeHome = router.pathname === '/'
  return (
    <div className="nav-bottom flex bottom-0 fixed border-top bg-gray-100 py-3 px-3 z-50">
      <div className={`flex flex-col justify-around items-center h-full w-full cursor-pointer text-${routeHome ? `indigo` : `gray`}-700`}>
        <a href="/" className={`hover:text-${routeHome ? `indigo` : `gray`}-700`}>
          <div className="text-2xl mb-n1" style={{ textAlign: '-webkit-center' }}>
            {routeHome ? <AiFillHome /> : <AiOutlineHome />}
          </div>
          <span className="font-bold uppercase text-xs">Beranda</span>
        </a>
      </div>
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