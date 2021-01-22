import NavButton from "./NavButton"
const NavBar = props => (
  <div className="sticky flex bottom-0 border-top w-full bg-gray-100 pt-2 pb-1 px-3 z-50 text-indigo-700">
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