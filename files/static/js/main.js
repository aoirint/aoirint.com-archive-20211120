
const SMARTPHONE_VISIBLE_ATTR = 'data-smartphone-visible';

function hideElementIfSmartphone(element) {
  element.removeAttribute(SMARTPHONE_VISIBLE_ATTR);
}
function showElementIfSmartphone(element) {
  element.setAttribute(SMARTPHONE_VISIBLE_ATTR, '');
}
function toggleElementIfSmartphone(element) {
  if (! element.hasAttribute(SMARTPHONE_VISIBLE_ATTR)) {
    showElementIfSmartphone(element);
  }
  else {
    hideElementIfSmartphone(element);
  }
}

function hideBarsIfSmartphone() {
  hideElementIfSmartphone(document.querySelector('.sitebar'));
  hideElementIfSmartphone(document.querySelector('.tocbar'));
}
function toggleSiteBarIfSmartphone() {
  toggleElementIfSmartphone(document.querySelector('.sitebar'));
  hideElementIfSmartphone(document.querySelector('.tocbar'));
}
function toggleTocBarIfSmartphone() {
  toggleElementIfSmartphone(document.querySelector('.tocbar'));
  hideElementIfSmartphone(document.querySelector('.sitebar'));
}


function generateTocBar(articleRoot, tocBarRoot) {
  const headingTagNames = [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ];

  [...articleRoot.children]
    .filter(tag => headingTagNames.includes(tag.tagName.toLowerCase()))
    .forEach((tag, tagIndex) => {
      const tagName = tag.tagName.toLowerCase();
      const headingText = tag.innerText;
      const anchorName = tag.id || ('heading_' + tagName + '_' + tagIndex);
      const anchorClass = 'toc-item-' + tagName;

      const anchor = document.createElement('a');
      anchor.href = '#' + anchorName;
      anchor.innerText = headingText;
      anchor.classList.add(anchorClass);
      anchor.addEventListener('click', event => {
        hideBarsIfSmartphone();
      });

      tocBarRoot.appendChild(anchor);
    });

}
