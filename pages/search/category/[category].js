import React from 'react'
import fire from '../../../config/fire-config'
import { string } from 'prop-types'
import HeadPage from '../../../components/HeadPage'
import ListKosAll from '../../../components/ListKosAll'
import Firstupper from '../../../utils/Firstupper'

class Detail extends React.Component {
    static async getInitialProps(ctx) {
        return { slug: ctx.query.category }
    }
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            load: true
        }
    }
    async componentDidMount() {
        const { slug } = this.props;
        const docRef = await fire
            .firestore().collection('kosts').where("category", "==", Firstupper(slug))
        docRef.onSnapshot(snap => {
            const data = snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            this.setState({ data, load: false })
        })
        docRef.get().catch(err => console.log(err))
    }
    render() {
        const { slug } = this.props;
        const { data, load } = this.state;
        return (
            <div className="main-layout">
                <HeadPage title={`Semua ${slug}`} />
                <ListKosAll data={data} load={load} />
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