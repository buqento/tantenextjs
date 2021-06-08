import React from 'react'
import NextHead from 'next/head'
import Router from 'next/router'
import { string } from 'prop-types'
import { FaExternalLinkAlt } from 'react-icons/fa'
import Cash from '../utils/Cash'
import Slide from '../components/Slide'
import Peta from '../components/Peta'
import KostType from '../components/Type'
import NavComponent from '../components/NavComponent'
import FooterDetail from '../components/FooterDetail'
import ReactGa from 'react-ga'
import moment from 'moment'
import ListKosOthers from '../components/ListKosOthers'
import fire from '../configurations/firebase'
import Facilities from '../components/Facilities'
import Share from '../components/Share'
import Ads from '../components/Ads'
import Footer from '../components/Footer'
import NavMobile from '../components/NavMobile'
import AdSense from 'react-adsense';
class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      otherData: null,
      showAlert: false
    }
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
      "image": [${detail && detail.images && detail.images.map(item => `"https://cdn.statically.io/img/i.imgur.com/${item}"`)}],
      "@id": "https://tantekos.com",
      "name": "${detail && detail.name}",
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
      "priceRange": "Rp50.000 - ${detail && detail.price && detail.price.start_from}",
      "paymentAccepted": "Cash, Credit Card",
      "currenciesAccepted": "IDR",
      "contactPoint" : { 
        "@type" : "ContactPoint",
        "telephone" : "${detail && detail.contact_us && detail.contact_us.phone || '+6285243322433'}",
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
          <meta name="description" content={detail.description} />
          <meta name="keywords" content={`infokost, cari kos, cari kost, kost murah, cari kost murah, kost eksklusif, kost exclusive, kost mewah, kost kostan, kost bebas, kos lv, olx kost, rukita kost, kost minimalis, kost pelangi, reddoorz kost, kost orange, kos flamboyan, ${detail.keywords}`} />
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
          <meta property="fb:app_id" content="3234331779955939" />
          <meta name="keyphrases" content="Info Kost, Cari Kost, Sewa Kost, Kost Bebas, Kost Murah, Kost pasutri, Aplikasi Kost, Aplikasi Pencarian Kost, Aplikasi Info Kost, APlikasi Cari Kost, Kost, Tantekost, Tantekosapp, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
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
          {/* google ads */}
          <div className='opacity-0' style={{ marginTop: '100px' }}>
            <AdSense.Google
              client='ca-pub-1434074630735871'
              slot='7863233219'
              className="h-64 w-full"
              format=''
            />
          </div>
        </div>
      }

      {
        detail &&
        <div className="z-0 grid sm:grid-cols-2 md:grid-cols-3 gap-4" style={{ marginTop: '-355px' }}>

          {/* price/title/desc */}
          <div className="mt-3">
            <div className="text-left mx-3">
              <div className="mb-1 flex">
                <div className="self-center flex-auto pr-4">
                  <div className="mt-n2">
                    <span className="text-3xl font-bold">{Cash(detail.price.start_from)}</span>
                    <span className="text-xs text-gray-700">/{detail.price.duration}</span>
                  </div>
                </div>
                <div>
                  <Share detail={detail} />
                </div>
              </div>

              {/* type */}
              <div className="my-2 text-left uppercase text-indigo-700"><KostType item={detail.type} /></div>

              {/* title */}
              <h1 className="mt-0 text-xl capitalize">{detail.title}</h1>

              {/* date modified */}
              <small className="text-gray-700 uppercase">{moment(detail.date_modified).lang('id').fromNow()} &middot; {detail.hit} kali dilihat</small>

              {/* description */}
              <div className="my-3">
                <h2 className="font-bold">Deskripsi*</h2>
                <div dangerouslySetInnerHTML={{ __html: detail.description }} />
              </div>

              {/* facilities */}
              {
                detail && detail.facility && detail.facility.room.length > 0 && detail.facility.room[0] !== "" &&
                <div className="mb-4">
                  <h2 className="font-bold">Fasilitas Kamar</h2>
                  <Facilities items={detail.facility.room} />
                </div>
              }
              {
                detail && detail.facility && detail.facility.bathroom.length > 0 && detail.facility.bathroom[0] !== "" &&
                <div className="mb-4">
                  <h2 className="font-bold">Fasilitas Kamar Mandi</h2>
                  <Facilities items={detail.facility.bathroom} />
                </div>
              }
              {
                detail && detail.facility && detail.facility.share.length > 0 && detail.facility.share[0] !== "" &&
                <div className="mb-4">
                  <h2 className="font-bold">Fasilitas Bersama</h2>
                  <Facilities items={detail.facility.share} />
                </div>
              }
            </div>
          </div>

          {/* location */}
          {
            detail.location &&
            <div className="my-2 mx-3">
              <div className="mb-3">
                <h2 className="pb-2 font-bold">Lokasi <small>({detail.location.district}, {detail.location.city}, {detail.location.province})</small></h2>
                <Peta location={detail.location} zoom={10} />
                <a href={`https://www.google.com/maps/search/?api=1&query=${detail.location.lat_lng.latitude},${detail.location.lat_lng.longitude}`} target="_blank">
                  <div className="my-3 uppercase underline text-indigo-700 font-bold">Lihat Peta Google <FaExternalLinkAlt className="inline ml-1 mb-1" /></div>
                </a>
              </div>
              <div className="mt-3">
                <small>* Data kost dapat berubah sewaktu-waktu.</small>
              </div>
            </div>
          }

          {/* other */}
          <div className="mt-3 mx-3">
            {/* google ads */}
            <div>
              <AdSense.Google
                client='ca-pub-1434074630735871'
                slot='7863233219'
                className="h-64 w-full"
                format=''
              />
            </div>
            {/* <Ads /> */}
            <ListKosOthers data={otherdata} detail={detail} />
          </div>
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
  if (!detail) return { notFound: true }
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