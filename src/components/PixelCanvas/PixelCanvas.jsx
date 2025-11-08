import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { BASE_CANVAS_COLOR } from '../../constants/colors';
import PixelCell from './PixelCell';
import './PixelCanvas.css';

const CELL_SIZE = 16; // Фиксированный размер ячейки
const BUFFER = 5; // Дополнительные ячейки вокруг видимой области

const PixelCanvas = ({ pixels, columns, rows, onPaintPixel, viewport, onViewportChange, activeTool }) => {
  const [isPainting, setIsPainting] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const canvasRef = useRef(null);
  const panStartRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const stopPainting = () => {
      setIsPainting(false);
      setIsPanning(false);
    };
    window.addEventListener('pointerup', stopPainting);
    window.addEventListener('pointercancel', stopPainting);
    return () => {
      window.removeEventListener('pointerup', stopPainting);
      window.removeEventListener('pointercancel', stopPainting);
    };
  }, []);

  // Вычисление видимой области с буфером
  const visibleArea = useMemo(() => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    const startCol = Math.max(0, Math.floor(-viewport.x / CELL_SIZE) - BUFFER);
    const endCol = Math.min(columns, Math.ceil((-viewport.x + viewportWidth) / CELL_SIZE) + BUFFER);
    const startRow = Math.max(0, Math.floor(-viewport.y / CELL_SIZE) - BUFFER);
    const endRow = Math.min(rows, Math.ceil((-viewport.y + viewportHeight) / CELL_SIZE) + BUFFER);
    
    return { startCol, endCol, startRow, endRow };
  }, [viewport.x, viewport.y, columns, rows]);

  const handleCanvasPointerDown = useCallback(
    (event) => {
      if (activeTool === 'hand') {
        event.preventDefault();
        setIsPanning(true);
        panStartRef.current = { x: event.clientX - viewport.x, y: event.clientY - viewport.y };
      }
    },
    [viewport, activeTool],
  );

  const handleCanvasPointerMove = useCallback(
    (event) => {
      if (isPanning) {
        event.preventDefault();
        const newX = event.clientX - panStartRef.current.x;
        const newY = event.clientY - panStartRef.current.y;
        onViewportChange({ x: newX, y: newY });
      }
    },
    [isPanning, onViewportChange],
  );

  const handlePointerDown = useCallback(
    (index, event) => {
      if (activeTool === 'hand') return;
      event.preventDefault();
      event.stopPropagation();
      setIsPainting(true);
      onPaintPixel(index);
    },
    [onPaintPixel, activeTool],
  );

  const handlePointerEnter = useCallback(
    (index, event) => {
      if (!isPainting || activeTool === 'hand') return;
      event.preventDefault();
      onPaintPixel(index);
    },
    [isPainting, activeTool, onPaintPixel],
  );

  // Рендерим только видимые пиксели
  const visiblePixels = useMemo(() => {
    const result = [];
    for (let row = visibleArea.startRow; row < visibleArea.endRow; row++) {
      for (let col = visibleArea.startCol; col < visibleArea.endCol; col++) {
        const index = row * columns + col;
        result.push({
          index,
          color: pixels[index] || BASE_CANVAS_COLOR,
          left: col * CELL_SIZE,
          top: row * CELL_SIZE,
        });
      }
    }
    return result;
  }, [visibleArea, columns, pixels]);

  const canvasStyle = useMemo(
    () => ({
      width: columns * CELL_SIZE,
      height: rows * CELL_SIZE,
      transform: `translate(${viewport.x}px, ${viewport.y}px)`,
    }),
    [columns, rows, viewport],
  );

  return (
    <section 
      className="canvas-stage"
      onPointerDown={handleCanvasPointerDown}
      onPointerMove={handleCanvasPointerMove}
      style={{ cursor: isPanning ? 'grabbing' : (activeTool === 'hand' ? 'grab' : activeTool === 'eraser' ? 'not-allowed' : 'crosshair') }}
    >
      <div 
        ref={canvasRef}
        className="pixel-canvas" 
        role="grid" 
        aria-label="Интерактивный пиксельный холст" 
        style={canvasStyle}
      >
        {visiblePixels.map(({ index, color, left, top }) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: `${left}px`,
              top: `${top}px`,
              width: `${CELL_SIZE - 1}px`,
              height: `${CELL_SIZE - 1}px`,
              border: '1px solid rgba(15, 23, 42, 0.16)',
            }}
          >
            <PixelCell
              color={color}
              onPointerDown={(event) => handlePointerDown(index, event)}
              onPointerEnter={(event) => handlePointerEnter(index, event)}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PixelCanvas;
