const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const replacements = [
  // Main background
  ['bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100', 'bg-slate-950 text-white'],
  ['bg-gradient-to-br from-blue-50 to-indigo-100', 'bg-slate-950/40'],
  
  // Section backgrounds
  [/bg-white\/50/g, 'bg-slate-900/40'],
  [/bg-white\/60/g, 'bg-slate-900/50'],
  [/bg-white\/70/g, 'bg-slate-900/60'],
  [/bg-white\/80/g, 'bg-slate-900/70'],
  [/bg-white\/90/g, 'bg-slate-900/80'],
  [/\bbg-white\b/g, 'bg-slate-900'],
  [/\bbg-slate-50\b/g, 'bg-slate-800'],
  [/\bbg-slate-100\b/g, 'bg-slate-800'],
  [/\bbg-blue-50\b/g, 'bg-blue-950/40'],
  [/\bbg-indigo-50\b/g, 'bg-indigo-950/40'],
  
  // Text colors
  [/\btext-slate-600\b/g, 'text-slate-400'],
  [/\btext-slate-700\b/g, 'text-slate-300'],
  [/\btext-slate-800\b/g, 'text-slate-200'],
  [/\btext-slate-900\b/g, 'text-white'],
  [/\btext-blue-900\b/g, 'text-blue-100'],
  [/\btext-indigo-900\b/g, 'text-indigo-100'],
  [/\btext-gray-600\b/g, 'text-gray-400'],
  [/\btext-gray-700\b/g, 'text-gray-300'],
  [/\btext-gray-800\b/g, 'text-gray-200'],
  [/\btext-gray-900\b/g, 'text-white'],
  
  // Borders
  [/\bborder-slate-100\b/g, 'border-slate-800'],
  [/\bborder-slate-200\b/g, 'border-slate-700'],
  [/\bborder-blue-100\b/g, 'border-blue-900/50'],
  [/\bborder-indigo-100\b/g, 'border-indigo-900/50'],
  [/\bborder-white\b/g, 'border-slate-700'],
  [/\bborder-white\/20\b/g, 'border-slate-700/50'],
  
  // Rings
  [/\bring-slate-100\b/g, 'ring-slate-800'],
  
  // Shadows
  [/\bshadow-sm\b/g, 'shadow-none'],
  [/\bshadow-md\b/g, 'shadow-none'],
  [/\bshadow-lg\b/g, 'shadow-none'],
  [/\bshadow-xl\b/g, 'shadow-none'],
];

replacements.forEach(([search, replace]) => {
  if (typeof search === 'string') {
    content = content.split(search).join(replace);
  } else {
    content = content.replace(search, replace);
  }
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Theme updated to dark successfully!');
