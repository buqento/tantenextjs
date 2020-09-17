import React, { Component } from 'react'
import KostItem from '../components/KostItem'
import { DataKos } from '../utils/modals/fakeDb'

class Kos extends Component {
    render() {
        return (
            <>
                {
                    DataKos.map((item, index) =>
                        <div key={index} className="mt-3 mb-3">
                            <KostItem item={item} />
                        </div>
                    )
                }
            </>
        )
    }
}

export default Kos;