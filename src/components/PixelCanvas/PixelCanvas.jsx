import { useCallback, useEffect, useMemo, useState } from 'react';
import { BASE_CANVAS_COLOR } from '../../constants/colors';
import PixelCell from './PixelCell';
import './PixelCanvas.css';

const getInitialCellSize = (columns, rows) => {
  if (typeof window === 'undefined') {
    return 16;
  }
  const widthBased = window.innerWidth / columns;
  const heightBased = window.innerHeight / rows;
  return Math.max(6, Math.floor(Math.min(widthBased, heightBased)));
};

const PixelCanvas = ({ pixels, columns, rows, onPaintPixel }) => {
  const [isPainting, setIsPainting] = useState(false);
  const [cellSize, setCellSize] = useState(() => getInitialCellSize(columns, rows));

  useEffect(() => {
    const stopPainting = () => setIsPainting(false);
    window.addEventListener('pointerup', stopPainting);
    window.addEventListener('pointercancel', stopPainting);
    return () => {
      window.removeEventListener('pointerup', stopPainting);
      window.removeEventListener('pointercancel', stopPainting);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => setCellSize(getInitialCellSize(columns, rows));
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [columns, rows]);

  const handlePointerDown = useCallback(
    (index, event) => {
      event.preventDefault();
      setIsPainting(true);
      onPaintPixel(index);
    },
    [onPaintPixel],
  );

  const handlePointerEnter = useCallback(
    (index, event) => {
      if (!isPainting) return;
      event.preventDefault();
      onPaintPixel(index);
    },
    [isPainting, onPaintPixel],
  );

  const gridStyle = useMemo(
    () => ({
      gridTemplateColumns: `repeat(${columns}, ${cellSize}px)`,
      gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
    }),
    [cellSize, columns, rows],
  );

  return (
    <section className="canvas-stage">
      <div className="pixel-canvas" role="grid" aria-label="Интерактивный пиксельный холст" style={gridStyle}>
        {pixels.map((color, index) => (
          <PixelCell
            key={index}
            color={color || BASE_CANVAS_COLOR}
            onPointerDown={(event) => handlePointerDown(index, event)}
            onPointerEnter={(event) => handlePointerEnter(index, event)}
          />
        ))}
      </div>
    </section>
  );
};

export default PixelCanvas;
