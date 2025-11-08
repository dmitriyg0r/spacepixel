import ColorSwatch from './ColorSwatch';

const ColorPalette = ({ colors, activeColor, onColorSelect }) => (
  <div className="color-palette" role="listbox" aria-label="Палитра цветов">
    {colors.map((color) => (
      <ColorSwatch
        key={color}
        color={color}
        isActive={color === activeColor}
        onSelect={() => onColorSelect(color)}
      />
    ))}
  </div>
);

export default ColorPalette;
