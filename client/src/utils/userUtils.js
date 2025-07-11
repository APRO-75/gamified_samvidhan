export const extractUsername = (email) => {
  if (!email) return '';
  return email.split('@')[0];
};

// Function to capitalize first letter
export const capitalizeFirstLetter = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
}; 