import React from 'react'
const KostType = (props) =>
    <>
        {
            props.item.map((item, index) =>
                <span key={index} className="rounded-full inline-block px-1 border mr-1">{item}</span>
            )
        }
    </>
export default KostType