import PropTypes from "prop-types";

const icons = {
  "chevron-down": {
    path: "M432.6 209.3l-191.1 183.1C235.1 397.8 229.1 400 224 400s-11.97-2.219-16.59-6.688L15.41 209.3C5.814 200.2 5.502 184.1 14.69 175.4c9.125-9.625 24.38-9.938 33.91-.7187L224 342.8l175.4-168c9.5-9.219 24.78-8.906 33.91 .7187C442.5 184.1 442.2 200.2 432.6 209.3z",
    viewBox: "0 0 448 512",
  },
  "chevron-up": {
    path: "M15.41 302.7l191.1-183.1C212 114.2 218 111.1 224 111.1s11.97 2.219 16.59 6.688l191.1 183.1c9.594 9.152 9.906 24.34 .7187 33.9c-9.125 9.625-24.38 9.938-33.91 .7187L224 169.2l-175.4 168c-9.5 9.219-24.78 8.906-33.91-.7187C5.502 327 5.814 311.8 15.41 302.7z",
    viewBox: "0 0 448 512",
  },
  bars: {
    path: "M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z",
    viewBox: "0 0 448 512",
  },
};

const Icon = ({ name, color, overlayColor, size }) => {
  const { path, pathOverlay, viewBox } = icons[name];
  return (
    <svg style={{ height: `${size}em`, width: `${size}em` }} viewBox={viewBox}>
      <path d={path} style={{ fill: color ? color : "currentColor" }} />
      {pathOverlay && (
        <path
          d={pathOverlay}
          style={{ fill: overlayColor ? overlayColor : "currentColor" }}
        />
      )}
    </svg>
  );
};

Icon.defaultProps = {
  size: 1,
  overlayColor: "#fff",
};

Icon.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  overlayColor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Icon;
