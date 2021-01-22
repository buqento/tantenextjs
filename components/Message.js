import React from "react"
import { BiSmile, BiWinkSmile } from 'react-icons/bi'
const Message = (props) =>
  <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
    {props.title && <p className="font-bold">{props.title}</p>}
    <p className="text-sm"><BiWinkSmile size={22} className="inline mr-1 mb-1" />{props.message}</p>
  </div>
export default Message