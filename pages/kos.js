import React, { Component } from 'react'
import KostItem from '../components/KostItem'
import { Kost } from '../utils/modals/Kost'

class Kos extends Component {
    render() {
        return (
            <>
                {
                    Kost
                    .sort(function(a, b){return b.id - a.id})
                    .map((item, index) =>
                        <div key={index}>
                            <KostItem item={item} />
                        </div>
                    )
                }
            </>
        )
    }
}

export default Kos;