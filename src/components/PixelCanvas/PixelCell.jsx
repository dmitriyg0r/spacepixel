const PixelCell = ({ color, onPointerDown, onPointerEnter }) => (
  <div
    role="gridcell"
    tabIndex={-1}
    className="pixel-cell"
    style={{ backgroundColor: color }}
    onPointerDown={onPointerDown}
    onPointerEnter={onPointerEnter}
  />
);

export default PixelCell;
