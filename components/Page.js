import Link from "next/link";
import Head from "next/head";

import styles from "../styles/Page.module.css";

const Page = ({ children, preload }) => {
  return (
    <div className={styles.app}>
      <div className={styles.content}>
        <h2>Designing a seamless map experience</h2>
        <p className="large">
          Let’s face it—interactive web maps can take a while to load. The
          mapping library, along with tiles, are probably the biggest assets on
          your website. How can we improve this experience for users?
        </p>
        <h3>Preload</h3>
        <p>
          The preload phase is when your content is downloading. Out of the box,
          most libraries show a solid light{" "}
          <a href="http://localhost:3010/?count=3&transition=200&delay=1000&zoom=7&raster=pop-density&backgroundColor=%23dddddd&skeletonColor=dark&preload=solid&postload=transition&basemap=mapbox%3A%2F%2Fstyles%2Fmapbox%2Fsatellite-v9&ready=true">
            gray background
          </a>
          . I personally prefer a subtle{" "}
          <a href="http://localhost:3010/?count=4&transition=200&delay=1000&zoom=7&raster=pop-density&backgroundColor=%23dddddd&skeletonColor=dark&preload=skeleton&postload=transition&basemap=mapbox%3A%2F%2Fstyles%2Fmapbox%2Fsatellite-v9&ready=true">
            skeleton animation
          </a>
          .
        </p>
        <h3>Postload</h3>
        <p>
          The postload phase is when some of your content is ready. Mapbox GL JS
          will display content{" "}
          <a href="http://localhost:3010/?count=14&transition=200&delay=1000&zoom=7&raster=pop-density&backgroundColor=%23dddddd&skeletonColor=dark&preload=skeleton&postload=none&basemap=mapbox%3A%2F%2Fstyles%2Fmapbox%2Fsatellite-streets-v11&ready=true">
            as it arrives
          </a>
          , which looks like individual tiles rendering one at a time. I find
          this works well for a full-screen map, but on a page with other
          content, I prefer a{" "}
          <a href="http://localhost:3010/?count=15&transition=200&delay=1000&zoom=7&raster=pop-density&backgroundColor=%23dddddd&skeletonColor=dark&preload=skeleton&postload=transition&basemap=mapbox%3A%2F%2Fstyles%2Fmapbox%2Fsatellite-streets-v11&ready=true">
            fade-in
          </a>{" "}
          after everything is ready.
        </p>
        <h3>What’s the best combination?</h3>
        <p>
          I built this playground for a quick way to try different combinations.
          I think the answer depends part on use case and part on personal
          preference. If you have other techniques you like,{" "}
          <a href="https://twitter.com/jefffrankl">let me know</a>!
        </p>
        <h3>Notes</h3>
        <ul>
          <li>
            <strong>delay</strong> adds time to the preload phase to simulate a
            modest internet connection
          </li>
          <li>Built with Next.js and Mapbox GL JS</li>
        </ul>
        <h3>Other ways to remove map jank</h3>
        <ul>
          <li>
            If you don’t need interactivity, consider pre-rendering maps with{" "}
            <a href="https://github.com/d3/d3-geo">d3</a>, using a{" "}
            <a href="https://docs.mapbox.com/api/maps/static-images/">
              static image API
            </a>
            , or a lightweight library like{" "}
            <a href="https://protomaps.com/">Protomaps</a>
          </li>
          <li>
            If you are using a Mapbox Studio basemap, you can{" "}
            <a href="https://docs.mapbox.com/help/troubleshooting/mapbox-gl-js-performance/#remove-unused-features">
              remove unused features
            </a>{" "}
            from your vector tiles
          </li>
        </ul>
      </div>
      <div className="map-wrapper">{children}</div>
    </div>
  );
};

export default Page;
