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
import fire from '../configurations/firebase'
import Facilities from '../components/Facilities'
class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = { otherData: null, showAlert: false }
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
  handleCloseAlert = () => {
    this.setState({ showAlert: false })
    Router.push('/favorites')
  }
  handleShowAlert = () => {
    this.setState({ showAlert: true })
    setTimeout(function () {
      this.setState({ showAlert: false })
    }.bind(this), 5000)
  }
  render() {
    const { slug, details, otherdatas } = this.props
    const { showAlert } = this.state
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
          <nav className="sticky top-0 z-10 bg-white border-bottom">
            <ol className="font-bold list-reset py-2 pl-3 flex">
              <li className="px-2 py-1 mr-2 bg-indigo-700 rounded-full border text-white uppercase" onClick={() => Router.push('/')}>Home</li>
              <li className="pt-1">/</li>
              <li className="pt-1 mx-2 clamp-1">{detail.name}</li>
            </ol>
          </nav>
          <div className="container mt-2 mb-3">
            <div>
              <small className="text-gray-700">{moment(detail.date_modified).lang('id').fromNow()}</small>
              <h1 className="mt-0 mb-3 text-xl capitalize">{detail.title}</h1>
              <div className="mb-3">
                <p className="font-bold">Deskripsi {detail.category}</p>
                <p>{detail.description}</p>
              </div>
              {
                detail && detail.facility && detail.facility.room.length > 0 && detail.facility.room[0] !== "" &&
                <div className="mb-3">
                  <p className="font-bold">Fasilitas Kamar</p>
                  <Facilities items={detail.facility.room} />
                </div>
              }
              {
                detail && detail.facility && detail.facility.bathroom.length > 0 && detail.facility.bathroom[0] !== "" &&
                <div className="mb-3">
                  <p className="font-bold">Fasilitas Kamar Mandi</p>
                  <Facilities items={detail.facility.bathroom} />
                </div>
              }
              {
                detail && detail.facility && detail.facility.share.length > 0 && detail.facility.share[0] !== "" &&
                <div className="mb-3">
                  <p className="font-bold">Fasilitas Bersama</p>
                  <Facilities items={detail.facility.share} />
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
                <p className="pb-1 font-bold">Lokasi {detail.category} <small>({detail.location && detail.location.district}, {detail.location && detail.location.city}, {detail.location && detail.location.province})</small></p>
                <Peta location={detail && detail.location} />
              </div>
              <div className="border-top mt-3">
                {
                  detail.contact_us.facebook_url !== '' &&
                  <div className="pt-3 text-sm text-indigo-700">
                    <a href={detail.contact_us.facebook_url} target="blank" rel="noreferrer">* Lihat informasi pengiklan <FaExternalLinkAlt className="mb-1 inline" /> </a>
                  </div>
                }
                <small>
                  * Data dapat berubah sewaktu-waktu
                </small>
              </div>
              <ListKosOthers data={otherdata} detail={detail} />
              <div className="border-top">
                <a href="/search">
                  <div className="rounded-full bg-indigo-700 align-middle rouded text-center text-white font-bold uppercase my-3 py-3">
                    <span>Cari {detail && detail.category} Lainnya</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <FooterDetail data={detail} callbackFromParent={this.handleShowAlert} />
        </div>
      }
      {
        detail && showAlert &&
        <div className="alert-banner w-full fixed top-0 z-40 bg-green-500" onClick={this.handleCloseAlert}>
          <input type="checkbox" className="hidden" id="banneralert" />
          <label className="cursor-pointer flex items-center justify-between w-full px-3 py-3 m-0 text-white" title="Tutup" htmlFor="banneralert">
            <span className="text-white">{detail.category} tersimpan ke favorit Kamu</span>
            <svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
              <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
            </svg>
          </label>
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
      id: doc.docs[0].id,
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