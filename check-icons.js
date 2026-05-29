const lucide = require('lucide-react');
const icons = ['Plus', 'Edit', 'Eye', 'Trash2', 'Image', 'CheckSquare', 'Square', 'ArrowLeft', 'Save', 'UploadCloud', 'X', 'Settings2', 'Tags', 'LayoutTemplate', 'Percent'];
for (const icon of icons) {
  if (!(icon in lucide)) { console.log(icon, 'is MISSING'); }
}
console.log('Done checking.');
