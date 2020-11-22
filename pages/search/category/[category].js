import React from 'react'
import { string } from 'prop-types'
import HeadPage from '../../../components/HeadPage'
import ListKosAll from '../../../components/ListKosAll'
import fire from '../../../config/fire-config'
import Firstupper from '../../../utils/Firstupper'

class Detail extends React.Component {
    static async getInitialProps(ctx) {
        return { slug: ctx.query.category }
    }
    constructor(props) {
        super(props)
        this.state = {
            data: null
        }
    }
    componentDidMount() {
        const { slug } = this.props;
        fire.firestore().collection('kosts').where("category", "==", Firstupper(slug))
            .onSnapshot(snap => {
                const data = snap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                this.setState({ data })
            })
    }
    render() {
        const { slug } = this.props;
        const { data } = this.state;
        return (
            <div className="main-layout">
                <HeadPage title={`Semua ${slug}`} />
                {data && <ListKosAll data={data} />}
            </div>
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