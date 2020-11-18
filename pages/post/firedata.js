import React from 'react'
import fire from '../../config/fire-config';
import Currency from '../../components/Currency'
import Addnew from './addnew'
class Firedata extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            kosts: []
        }
    }
    componentDidMount() {
        fire.firestore().collection('kosts')
            .onSnapshot(snap => {
                const kosts = snap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                this.setState({ kosts })
            })
    }
    render() {
        const { kosts } = this.state
        return (
            <div className="container">
                <div className="grid grid-cols-2 gap 3">
                    <div><Addnew /></div>
                    <div className="grid grid-cols-2 gap-3">
                        {
                            kosts
                                .map((kost, index) =>
                                    <div key={index} className="rounded-xl overflow-hidden shadow-sm border">
                                        <img className="w-full" src={`https://cdn.statically.io/img/i.imgur.com/w=200/${kost.images[0]}`} alt={kost.title} />
                                        <div className="px-3 py-3 text-center">
                                            <div className="px-2 font-bold">{Currency(kost.start_price, false)}</div>
                                            <div className="text-current leading-none clamp-1"><small>{kost.location.title}</small></div>
                                            <div className="text-current uppercase leading-none clamp-1"><small>{kost.location.province}</small></div>
                                        </div>
                                    </div>
                                )
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default Firedata;