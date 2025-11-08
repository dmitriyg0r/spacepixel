import ColorPalette from './ColorPalette';
import PanelButton from './PanelButton';
import './ControlPanel.css';

const ControlPanel = ({
  colors,
  activeColor,
  onColorSelect,
  onClearCanvas,
  paintedPixels,
  totalPixels,
  activeTool,
  onToolChange,
}) => {
  const completion = Math.round((paintedPixels / totalPixels) * 100);

  return (
    <section className="control-panel" aria-label="Панель управления">
      <div className="panel-row">
        <div className="tool-selector">
          <button
            className={`tool-button ${activeTool === 'pen' ? 'active' : ''}`}
            onClick={() => onToolChange('pen')}
            title="Кисть"
          >
            ✏️
          </button>
          <button
            className={`tool-button ${activeTool === 'hand' ? 'active' : ''}`}
            onClick={() => onToolChange('hand')}
            title="Рука"
          >
            ✋
          </button>
        </div>

        <ColorPalette colors={colors} activeColor={activeColor} onColorSelect={onColorSelect} />

        <div className="panel-actions">
          <div className="color-indicator" style={{ backgroundColor: activeColor }} title={activeColor.toUpperCase()} />
          <div className="completion-badge">{completion}%</div>
        </div>
      </div>
    </section>
  );
};

export default ControlPanel;
