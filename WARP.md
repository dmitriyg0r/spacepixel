# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

SpacePixel is a pixel art drawing application built with React and Vite. Users can draw on a 64×36 pixel canvas using a color palette, with real-time painting via pointer events.

## Common Commands

### Development
```bash
npm run dev          # Start development server with HMR
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
```

### Installation
```bash
npm install          # Install dependencies
```

## Architecture

### State Management
- **Centralized state in `App.jsx`**: The main `App` component owns all application state (pixel colors, active color) and passes handlers down to child components
- **Pixel storage**: Canvas state is stored as a flat array of colors (`pixels`), indexed by position `(row * columns) + column`
- **Performance optimizations**: Uses `useCallback` for event handlers and `useMemo` for derived state (painted pixel count) to prevent unnecessary re-renders

### Component Structure
```
App (state owner)
├── PixelCanvas (rendering + pointer interaction)
│   └── PixelCell (individual pixel, memoization candidate)
└── ControlPanel (UI controls)
    ├── ColorPalette
    │   └── ColorSwatch
    └── PanelButton
```

### Key Patterns

**Canvas Rendering**: The `PixelCanvas` component uses CSS Grid with dynamic cell sizing based on viewport dimensions. Cell size is recalculated on window resize to maintain responsiveness.

**Pointer Interaction**: Implements drag-to-paint using pointer events (`pointerdown`, `pointerenter`, `pointerup`). The `isPainting` state tracks whether the user is actively dragging, allowing continuous painting across cells.

**Event Handling Flow**:
1. User clicks/touches a pixel → `handlePointerDown` sets `isPainting: true` and paints the cell
2. User drags across pixels → `handlePointerEnter` paints cells only if `isPainting: true`
3. User releases → global `pointerup` listener sets `isPainting: false`

### Configuration

- **Grid dimensions**: Defined in `src/constants/colors.js` as `GRID_CONFIG` (64×36)
- **Color palette**: `DEFAULT_COLORS` array in same file
- **Canvas base color**: `BASE_CANVAS_COLOR` constant

### Styling Approach
- Component-scoped CSS files (e.g., `PixelCanvas.css`, `ControlPanel.css`)
- Global styles in `index.css` and `App.css`
- Inline styles used for dynamic values (cell colors, grid dimensions)

## Code Conventions

### ESLint Rules
- Unused variables are errors, except for capitalized constants (regex: `^[A-Z_]`)
- React Hooks rules enforced via `eslint-plugin-react-hooks`
- React Refresh rules for HMR compatibility

### File Organization
- Components grouped by feature in `src/components/[ComponentName]/`
- Each component folder contains the JSX file and associated CSS
- Shared constants in `src/constants/`

## Making Changes

### Adding New Colors
1. Edit `DEFAULT_COLORS` array in `src/constants/colors.js`
2. Colors must be hex format (e.g., `'#FF5733'`)

### Changing Grid Size
1. Modify `GRID_CONFIG` in `src/constants/colors.js`
2. Note: Cell size auto-adjusts to fit viewport, with minimum of 6px per cell

### Adding New Features
- New UI controls → Add to `ControlPanel` component
- Canvas interactions → Modify `PixelCanvas` pointer event handlers
- State changes → Update `App.jsx` state management logic
