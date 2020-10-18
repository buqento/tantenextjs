import React from 'react'
import { string } from 'prop-types'
import { Kost } from '../../../utils/modals/Kost'
import HeadPage from '../../../components/HeadPage'
import ListKos from '../../../components/ListKos'
import Currency from '../../../components/Currency'
import { Price } from '../../../utils/modals/Price'

class Detail extends React.Component {
    static async getInitialProps(ctx) {
        return { slug: ctx.query.price }
    }
    render() {
        const { slug } = this.props;
        const price = Price.filter(item => item.max_price === parseInt(slug))
        const data = Kost.filter(item => (item.start_price >= price[0].min_price && item.start_price <= slug))
        return (
            <>                
                <div className="main-layout">
                    <HeadPage title={`${Currency(price[0].min_price)} - ${Currency(parseInt(slug))}`} />
                    <ListKos data={data} />
                </div>
            </>
        )
    }
}
Detail.propTypes = {
    slug: string
}
Detail.defaultProps = {
    slug: ''
}
export default Detail;