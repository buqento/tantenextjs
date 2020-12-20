import React from 'react'
import NextHead from 'next/head'
import Router from 'next/router'
import { string } from 'prop-types'
import { FaExternalLinkAlt } from 'react-icons/fa'
import Slide from '../components/Slide'
import Peta from '../components/Peta'
import FooterDetail from '../components/FooterDetail'
import ReactGa from 'react-ga'
import moment from 'moment'
import ListKosOthers from '../components/ListKosOthers'
import fire from '../config/fire-config'

class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = { otherData: null }
    this.myRef = React.createRef()
  }
  async componentDidMount() {
    if (window.location.hostname !== 'localhost') {
      ReactGa.initialize('UA-132808614-2')
      ReactGa.pageview('/detail')
    }
  }
  componentDidUpdate() {
    if (window.location.hostname !== 'localhost') {
      ReactGa.initialize('UA-132808614-2')
      ReactGa.pageview('/detail')
    }
  }
  render() {
    const { slug, details, otherdatas } = this.props
    const detail = JSON.parse(details)
    const otherdata = JSON.parse(otherdatas)
    const structureTypeBreadcrumbList =
      `{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "${detail && detail.title}",
          "item": "https://tantekos.com/${slug}"
        }]
     }`
    const structureTypeHostel = `{
      "@context": "https://schema.org",
      "@type": "Hostel",
      "image": [${detail && detail.images && detail.images.map(item => `"https://cdn.statically.io/img/i.imgur.com/w=300/${item}"`)}],
      "@id": "https://tantekos.com",
      "name": "${detail && detail.title}",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "${detail && detail.location && detail.location.district}",
        "addressLocality": "",
        "addressRegion": "${detail && detail.location && detail.location.province}",
        "postalCode": "97117",
        "addressCountry": "ID"
      },
      "review": {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "${Math.floor(Math.random() * 5) + 1}",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Bvqento Richard"
        }
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "${detail && detail.location && detail.location.lat_lng.latitude}",
        "longitude": "${detail && detail.location && detail.location.lat_lng.longitude}" 
      },
      "url": "${`https://tantekos.com/${slug}`}",
      "telephone": "${detail && detail.contact_us && detail.contact_us.phone || '+6285243322433'}",
      "priceRange": "Rp50.000 - Rp1.500.000",
      "paymentAccepted": "Cash, Credit Card",
      "currenciesAccepted": "IDR",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "${Math.floor(Math.random() * 5) + 1}",
        "reviewCount": "375"
      },
      "contactPoint" : { 
        "@type" : "ContactPoint",
        "telephone" : "+6285243322433",
        "contactType" : "customer service"
      } 
    }`
    const structureDetailPage = detail && {
      '@graph': [
        JSON.parse(structureTypeHostel),
        JSON.parse(structureTypeBreadcrumbList)
      ]
    };
    return <>
      {
        detail &&
        <NextHead>
          <title>{detail.title}</title>
          <meta name="googlebot" content="index, follow" />
          <meta name="robot" content="index, follow" />
          <meta name="application-name" content="Tantekos" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="title" content={detail.title} />
          <meta name="description" content={detail.description} />
          <meta name="keywords" content={`tantekos, Info Kost, Cari kost, kost, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian, ${detail.keywords}`} />
          <meta property="og:title" content={detail.title} />
          <meta property="og:description" content={detail.description} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`https://tantekos.com/${slug}`} />
          <meta property="og:image" content={`https://cdn.statically.io/img/i.imgur.com/w=300/${detail.images && detail.images[0]}`} />
          <meta property="og:image:alt" content={detail.title} />
          <meta property="og:image:width" content="300" />
          <meta property="og:image:height" content="300" />
          <meta property="og:locale" content="id_ID" />
          <meta property="og:site_name" content="Tantekos" />
          <meta name="keyphrases" content="Info Kost, Cari Kost, Sewa Kost, Kost Bebas, Kost Murah, Kost pasutri, Aplikasi Kost, Aplikasi Pencarian Kost, Aplikasi Info Kost, APlikasi Cari Kost, Kost, Tantekost, Tantekosapp, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
          <meta name="classification" content="Business, Rent House, Sewa Kost, Property, Rent Room, Info Kost, Information, Kost, Room, Cari Kost, Kost Murah, Kost Bebas, Application, Mobile Application, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
          <link rel="canonical" content={`https://tantekos.com/${slug}`} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structureDetailPage) }} />
        </NextHead>
      }
      {
        detail &&
        <div className="main-layout">
          <Slide imagesData={detail.images} imageTitle={detail.title} />
          <nav className="sticky top-0 z-10 bg-white text-gray-700">
            <ol className="list-reset py-3 pl-3 flex">
              <li className="px-2 mr-2 bg-indigo-600 font-bold rounded-full border text-white" onClick={() => Router.push('/')}>Home</li>
              <li>/</li>
              <li className="px-2 mr-2 clamp-1">{detail.title}</li>
            </ol>
          </nav>
          <div className="container mb-3">
            <div>
              <small className="text-gray-700">{moment(detail.date_modified).fromNow()}</small>
              <h1 className="mt-0 mb-3 text-xl capitalize">{detail.title}</h1>
              <div className="mb-3">
                <p className="font-bold">Deskripsi {detail.category}</p>
                <p>{detail.description}</p>
              </div>
              {
                detail && detail.facility && detail.facility.room.length > 0 && detail.facility.room[0] !== "" &&
                <div className="mb-3">
                  <p className="font-bold">Fasilitas Kamar</p>
                  <ul className="mx-4">
                    {detail.facility.room.map((item, index) => <li className="list-disc" key={index}>{item}</li>)}
                  </ul>
                </div>
              }
              {
                detail && detail.facility && detail.facility.bathroom.length > 0 && detail.facility.bathroom[0] !== "" &&
                <div className="mb-3">
                  <p className="font-bold">Fasilitas Kamar Mandi</p>
                  <ul className="mx-4">
                    {detail.facility.bathroom.map((item, index) => <li className="list-disc" key={index}>{item}</li>)}
                  </ul>
                </div>
              }
              {
                detail && detail.facility && detail.facility.share.length > 0 && detail.facility.share[0] !== "" &&
                <div className="mb-3">
                  <p className="font-bold">Fasilitas Bersama</p>
                  <ul className="mx-4">
                    {detail.facility.share.map((item, index) => <li className="list-disc" key={index}>{item}</li>)}
                  </ul>
                </div>
              }
              {
                detail && detail.facility && detail.facility.building.length > 0 && detail.facility.building[0] !== "" &&
                <div className="mb-3">
                  <p className="font-bold">Fasilitas</p>
                  <ul className="mx-4">
                    {detail.facility.building.map((item, index) => <li className="list-disc" key={index}>{item}</li>)}
                  </ul>
                </div>
              }
              <div className="mb-3">
                <p className="pb-1 font-bold">Lokasi {detail.category} <small>({detail.location && detail.location.district}, {detail.location && detail.location.province})</small></p>
                <Peta location={detail && detail.location} />
              </div>
              <div className="border-top mt-3">
                {
                  detail.contact_us.facebook_url !== '' &&
                  <div className="pt-3 text-sm text-indigo-700">
                    <a href={detail.contact_us.facebook_url} target="blank" rel="noreferrer">* Hubungi pengiklan <FaExternalLinkAlt className="ml-1 inline" /> </a>
                  </div>
                }
                <small>
                  * Data dapat berubah sewaktu-waktu
                </small>
              </div>
              <ListKosOthers data={otherdata} detail={detail} />
            </div>
          </div>
          <FooterDetail data={detail} />
        </div>
      }
    </>
  }
}
export const getServerSideProps = async (context) => {
  const detail = await fire
    .firestore().collection('kosts')
    .where('slug', '==', context.query.detail)
    .get()
    .then(doc => ({
      ...doc.docs[0].data(),
    }))
    .catch(err => console.log(err))
  let otherData = []
  const querySnapshot = await fire.firestore().collection('kosts')
    .where('slug', '!=', context.query.detail)
    .get()
  querySnapshot.forEach(doc => {
    otherData.push(doc.data())
  })
  return {
    props: {
      slug: context.query.detail,
      details: JSON.stringify(detail),
      otherdatas: JSON.stringify(otherData)
    },
  };
};
Detail.propTypes = {
  details: string,
  otherdatas: string,
  slug: string
}
Detail.defaultProps = {
  details: null,
  otherdatas: null,
  slug: null
}
export default Detail;