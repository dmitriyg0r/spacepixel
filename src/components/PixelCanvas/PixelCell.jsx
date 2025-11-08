import { memo } from 'react';

const PixelCell = memo(({ color, onPointerDown, onPointerEnter }) => (
  <div
    role="gridcell"
    tabIndex={-1}
    className="pixel-cell"
    style={{ backgroundColor: color }}
    onPointerDown={onPointerDown}
    onPointerEnter={onPointerEnter}
  />
));

PixelCell.displayName = 'PixelCell';

export default PixelCell;
