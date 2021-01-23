import NavButton from "./NavButton"
const NavBar = props => (
  <div className="nav-bottom flex bottom-0 fixed border-top bg-gray-100 py-2 px-3 z-50 text-indigo-700">
    {props.navButtons.map(button => (
      <NavButton
        key={button.path}
        path={button.path}
        label={button.label}
        icon={button.icon}
      />
    ))}
  </div>
)
export default NavBar