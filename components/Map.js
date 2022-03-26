import mapboxgl from "!mapbox-gl";
import { useState, useEffect } from "react";
import "mapbox-gl/src/css/mapbox-gl.css";

import places from "/data/places";

const Map = ({ delay, preload, postload, basemap, zoom, raster }) => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiYXphdmVhIiwiYSI6IkFmMFBYUUUifQ.eYn6znWt8NzYOa3OrWop8A";

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!mounted) {
      setTimeout(() => {
        const place = places[getRandomInt(places.length)];
        const map = new mapboxgl.Map({
          cooperativeGestures: true,
          container: "map",
          style: basemap,
          center: [place.Lng, place.Lat],
          minZoom: 0,
          zoom: zoom,
          maxZoom: 18,
        });

        var nav = new mapboxgl.NavigationControl({
          showCompass: false,
          showZoom: true,
        });

        postload === "none" && setLoaded(true);

        map.on("style.load", function () {
          console.log("style.load");

          if (raster === "pop-density") {
            map.addSource("raster-source", {
              type: "raster",
              tiles: [window.location.origin + "/images/tiles/{z}/{x}/{y}.png"],
              minzoom: 0,
              maxzoom: 6,
              tileSize: 512,
            });

            map.addLayer(
              {
                id: "raster-layer",
                type: "raster",
                source: "raster-source",
                paint: {
                  "raster-opacity": 0.8,
                  "raster-resampling": "nearest",
                },
              },
              basemap === "mapbox://styles/mapbox/satellite-v9"
                ? ""
                : "road-label"
            );
          }

          map.on("load", function () {
            setLoaded(true);
          });
        });

        map.addControl(nav, "bottom-right");
      }, delay);
    }
  }, []);

  return (
    <div className="map-container">
      <div id="map" className="map" style={{ opacity: loaded ? 1 : 0 }}></div>
      <style global jsx>{`
        .map-container {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
        }

        .map {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
        }

        .mapboxgl-ctrl button.mapboxgl-ctrl-zoom-out .mapboxgl-ctrl-icon {
          background-image: url("/images/svg/mapboxgl-ctrl-zoom-out.svg");
        }

        .mapboxgl-ctrl button.mapboxgl-ctrl-compass .mapboxgl-ctrl-icon {
          background-image: url("/images/svg/mapboxgl-ctrl-compass.svg");
        }

        .mapboxgl-ctrl button.mapboxgl-ctrl-zoom-in .mapboxgl-ctrl-icon {
          background-image: url("/images/svg/mapboxgl-ctrl-zoom-in.svg");
        }

        a.mapboxgl-ctrl-logo {
          background-image: url("/images/svg/mapboxgl-ctrl-logo.svg");
        }

        .mapboxgl-ctrl-attrib-button {
          background-image: url("/images/svg/mapboxgl-ctrl-attrib.svg");
        }

        .mapboxgl-ctrl-attrib.mapboxgl-compact {
          min-height: 24px;
        }
      `}</style>
    </div>
  );
};

export default Map;
