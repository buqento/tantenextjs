import React from "react"
import { string } from 'prop-types'
const Message = (props) =>
  <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
    {props.title && <p className="font-bold">{props.title}</p>}
    <p className="text-sm">
      {props.message}. {props.url && <a href={props.url}><u>{props.urlTitle}</u></a>}
    </p>
  </div>
Message.propTypes = {
  title: string,
  message: string,
  url: string,
  urlTitle: string,
}
Message.defaultProps = {
  title: null,
  message: null,
  url: null,
  urlTitle: null,
}
export default Message