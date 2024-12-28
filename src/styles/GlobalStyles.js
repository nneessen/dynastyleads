'use client';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
:root {
  /* BRAND COLORS - Modern Shades of Blue */
  --color-brand-100: #e6f7ff;
  --color-brand-200: #bae7ff;
  --color-brand-300: #91d5ff;
  --color-brand-400: #69c0ff;
  --color-brand-500: #40a9ff;
  --color-brand-600: #1890ff;
  --color-brand-700: #096dd9;
  --color-brand-800: #0050b3;
  --color-brand-900: #003a8c;

  /* ACCENT COLORS */
  --color-accent-red: #ff4d4f;
  --color-accent-orange: #ffa940;
  --color-accent-yellow: #ffec3d;
  --color-accent-green: #52c41a;
  --color-accent-blue: #2f54eb;
  --color-accent-indigo: #722ed1;
  --color-accent-violet: #eb2f96;

  /* Greys for contrast */
  --color-grey-0: #ffffff; /* White */
  --color-grey-100: #f7f8fa;
  --color-grey-200: #edf2f7;
  --color-grey-300: #e2e8f0;
  --color-grey-400: #cbd5e0;
  --color-grey-500: #a0aec0;
  --color-grey-600: #718096;
  --color-grey-700: #4a5568;
  --color-grey-800: #2d3748; /* Dark grey */
  --color-grey-900: #121212;

  /* SHADOWS */
  --backdrop-color: var(--color-grey-100);
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.15);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.25);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.35);
  --shadow-xl: 0 3.2rem 4.8rem rgba(0, 0, 0, 0.45);

  /* BORDER-RADIUS */
  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 8px;
  --border-radius-lg: 12px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html {
  font-size: 75%;
  overflow-x: hidden;
}

body {
  display: flex;
  flex-direction: column;
  margin: 0;
  font-family: "Roboto", sans-serif;
  background-color: black; 
  overflow-x: hidden;
  min-height: 100vh;
  font-size: 1.6rem;
  color: var(--color-grey-100); /* Default text color set to light grey */
}

/* Ensure form fields are visible against dark background */
input,
button,
textarea,
select {
  font: inherit;
  color: var(--color-grey-900); /* Set input text color to dark */
  background-color: var(--color-grey-200); /* Light background for inputs */
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}

.mb-2 {
  margin-bottom: 1.5rem;
}

.login-form-label {
color: var(--color-grey-900);
}

/* Custom scrollbar styles */
::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

::-webkit-scrollbar-track {
  background: black; 
}

::-webkit-scrollbar-thumb {
  background: var(--color-grey-800);
}

::-webkit-scrollbar-thumb:hover {
  background-color: var(--color-grey-200);
}
`;

export default GlobalStyles;
