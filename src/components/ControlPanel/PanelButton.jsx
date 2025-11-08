const PanelButton = ({ children, variant = 'primary', ...props }) => (
  <button type="button" className={`panel-button panel-button--${variant}`} {...props}>
    {children}
  </button>
);

export default PanelButton;
