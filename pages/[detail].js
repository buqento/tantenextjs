import React from 'react'
import NextHead from 'next/head'
import Router from 'next/router'
import { string } from 'prop-types'
import { FaExternalLinkAlt } from 'react-icons/fa'
import Cash from '../utils/Cash'
import Slide from '../components/Slide'
import Peta from '../components/Peta'
import NavComponent from '../components/NavComponent'
import FooterDetail from '../components/FooterDetail'
import ReactGa from 'react-ga'
import moment from 'moment'
import ListKosOthers from '../components/ListKosOthers'
import fire from '../configurations/firebase'
import Facilities from '../components/Facilities'
import { type } from '../components/Campaign'
import Share from '../components/Share'
import Footer from '../components/Footer'
import NavMobile from '../components/NavMobile'
import { Comments, FacebookProvider } from 'react-facebook';
import Duration from '../components/Duration'
class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = { otherData: null, showAlert: false }
    this.myRef = React.createRef()
    this.handleHit = this.handleHit.bind(this)
  }
  async componentDidMount() {
    const { details } = this.props
    const detail = JSON.parse(details)
    if (window.location.hostname !== 'localhost') {
      this.handleHit(detail.id, detail.hit + 1)
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
  async handleHit(id, hit) {
    await fire.firestore().collection("kosts").doc(id).update({ hit })
      .catch(err => { console.log(err) })
  }
  render() {
    const { slug, details, otherdatas } = this.props
    const { showAlert } = this.state
    const detail = JSON.parse(details)
    const descriptionDetail = detail && detail.description.replace(/&nbsp;|<\/?[^>]+(>|$)/g, " ")
    const otherdata = JSON.parse(otherdatas)
    const url = "https://tantekos.com/"
    const structureTypeBreadcrumbList =
      `{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "${detail && detail.title}",
          "item": "${url + slug}"
        }]
     }`
    const structureTypeHostel = `{
      "@context": "https://schema.org",
      "@type": "Hostel",
      "image": [${detail && detail.images && detail.images.map(item => `"https://cdn.statically.io/img/i.imgur.com/${item}"`)}],
      "@id": "${url}",
      "name": "${detail && detail.name}",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "${detail && detail.location && detail.location.district}",
        "addressLocality": "",
        "addressRegion": "${detail && detail.location && detail.location.province}",
        "postalCode": "",
        "addressCountry": "ID"
      },
      "numberOfRooms": "${Math.floor(Math.random() * 20) + 1}",
      "petsAllowed": "${false}",
      "starRating": "${Math.floor(Math.random() * 5) + 1}",
      "checkinTime": "14:00:00-00:00",
      "checkoutTime": "12:00:00-00:00",
      "availableLanguage": {
        "@type": "Language",
        "name": "Indonesia",
        "alternateName": "id"
      },
      "openingHours": "Mo,Tu,We,Th,Fri,Sat 09:00-12:00",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "${detail && detail.location && detail.location.lat_lng.latitude}",
        "longitude": "${detail && detail.location && detail.location.lat_lng.longitude}" 
      },
      "url": "${url + slug}",
      "telephone": "${detail && detail.contact_us && detail.contact_us.phone || ''}",
      "priceRange": "Rp50.000 - ${detail && detail.price && detail.price.start_from}",
      "paymentAccepted": "Cash, Credit Card",
      "currenciesAccepted": "IDR",
      "contactPoint" : { 
        "@type" : "ContactPoint",
        "telephone" : "${detail && detail.contact_us && detail.contact_us.phone || ''}",
        "contactType" : "customer service"
      } 
    }`
    const structureDetailPage = detail && {
      '@graph': [
        JSON.parse(structureTypeHostel),
        JSON.parse(structureTypeBreadcrumbList)
      ]
    }
    return <>
      <NavComponent />
      {
        detail &&
        <NextHead>
          <title>{detail.title}</title>
          <meta name="googlebot" content="index, follow" />
          <meta name="robot" content="index, follow" />
          <meta name="application-name" content="Tantekos" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="title" content={detail.title} />
          <meta name="description" content={descriptionDetail} />
          <meta name="keywords" content={`infokost, cari kos, cari kost, kost murah, cari kost murah, kost eksklusif, kost exclusive, kost mewah, kost kostan, kost bebas, kos lv, olx kost, rukita kost, kost minimalis, kost pelangi, reddoorz kost, kost orange, kos flamboyan, ${detail.keywords}`} />
          <meta property="og:title" content={detail.title} />
          <meta property="og:description" content={descriptionDetail} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`https://tantekos.com/${slug}`} />
          <meta property="og:image" content={`https://cdn.statically.io/img/i.imgur.com/w=300/${detail.images && detail.images[0]}`} />
          <meta property="og:image:alt" content={detail.title} />
          <meta property="og:image:width" content="300" />
          <meta property="og:image:height" content="300" />
          <meta property="og:locale" content="id_ID" />
          <meta property="og:site_name" content="Tantekos" />
          <meta property="fb:app_id" content="3234331779955939" />
          <meta name="keyphrases" content={`infokost, cari kos, cari kost, kost murah, cari kost murah, kost eksklusif, kost exclusive, kost mewah, kost kostan, kost bebas, kos lv, olx kost, rukita kost, kost minimalis, kost pelangi, reddoorz kost, kost orange, kos flamboyan, ${detail.keywords}`} />
          <meta name="classification" content="Business, Rent House, Sewa Kost, Property, Rent Room, Info Kost, Information, Kost, Room, Cari Kost, Kost Murah, Kost Bebas, Application, Mobile Application, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
          <link rel="canonical" content={`https://tantekos.com/${slug}`} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structureDetailPage) }} />
        </NextHead>
      }

      {
        /* slide */
        detail &&
        <div>
          <Slide imagesData={detail.images} imageTitle={detail.title} />
          <FooterDetail data={detail} callbackFromParent={this.handleShowAlert} />
        </div>
      }

      {
        detail &&
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">

          <div className="mt-3 mx-3">

            {/* search by google */}
            <div className="mb-3">
              <div class="gcse-search" />
            </div>

            {/* price/share */}
            <div className="mb-1 flex">
              <div className="self-center flex-auto pr-4">
                <div className="mt-n2 font-bold">
                  <span className="text-3xl">{Cash(detail.price.start_from)}</span>
                  <span className="text-xs text-gray-700 uppercase"> / {Duration(detail.price.duration)}</span>
                </div>
              </div>
              <div>
                <Share detail={detail} />
              </div>
            </div>

            {/* type */}
            <div className="my-2 text-left uppercase text-green-600 font-bold">{type(detail.type)}</div>

            {/* date modified */}
            <small className="text-gray-700 uppercase">{moment(detail.date_modified).fromNow()} &middot; {detail.hit} Views</small>

            {/* title */}
            <h1 className="my-4 text-xl capitalize font-bold">{detail.title}</h1>

            {/* description */}
            <div className="my-3">
              <h2 className="font-bold">Description *</h2>
              <div dangerouslySetInnerHTML={{ __html: detail.description }} />
            </div>

            {/* facilities */}
            {
              detail && detail.facility && detail.facility.room.length > 0 && detail.facility.room[0] !== "" &&
              <div className="mb-4">
                <h2 className="font-bold">Room Facilities</h2>
                <Facilities items={detail.facility.room} />
              </div>
            }
            {
              detail && detail.facility && detail.facility.bathroom.length > 0 && detail.facility.bathroom[0] !== "" &&
              <div className="mb-4">
                <h2 className="font-bold">Bathroom Facilities</h2>
                <Facilities items={detail.facility.bathroom} />
              </div>
            }
            {
              detail && detail.facility && detail.facility.share.length > 0 && detail.facility.share[0] !== "" &&
              <div>
                <h2 className="font-bold">Shared Facilities</h2>
                <Facilities items={detail.facility.share} />
              </div>
            }
          </div>

          {/* location */}
          {
            detail.location &&
            <div className="mt-3 mx-3">
              <div className="mb-3">
                <h2 className="mb-3 font-bold">Room Location <small>({detail.location.district}, {detail.location.city}, {detail.location.province})</small></h2>
                <Peta location={detail.location} zoom={10} />
                <a href={`https://www.google.com/maps/search/?api=1&query=${detail.location.lat_lng.latitude},${detail.location.lat_lng.longitude}`} target="_blank">
                  <div className="my-3 uppercase underline text-indigo-700 font-bold">View in Google Map <FaExternalLinkAlt className="inline ml-1 mb-1" /></div>
                </a>
              </div>
              <div className="mt-3">
                <small>* Room data can change at any time.</small>
              </div>

              {/* facebook comment */}
              <div className="my-3 bg-gray-100">
                <FacebookProvider appId={process.env.NEXT_PUBLIC_REACT_APP_FB_CLIENT_ID}>
                  <Comments width={`100%`} href={`https://tantekos.com/${detail.slug}`} />
                </FacebookProvider>
              </div>
            </div>
          }

          {/* other */}
          <div className="mx-3">
            <ListKosOthers data={otherdata} detail={detail} />
          </div>
        </div>
      }

      {
        detail && showAlert &&
        <div className="alert-banner w-full fixed top-0 z-40 bg-green-500" onClick={this.handleCloseAlert}>
          <input type="checkbox" className="hidden" id="banneralert" />
          <label className="cursor-pointer flex items-center justify-between w-full px-3 py-3 m-0 text-white" title="Tutup" htmlFor="banneralert">
            <span className="text-white">Room saved to Your favorite</span>
            <svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
              <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
            </svg>
          </label>
        </div>
      }
      <Footer />
      <div className="xs:block sm:hidden md:hidden lg:hidden">
        <NavMobile />
      </div>
    </>
  }
}
export const getServerSideProps = async (context) => {
  const detail = await fire
    .firestore().collection('kosts')
    .where('slug', '==', context.query.detail)
    .where('is_active', '==', true)
    .get()
    .then(doc => ({
      id: doc.docs[0].id,
      ...doc.docs[0].data(),
    }))
    .catch(err => console.log(err))
  if (!detail) return {
    redirect: {
      permanent: false,
      destination: '/'
    }
  }
  let otherData = []
  const querySnapshot = await fire.firestore().collection('kosts')
    .where('slug', '!=', context.query.detail)
    .where('location.district', '==', detail.location.district)
    .where('is_active', '==', true)
    .get()
  querySnapshot.forEach(doc => {
    otherData.push({
      id: doc.id,
      ...doc.data()
    })
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