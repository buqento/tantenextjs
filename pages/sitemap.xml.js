import React from "react";
import { DataKos } from '../utils/modals/fakeDb'

const sitemapXml = data => {
  let latestPost = 0;
  let projectsXML = "";

  data.map(post => {
    const postDate = Date.parse(post.date_modified);
    if (!latestPost || postDate > latestPost) {
      latestPost = postDate;
    }
    const projectURL = `https://tantekos.com/${post.slug}`;
    projectsXML += `
      <url>
        <loc>${projectURL}</loc>
        <lastmod>${postDate}</lastmod>
        <priority>0.50</priority>
      </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://tantekos.com/</loc>
        <lastmod>${latestPost}</lastmod>
        <priority>1.00</priority>
      </url>
      ${projectsXML}
    </urlset>`;
};

class Sitemap extends React.Component {
  static async getInitialProps({ res }) {
    res.setHeader("Content-Type", "text/xml");
    res.write(sitemapXml(DataKos));
    res.end();
  }
}

export default Sitemap;