import React from 'react'
import HeadPage from '../components/HeadPage'
import CampaignItem from '../components/CampaignItem'
import { BiSmile } from 'react-icons/bi'
class Detail extends React.Component {
    constructor(props) {
        super(props)
        this.state = { data: [] }
    }
    componentDidMount() {
        let userFav = localStorage.getItem('favorites')
        let data
        if (userFav === null) { data = [] } else { data = JSON.parse(userFav) }
        this.setState({ data })
    }
    render() {
        const { data } = this.state;
        return (
            <div className="main-layout">
                <HeadPage title="Kost &amp; Kontrakan Favorit" />
                {
                    data.length > 0 ?
                        <div className="grid grid-cols-2 gap-3 mx-3 mb-3">
                            {data.map((item, index) => <CampaignItem key={index} item={item} />)}
                        </div>
                        :
                        <div className="container-center text-center">
                            <div className="text-center">
                                <div><BiSmile size={22} className="inline mr-1 mb-1" />Kamu belum memilih favorit</div>
                            </div>
                        </div>
                }
            </div>
        )
    }
}
export default Detail;