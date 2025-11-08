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
}) => {
  const completion = Math.round((paintedPixels / totalPixels) * 100);

  return (
    <section className="control-panel" aria-label="Панель управления">
      <div className="panel-top">
        <div>
          <p className="panel-subtitle">Текущий цвет</p>
          <div className="panel-active-color">
            <div className="color-preview" style={{ backgroundColor: activeColor }} />
            <strong>{activeColor.toUpperCase()}</strong>
          </div>
        </div>
        <div className="panel-stats">
          <p className="panel-subtitle">Заполнено</p>
          <strong>{completion}%</strong>
        </div>
      </div>

      <ColorPalette colors={colors} activeColor={activeColor} onColorSelect={onColorSelect} />

      <div className="panel-actions">
        <PanelButton variant="ghost" onClick={onClearCanvas}>
          Очистить холст
        </PanelButton>
      </div>
    </section>
  );
};

export default ControlPanel;
