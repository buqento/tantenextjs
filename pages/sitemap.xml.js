import React from "react";
import { DtArea } from '../utils/modals/Area'
import Generateslug from '../utils/Generateslug'
import fire from '../config/firebase'

const sitemapXml = (dataArea, dataKostKontrakan) => {
  let latestPost = 0;
  let areasXML = ""
  let kostkontrakanXML = ""

  dataArea.map(area => {
    const areaURL = `https://tantekos.com/area/${Generateslug(area.district)}`;
    areasXML += `
      <url>
        <loc>${areaURL}</loc>
      </url>`;
  });

  dataKostKontrakan.map(post => {
    const postDate = post.date_modified;
    if (!latestPost || postDate > latestPost) {
      latestPost = postDate;
    }
    const itemURL = `https://tantekos.com/${Generateslug(post.title)}`;
    kostkontrakanXML += `
      <url>
        <loc>${itemURL}</loc>
        <lastmod>${postDate}</lastmod>
        <priority>0.50</priority>
      </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://tantekos.com/</loc>
        <priority>1.00</priority>
      </url>
      <url>
        <loc>https://tantekos.com/about</loc>
        <priority>1.00</priority>
      </url>
      <url>
        <loc>https://tantekos.com/contact</loc>
        <priority>1.00</priority>
      </url>
      <url>
        <loc>https://tantekos.com/policy</loc>
        <priority>1.00</priority>
      </url>
      ${kostkontrakanXML}
      ${areasXML}
    </urlset>`;
};

class Sitemap extends React.Component {
  static async getInitialProps({ res }) {
    let DtKostKontrakan = []
    const querySnapshot = await fire.firestore().collection('kosts').get()
    querySnapshot.forEach(doc => { DtKostKontrakan.push(doc.data()) })
    res.setHeader("Content-Type", "text/xml");
    res.write(sitemapXml(DtArea, DtKostKontrakan));
    res.end();
  }
}
export default Sitemap;