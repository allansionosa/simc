/**
 * Browser compatibility utilities
 * Provides fallbacks for modern browser features
 */

// Check if URL.createObjectURL is supported
export const supportsObjectURL = (): boolean => {
  return (
    typeof window !== 'undefined' &&
    window.URL &&
    typeof window.URL.createObjectURL === 'function'
  );
};

// Check if toLocaleDateString with options is supported
export const supportsLocaleDateString = (): boolean => {
  try {
    new Date().toLocaleDateString('en-US', { year: 'numeric' });
    return true;
  } catch {
    return false;
  }
};

// Check if CSS Grid is supported
export const supportsCSSGrid = (): boolean => {
  if (typeof window === 'undefined') return true; // SSR fallback
  return CSS.supports('display', 'grid');
};

// Check if Flexbox is supported
export const supportsFlexbox = (): boolean => {
  if (typeof window === 'undefined') return true; // SSR fallback
  return CSS.supports('display', 'flex');
};

// Safe date formatting with fallback
export const formatDate = (
  date: Date,
  options?: Intl.DateTimeFormatOptions
): string => {
  try {
    if (options) {
      return date.toLocaleDateString('en-US', options);
    }
    return date.toLocaleDateString();
  } catch {
    // Fallback for browsers that don't support toLocaleDateString options
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    if (options?.month === 'long') {
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      return `${months[date.getMonth()]} ${year}`;
    }

    return `${month}/${day}/${year}`;
  }
};

// Safe window access for SSR
export const getWindowDimensions = () => {
  if (typeof window === 'undefined') {
    return { width: 1024, height: 768 }; // Default fallback
  }
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

// Check if browser supports modern features
export const getBrowserSupport = () => {
  return {
    objectURL: supportsObjectURL(),
    localeDateString: supportsLocaleDateString(),
    cssGrid: supportsCSSGrid(),
    flexbox: supportsFlexbox(),
  };
};
