import React from 'react'
import { arrayOf, shape, string } from 'prop-types'
import NextHead from 'next/head'

class Detail extends React.Component {
  static async getInitialProps(ctx) {
    const res = await fetch('https://5de747e7b1ad690014a4e0d2.mockapi.io/rooms?slug='+ctx.query.detail)
    const json = await res.json()
    return { data: json, slug: ctx.query.detail }
  }

  render() {
    const { data, slug } = this.props;
    console.log(data)
    return <>
                <NextHead>
                <meta property="og:title" content={data[0].room_title} />
                <meta property="og:description" content={data[0].description} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`https://tantekos.com/${slug}`} />
                <meta property="og:image" content={data[0].image_url} />
                <meta property="og:image:alt" content={data[0].room_title} />
                <meta property="og:locale" content="id" />
                <meta property="og:site_name" content="Tantekos" />
            </NextHead>

      <h1>
        { data[0].room_title }
      </h1>
      <img src={data[0].image_url} />
      <p>
        {data[0].description}
      </p>
    </>
  }
}

Detail.propTypes = {
  data: arrayOf(shape({})),
  slug: string
}

Detail.defaultProps = {
  data: null,
  slug: ''
}
export default Detail;