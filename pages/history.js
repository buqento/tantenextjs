import React from 'react'
import HeadPage from '../components/HeadPage'
import CampaignItem from '../components/CampaignItem'
import { BiSmile } from 'react-icons/bi'
class History extends React.Component {
    constructor(props) {
        super(props)
        this.state = { data: [] }
    }
    componentDidMount() {
        let userFav = localStorage.getItem('lastview')
        let data
        if (userFav === null) { data = [] } else { data = JSON.parse(userFav) }
        this.setState({ data })
    }
    render() {
        const { data } = this.state;
        return (
            <div className="main-layout">
                <HeadPage title="Terakhir Dilihat" />
                {
                    data.length > 0 ?
                        <div className="grid grid-cols-2 gap-3 mx-3 mb-3">
                            {
                                data
                                    .sort(
                                        function compare(a, b) {
                                            const dtModifiedA = b.date_modified;
                                            const dtModifiedB = a.date_modified;
                                            let comparison = 0;
                                            if (dtModifiedA > dtModifiedB) {
                                                comparison = 1;
                                            } else if (dtModifiedA < dtModifiedB) {
                                                comparison = -1;
                                            }
                                            return comparison;
                                        }
                                    )
                                    .map((item, index) => <CampaignItem key={index} item={item} />)
                            }
                        </div>
                        :
                        <div className="container-center text-center">
                            <div className="text-center">
                                <div><BiSmile size={22} className="inline mr-1 mb-1" />Kamu belum memiliki history</div>
                            </div>
                        </div>
                }
            </div>
        )
    }
}
export default History;