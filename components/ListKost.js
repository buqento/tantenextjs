import React, { Component } from 'react'
import InfiniteScroll from "react-infinite-scroll-component"
import fire from '../configurations/firebase'
const style = {
    height: 30,
    border: "1px solid green",
    margin: 6,
    padding: 8
};
class ListKost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: null
        }
        this.fetchMoreData = this.fetchMoreData.bind(this)
    }
    componentDidMount() {
        fire.firestore()
            .collection('kosts')
            .limit(10)
            .onSnapshot(snap => {
                const items = snap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                this.setState({ items })
            })
    }
    fetchMoreData() {
        const { items } = this.state

        // const newData = [...items,]
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        setTimeout(() => {
            this.setState({
                items: items.concat(items)
            });
        }, 1500);
    }
    render() {
        const { items } = this.state
        return (
            <div className="container pb-3">
                <h1>demo: react-infinite-scroll-component</h1>
                <hr />
                <InfiniteScroll
                    dataLength={items && items.length}
                    next={this.fetchMoreData}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                >
                    {items && items.map((i, index) => (
                        <div style={style} key={index}>
                            {i.title}
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
        )
    }
}
export default ListKost;