import Head from "next/head";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useState, useEffect, useReducer } from "react";

import Page from "/components/Page";
import Icon from "/components/Icon";
import Map from "/components/Map";
import styles from "/styles/App.module.css";

const configDefault = {
  count: 1,
  transition: 200,
  delay: 500,
  zoom: 6,
  panel: true,
  raster: "pop-density",
  backgroundColor: "#dddddd",
  skeletonColor: "dark",
  preload: "skeleton",
  postload: "transition",
  basemap: "mapbox://styles/mapbox/satellite-streets-v11",
  ready: false,
  layout: "sidebar",
};

function reducer(state, action, payload) {
  switch (action.type) {
    case "update":
      return { ...state, isRunning: true };
    case "stop":
      return { ...state, isRunning: false };
    case "reset":
      return { isRunning: false, time: 0 };
    case "TOGGLE_PANEL":
      return {
        ...state,
        panel: !state.panel,
      };
    case "ROUTER_READY":
      return {
        ...state,
        ...action.payload,
        count: state.count + 1,
        panel:
          typeof action.payload.panel === "undefined"
            ? true
            : action.payload.panel === "true",
        ready: true,
      };
    case "FORM_CHANGE":
      return {
        ...state,
        [action.field]: action.payload,
      };
    case "FORM_CHANGE_INSTANT":
      return {
        ...state,
        [action.field]: action.payload,
        count: state.count + 1,
      };
    case "UPDATE_MAP":
      return { ...state, count: state.count + 1 };
    default:
      throw new Error();
  }
}

