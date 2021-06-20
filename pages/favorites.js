import React from 'react'
import Message from '../components/Message'
import CampaignItemListSkeleton from '../components/CampaignItemListSkeleton'
import Header from '../components/Header'
import NavComponent from '../components/NavComponent'
import NavMobile from '../components/NavMobile'
import Footer from '../components/Footer'
import CampaignItemListAction from '../components/CampaignItemListAction'
class Detail extends React.Component {
    constructor(props) {
        super(props)
        this.state = { data: null, load: true }
    }
    componentDidMount() {
        let userFav = localStorage.getItem('favorites')
        let data
        if (userFav === null) { data = [] } else { data = JSON.parse(userFav) }
        this.setState({ data, load: false })
    }
    handleRemove = (data) => {
        let userFav = localStorage.getItem('favorites')
        let userdataFav
        if (userFav === null) { userdataFav = [] } else { userdataFav = JSON.parse(userFav) }
        // remove data from array
        userdataFav = userdataFav.filter(function (item) {
            return item.id !== data.id
        })
        const newData = userdataFav.filter(i => i.id !== data.id)
        localStorage.setItem('favorites', JSON.stringify(userdataFav))
        this.setState({ data: newData })
    }
    render() {
        const { data, load } = this.state
        const info = {
            title: 'Kost Terdekat Disekitar Kamu',
            description: 'Kost Terdekat Harian Bulanan Tahunan Murah',
            url: 'favorites'
        }
        return (
            <>
                <Header info={info} />
                <NavComponent />
                {
                    load ? <CampaignItemListSkeleton /> :
                        data && data.length > 0 &&
                        <div className="mx-3 my-2 divide-y">
                            {
                                data && data
                                    .sort(function compare(a, b) {
                                        const itemA = a.price.start_from
                                        const itemB = b.price.start_from
                                        let comparison = 0
                                        if (itemA > itemB) comparison = 1
                                        if (itemA < itemB) comparison = -1
                                        return comparison
                                    })
                                    .map((item, index) =>
                                        <div key={index}><CampaignItemListAction key={index} item={item} callbackFromParent={this.handleRemove} /></div>
                                    )
                            }
                        </div>
                }
                {data && data.length === 0 && <Message title="No Room" message="You don't have favorite room" />}
                <Footer />
                <div className="xs:block sm:hidden md:hidden lg:hidden">
                    <NavMobile />
                </div>
            </>
        )
    }
}
export default Detail;