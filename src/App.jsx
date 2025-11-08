import { useCallback, useMemo, useState } from 'react';
import PixelCanvas from './components/PixelCanvas/PixelCanvas';
import ControlPanel from './components/ControlPanel/ControlPanel';
import { BASE_CANVAS_COLOR, DEFAULT_COLORS, GRID_CONFIG } from './constants/colors';
import './App.css';

const createInitialPixels = () =>
  new Array(GRID_CONFIG.columns * GRID_CONFIG.rows).fill(BASE_CANVAS_COLOR);

function App() {
  const [pixels, setPixels] = useState(createInitialPixels);
  const [activeColor, setActiveColor] = useState(DEFAULT_COLORS[0]);

  const handlePaintPixel = useCallback(
    (index) => {
      setPixels((prev) => {
        if (prev[index] === activeColor) return prev;
        const next = [...prev];
        next[index] = activeColor;
        return next;
      });
    },
    [activeColor],
  );

  const handleClearCanvas = useCallback(() => {
    setPixels(createInitialPixels());
  }, []);

  const paintedPixels = useMemo(
    () => pixels.filter((color) => color !== BASE_CANVAS_COLOR).length,
    [pixels],
  );

  return (
    <div className="app-shell">
      <PixelCanvas
        pixels={pixels}
        columns={GRID_CONFIG.columns}
        rows={GRID_CONFIG.rows}
        onPaintPixel={handlePaintPixel}
      />

      <ControlPanel
        colors={DEFAULT_COLORS}
        activeColor={activeColor}
        onColorSelect={setActiveColor}
        onClearCanvas={handleClearCanvas}
        paintedPixels={paintedPixels}
        totalPixels={pixels.length}
      />
    </div>
  );
}

export default App;
