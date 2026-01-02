
// Define your custom theme colors here
// You can use Hex codes (e.g., #3b82f6)
// Changes here will apply across the entire website

export const THEME_COLORS = {
  // Primary: Main brand color (#FF0066 - Hot Pink)
  primary: '#FF0066', 
  
  // Secondary: Accents (#ff3385)
  secondary: '#ff3385', 
  
  // Light: Main background color in light mode (Pink 50)
  light: '#fdf2f8',
  
  // Card Light: Component background color in light mode (Pink 100)
  cardLight: '#fce7f3', 
  
  // Border: Subtle borders (Pink 200)
  border: '#fbcfe8',

  // Hero Name Gradient
  nameGradientStart: '#FF0066', 
  nameGradientEnd: '#ff3385',   

  // Profile Border Gradient
  profileBorderStart: '#FF0066', 
  profileBorderEnd: '#ff3385',   
};

/**
 * Helper function to convert hex to RGB string for CSS variables
 * @param hex Hex color code (e.g., #ffffff)
 * @returns RGB string (e.g., "255 255 255")
 */
export const hexToRgb = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}`
    : '0 0 0'; // Fallback to black if invalid
};
