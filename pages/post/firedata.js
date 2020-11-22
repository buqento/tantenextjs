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

        // var docRef = fire.firestore().collection("kosts").doc("OR3MTu4CwSbk450m4zeC");
        // docRef.get().then(function (doc) {
        //     if (doc.exists) {
        //         console.log("Document data:", doc.data());
        //     } else {
        //         // doc.data() will be undefined in this case
        //         console.log("No such document!");
        //     }
        // }).catch(function (error) {
        //     console.log("Error getting document:", error);
        // });

    }
    render() {
        const { kosts } = this.state
        return (
            <div className="container grid grid-cols-2 gap-3 py-3" >
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
                            .slice(0, 15)
                            .map((kost, index) =>
                                <div key={index} className="w-full overflow-hidden shadow-md my-3">
                                    <img src={`https://cdn.statically.io/img/i.imgur.com/w=100/${kost.images[0]}`} alt={kost.title} className="float-left mr-3" />
                                    <div className="mx-3 my-3">
                                        <div className="font-bold">{Currency(kost.start_price, false)}</div>
                                        <div className="text-current leading-none clamp-1"><small>{kost.title}</small></div>
                                        <div className="text-current leading-none clamp-1"><small>{kost.location.district} - {kost.location.province}</small></div>
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