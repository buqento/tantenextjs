import React from 'react'
const KostType = (props) =>
    <>
        {
            props.item.map((item, index) =>
                <span key={index} className="inline-block mr-2">
                    {item === "Campur" && "All"}
                    {item === "Putra" && "Man"}
                    {item === "Putri" && "Woman"}
                    {item === "Pasutri" && "Married"}
                </span>
            )
        }
    </>
export default KostType