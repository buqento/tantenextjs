import React from 'react'
import { string } from 'prop-types'
import { Kost } from '../../../utils/modals/Kost'
import HeadPage from '../../../components/HeadPage'
import ListKos from '../../../components/ListKos'
import Currency from '../../../components/Currency'

class Detail extends React.Component {
    static async getInitialProps(ctx) {
        return { slug: ctx.query.price }
    }

    render() {
        const { slug } = this.props;
        const data = Kost.filter(item => (item.start_price <= slug && item.start_price !== 0))
        return (
            <>                
                <div className="main-layout">
                    <HeadPage title={`Harga Mulai ${Currency(parseInt(slug))}<`} />
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