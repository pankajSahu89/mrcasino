module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust based on your folder structure
  ],
  theme: {
    extend: {
      colors: {
        black: '#181818',
        black100: '#1e1e1e',
        customWhite: '#FFFFFF',
        customPrimary: '#1F2937',   
        customSecondary: '#3B82F6',
        white: '#ffffff',
        black300:'#3D3D3D',
        black200:'#1D1D1D',
      },
    },
  },
 plugins: [
  require('@tailwindcss/line-clamp'),
]
}
