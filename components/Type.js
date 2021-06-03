import React from 'react'
const KostType = (props) =>
    <>
        {
            props.item.map((item, index) =>
                <span key={index} className="inline-block mr-2">{item}</span>
            )
        }
    </>
export default KostType