export default function Detail({ community, communities }) {
  function handleFormChange(e, instant) {
    dispatch({
      type: instant ? "FORM_CHANGE_INSTANT" : "FORM_CHANGE",
      field: e.target.name,
      payload: e.target.value,
    });
  }

  const router = useRouter();
  const configParameters = router.query;

  const initialState = { ...configDefault, ...configParameters };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (router.isReady) {
      dispatch({
        type: "ROUTER_READY",
        payload: configParameters,
      });
    }
  }, [router.isReady]);

  useEffect(() => {
    router.push({
      pathname: "/",
      query: state,
    });
  }, [state]);

  function updateMap() {
    dispatch({ type: "UPDATE_MAP" });
  }

  function togglePanel() {
    dispatch({ type: "TOGGLE_PANEL" });
  }

  return (
    <Page preload={state.preload} layout={state.layout}>
      <Head>
        <title>Map Loading Playground</title>
        <meta
          name="description"
          content="Improve perceived loading experience for "
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {state.ready && (
        <div className="panel">
          <button onClick={togglePanel} className="heading-button">
            <h3 role="button">
              <span>Configuration</span>
              <Icon name={state.panel ? "chevron-down" : "chevron-up"} />
            </h3>
          </button>
          {state.panel && (
            <div className="fields">
              <h4>Preload</h4>
              <fieldset>
                <label htmlFor="preload">Type</label>
                <select
                  defaultValue={state.preload}
                  onChange={(e) => handleFormChange(e)}
                  name="preload"
                  id="preload"
                >
                  <option value="skeleton">Skeleton</option>
                  <option value="solid">Solid color</option>
                  <option value="spinner">Spinner</option>
                  <option value="default">Default</option>
                </select>
              </fieldset>
              {state.preload === "skeleton" && (
                <fieldset>
                  <label htmlFor="skeletonColor">Color</label>
                  <select
                    onChange={(e) => handleFormChange(e)}
                    name="skeletonColor"
                    id="skeletonColor"
                    defaultValue={state.skeletonColor}
                  >
                    <option value="light">Light gray</option>
                    <option value="dark">Dark gray</option>
                  </select>
                </fieldset>
              )}
              {(state.preload === "solid" || state.preload === "spinner") && (
                <fieldset>
                  <label htmlFor="backgroundColor">Color</label>
                  <input
                    onChange={(e) => handleFormChange(e)}
                    type="color"
                    defaultValue={state.backgroundColor}
                    name="backgroundColor"
                    id="backgroundColor"
                  />
                </fieldset>
              )}
              <hr />
              <h4>Postload</h4>
              <fieldset>
                <label htmlFor="postload">Type</label>
                <select
                  defaultValue={state.postload}
                  onChange={(e) => handleFormChange(e)}
                  name="postload"
                  id="postload"
                >
                  <option value="transition">Fade in</option>
                  <option value="instant">Instant</option>
                  <option value="default">Default</option>
                </select>
              </fieldset>
              {state.postload === "transition" && (
                <fieldset>
                  <label htmlFor="transition">Transition</label>
                  <input
                    onChange={(e) => handleFormChange(e)}
                    type="number"
                    name="transition"
                    min="0"
                    defaultValue={state.transition}
                    id="transition"
                  />
                </fieldset>
              )}
              <hr />
              <h4>Map setup</h4>
              <fieldset>
                <label htmlFor="delay">Delay</label>
                <input
                  onChange={(e) => handleFormChange(e)}
                  type="number"
                  name="delay"
                  min="0"
                  defaultValue={state.delay}
                  id="delay"
                />
              </fieldset>
              <fieldset>
                <label htmlFor="basemap">Basemap</label>
                <select
                  defaultValue={state.basemap}
                  onChange={(e) => handleFormChange(e)}
                  name="basemap"
                  id="basemap"
                >
                  <option value="mapbox://styles/mapbox/satellite-streets-v11">
                    Satellite streets
                  </option>
                  <option value="mapbox://styles/mapbox/satellite-v9">
                    Satellite
                  </option>
                  <option value="mapbox://styles/mapbox/streets-v11">
                    Streets
                  </option>
                  <option value="mapbox://styles/mapbox/light-v10">
                    Light
                  </option>
                  <option value="mapbox://styles/mapbox/dark-v10">Dark</option>
                </select>
              </fieldset>
              <fieldset>
                <label htmlFor="raster">Raster</label>
                <select
                  defaultValue={state.raster}
                  onChange={(e) => handleFormChange(e)}
                  name="raster"
                  id="raster"
                >
                  <option value="pop-density">Pop. density</option>
                  <option value="none">None</option>
                </select>
              </fieldset>
              <fieldset>
                <label htmlFor="zoom">Zoom</label>
                <input
                  onChange={(e) => handleFormChange(e)}
                  type="number"
                  name="zoom"
                  min="0"
                  defaultValue={state.zoom}
                  id="zoom"
                />
              </fieldset>
              <fieldset>
                <label htmlFor="layout">Layout</label>
                <select
                  defaultValue={state.layout}
                  onChange={(e) => handleFormChange(e, true)}
                  name="layout"
                  id="layout"
                >
                  <option value="sidebar">Sidebar</option>
                  <option value="maponly">Map only</option>
                </select>
              </fieldset>
            </div>
          )}
          <button className="reload" onClick={updateMap}>
            Reload map
          </button>
        </div>
      )}
      <div className="spinner"></div>
      {state.ready && (
        <Map
          delay={state.delay}
          preload={state.preload}
          postload={state.postload}
          key={state.count}
          basemap={state.basemap}
          zoom={state.zoom}
          raster={state.raster}
        />
      )}
      <style global jsx>{`
        ${
          state.postload === "transition"
            ? `.map {
            transition: opacity ${state.transition}ms ease-in-out
          }`
            : ""
        }
        ${
          state.preload === "spinner"
            ? `.spinner {
                height: 48px;
                width: 48px;
                color: rgba(90, 90, 90, 0.2);
                position: absolute;
                display: inline-block;
                border: 5px solid;
                border-radius: 50%;
                border-right-color: #5a5a5a;
                animation: rotate 1s linear infinite;
                margin: auto;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0; 
              }

              @keyframes rotate {
                0% { transform: rotate(0); }
                100% { transform: rotate(360deg); } 
              }`
            : ""
        }
        fieldset {
          display: flex;
          margin-bottom: var(--space-100);
        }
        .fields {
          margin-bottom: var(--space-300);
        }
        .panel {
          position: absolute;
          z-index: 90;
          background-color: #fff;
          padding: 10px;
          top: 10px;

          right: 10px;
          width: 240px;
          font-size: var(--size-500);
          box-shadow: 0 0 0 1px rgb(17 20 24 / 10%), 0 0 0 rgb(17 20 24 / 0%), 0 1px 1px rgb(17 20 24 / 20%);
        }
        .heading-button {
          background: none;
          padding: 0;
          border: none;
          text-align: left;
          width: 100%;
          cursor: pointer;
        }
        h3 {
          margin-bottom: var(--space-300);
          margin-top: var(--space-400);
        }
        .heading-button > h3 {
          font-size: var(--size-600);
          display: flex;
        }
        h3 > span {
          flex: 1;
        }
        label {
          width: 90px;
          display: inline-block;
          font-weight: var(--weight-medium);
          color: var(--color-heading);
        }
        .reload {
          background: var(--primary);
          border: none;
          padding: var(--space-200);
          width: 100%;
          font-weight: var(--weight-bold);
          color: #fff;
          border-radius: 2px;
          cursor: pointer;
        }
        .reload:hover {
          background: #1658D5;
        }
        input,
        select {
          flex: 1;
          height: 20px;
          width: 100px;
        }
        h4 {
           font-size: var(--size-500);
           margin: var(--space-100) 0;
        }
        .map-wrapper {
          flex: 1;
          position: relative;
          background-size: 400% 100%;
          background-image: linear-gradient(270deg,#bbb,#ddd,#ddd,#bbb);
          ${
            state.preload === "solid" || state.preload === "spinner"
              ? `background: ${state.backgroundColor};`
              : ""
          }
          ${state.preload === "default" ? `background: #ccc;` : ""}
          ${
            state.preload === "skeleton" && state.skeletonColor === "dark"
              ? `background-image: linear-gradient(
            270deg,
            #111,
            #333,
            #333,
            #111);
          `
              : ""
          }
          animation: skeleton 8s ease-in-out infinite;
          animation-direction: alternate;
        }
        ${
          state.preload === "skeleton"
            ? `@keyframes skeleton {
                  0% {
                    background-position: 100% 0;
                  }
                  to {
                    background-position: -200% 0;
                  }
              }`
            : ""
        }
        }
      `}</style>
    </Page>
  );
}
