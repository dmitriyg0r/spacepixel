const ColorSwatch = ({ color, isActive, onSelect }) => (
  <button
    type="button"
    className={`color-swatch ${isActive ? 'is-active' : ''}`}
    style={{ '--swatch-color': color }}
    aria-label={`Выбрать цвет ${color}`}
    aria-pressed={isActive}
    onClick={onSelect}
  >
    <span className="color-swatch__fill" />
  </button>
);

export default ColorSwatch;
