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
            <div className="container grid grid-cols-2 gap-3 py-3">
                <div><Addnew /></div>
                <div className="py-3">
                    {
                        kosts
                            .sort(
                                function compare(a, b) {
                                    const dtModifiedA = a.date_modified;
                                    const dtModifiedB = b.date_modified;
                                    let comparison = 0;
                                    if (dtModifiedA < dtModifiedB) {
                                        comparison = 1;
                                    } else if (dtModifiedA > dtModifiedB) {
                                        comparison = -1;
                                    }
                                    return comparison;
                                }
                            )
                            .map((kost, index) =>
                                <div key={index} className="rounded-xl overflow-hidden shadow-md my-3">
                                    <img src={`https://cdn.statically.io/img/i.imgur.com/w=100/${kost.images[0]}`} alt={kost.title} />
                                    <div className="px-3 py-3">
                                        <div className="font-bold">{Currency(kost.start_price, false)}</div>
                                        <div className="text-current leading-none clamp-1"><small>{kost.title}</small></div>
                                    </div>
                                </div>
                            )
                    }
                </div>
            </div>
        )
    }
}
export default Firedata;