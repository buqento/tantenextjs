import React from "react"
const Message = (props) =>
  <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
    {props.title && <p className="font-bold">{props.title}</p>}
    <p className="text-sm">
      {props.message}. {props.url && <a href={props.url}><u>{props.urlTitle}</u></a>}
    </p>
  </div>
export default Message