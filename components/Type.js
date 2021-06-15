import React from 'react'
const KostType = (props) =>
    <>
        {
            props.item.map((item, index) =>
                <span key={index} className="inline-block mr-1">
                    {index !== 0 && <span className="mr-1">&middot;</span>}
                    {item === "Campur" && "All"}
                    {item === "Putra" && "Man"}
                    {item === "Putri" && "Woman"}
                    {item === "Pasutri" && "Married"}
                </span>
            )
        }
    </>
export default KostType