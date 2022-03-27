import Link from "next/link";
import Head from "next/head";

import styles from "../styles/Page.module.css";

const Page = ({ children, preload, layout }) => {
  return (
    <div className={styles.app}>
      {layout === "sidebar" && (
        <div className={styles.content}>
          <h2>Designing a seamless map experience</h2>
          <p className="large">
            Let’s face it—interactive web maps can take a while to load. The
            mapping library, along with tiles, are probably the biggest assets
            on your website. How can we improve this experience for users?
          </p>
          <h3>Preload</h3>
          <p>
            The preload phase is when your content is downloading. Out of the
            box, most libraries show a solid{" "}
            <a href="/?transition=200&delay=500&zoom=6&panel=false&raster=pop-density&backgroundColor=%23dddddd&skeletonColor=dark&preload=default&postload=default&basemap=mapbox%3A%2F%2Fstyles%2Fmapbox%2Fsatellite-streets-v11&ready=true">
              light gray background
            </a>
            . In most cases, I prefer a subtle{" "}
            <a href="/?transition=200&delay=500&zoom=6&panel=false&raster=pop-density&backgroundColor=%23dddddd&skeletonColor=dark&preload=skeleton&postload=default&basemap=mapbox%3A%2F%2Fstyles%2Fmapbox%2Fsatellite-streets-v11&ready=true">
              skeleton animation
            </a>{" "}
            to suggest the loading state.
          </p>
          <h3>Postload</h3>
          <p>
            The postload phase begins when some of your content is ready. Mapbox
            GL JS renders tiles as they are available{" "}
            <a href="/?transition=200&delay=500&zoom=6&panel=false&raster=pop-density&backgroundColor=%23dddddd&skeletonColor=dark&preload=default&postload=default&basemap=mapbox%3A%2F%2Fstyles%2Fmapbox%2Fsatellite-streets-v11&ready=true">
              by default
            </a>
            . In some cases, it might look better to wait until all of the tiles
            are ready and have them{" "}
            <a href="?count=4&transition=200&delay=500&zoom=6&panel=false&raster=pop-density&backgroundColor=%23dddddd&skeletonColor=dark&preload=default&postload=transition&basemap=mapbox%3A%2F%2Fstyles%2Fmapbox%2Fsatellite-streets-v11&ready=true&layout=sidebar&sidebar=true">
              fade-in
            </a>{" "}
            at once.
          </p>
          <h3>Which configuration is best?</h3>
          <p>
            The answer depends on your use case and somewhat on personal
            preference. What works well on a full-screen map might be different
            than a layout where a map is a smaller component. Use this
            playground as a starting point to see what’s possible.
          </p>
          <h3>Notes</h3>
          <ul>
            <li>
              <strong>delay</strong> adds time to the preload phase to simulate
              a modest internet connection
            </li>
            <li>Built with Next.js and Mapbox GL JS</li>
            <li>
              Source code on{" "}
              <a href="https://github.com/azavea/map-loading-playground">
                Github
              </a>
            </li>
          </ul>
          <h3>Other ways to reduce map slowness</h3>
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
      )}
      <div className="map-wrapper">{children}</div>
    </div>
  );
};

export default Page;
