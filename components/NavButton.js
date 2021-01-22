import Link from "next/link"
const NavButton = props => (
  <Link href={props.path}>
    <div className="flex flex-col justify-around items-center h-full w-full cursor-pointer">
      <div className="text-2xl">{props.icon}</div>
      <span className="font-bold uppercase text-xs">{props.label}</span>
    </div>
  </Link>
)
export default NavButton