import React from 'react'
const KostType = (props) =>
    <>
        {
            props.item.map((item, index) =>
                <small key={index} className="rounded-full inline-block px-1 text-green-700 border mr-1">{item}</small>
            )
        }
    </>
export default KostType