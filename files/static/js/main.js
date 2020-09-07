
const SMARTPHONE_VISIBLE_ATTR = 'data-smartphone-visible';
const SITEBAR_QUERY = '.sitebar-box';
const TOCBAR_QUERY = '.tocbar-box';

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
  hideElementIfSmartphone(document.querySelector(SITEBAR_QUERY));
  hideElementIfSmartphone(document.querySelector(TOCBAR_QUERY));
}
function toggleSiteBarIfSmartphone() {
  toggleElementIfSmartphone(document.querySelector(SITEBAR_QUERY));
  hideElementIfSmartphone(document.querySelector(TOCBAR_QUERY));
}
function toggleTocBarIfSmartphone() {
  toggleElementIfSmartphone(document.querySelector(TOCBAR_QUERY));
  hideElementIfSmartphone(document.querySelector(SITEBAR_QUERY));
}


function generateTocBar(articleRoot, tocBarRoot, titleHeading) {
  const headingTagNames = [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ];

  let headingTags = [...articleRoot.children];
  if (titleHeading) {
    headingTags.unshift(titleHeading);
  }

  headingTags
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
