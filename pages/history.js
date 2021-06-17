import React from 'react'
import Message from '../components/Message'
import CampaignItemListSkeleton from '../components/CampaignItemListSkeleton'
import Header from '../components/Header'
import NavComponent from '../components/NavComponent'
import NavMobile from '../components/NavMobile'
import Footer from '../components/Footer'
import CampaignItemListAction from '../components/CampaignItemListAction'
class History extends React.Component {
    constructor(props) {
        super(props)
        this.state = { data: null, load: true }
    }
    componentDidMount() {
        let userFav = localStorage.getItem('lastview')
        let data
        if (userFav === null) { data = [] } else { data = JSON.parse(userFav) }
        this.setState({ data, load: false })
    }
    handleRemove = (item) => {
        let lastView = localStorage.getItem('lastview')
        let data
        if (lastView === null) { data = [] } else { data = JSON.parse(lastView) }
        const newData = data.filter(i => i.id !== item.id)
        localStorage.setItem('lastview', JSON.stringify(newData))
        // this.setState({ data: newData })
        // console.log(newData);
    }
    render() {
        const { data, load } = this.state
        const info = {
            title: 'Kost Terdekat Disekitar Kamu',
            description: 'Kost Terdekat Harian Bulanan Tahunan Murah',
            url: 'history'
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
                                data
                                    .sort(
                                        function compare(a, b) {
                                            const dtModifiedA = b.date_view;
                                            const dtModifiedB = a.date_view;
                                            let comparison = 0;
                                            if (dtModifiedA > dtModifiedB) {
                                                comparison = 1;
                                            } else if (dtModifiedA < dtModifiedB) {
                                                comparison = -1;
                                            }
                                            return comparison;
                                        }
                                    )
                                    .map((item, index) =>
                                        <div key={index}><CampaignItemListAction key={index} item={item} callbackFromParent={this.handleRemove} /></div>

                                    )
                            }
                        </div>
                }
                {data && data.length === 0 && <Message title="No Room" message="You don't have history" />}
                <Footer />
                <div className="xs:block sm:hidden md:hidden lg:hidden">
                    <NavMobile />
                </div>
            </>
        )
    }
}
export default History;