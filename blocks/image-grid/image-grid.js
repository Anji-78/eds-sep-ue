import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const grid = document.createElement('div');
  grid.className = 'image-grid-grid';

  [...block.children].forEach((row) => {
    const figure = document.createElement('figure');
    moveInstrumentation(row, figure);

    const fields = [...row.children];
    const imageField = fields[0];
    const captionField = fields[1];
    const altTextField = fields[2];
    const image = imageField?.querySelector('img');

    if (image) {
      const altText = altTextField?.textContent.trim();
      if (altText) image.alt = altText;

      const optimizedPicture = createOptimizedPicture(image.src, image.alt, false, [{ width: '750' }]);
      moveInstrumentation(image, optimizedPicture.querySelector('img'));
      imageField.replaceChildren(optimizedPicture);
    }

    if (captionField?.textContent.trim()) {
      const caption = document.createElement('figcaption');
      caption.textContent = captionField.textContent.trim();
      figure.append(caption);
    }

    if (imageField) figure.prepend(imageField);
    grid.append(figure);
  });

  block.replaceChildren(grid);
}
