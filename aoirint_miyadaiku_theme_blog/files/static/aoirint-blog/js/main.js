
const SMARTPHONE_VISIBLE_ATTR = 'data-smartphone-visible';
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
  hideElementIfSmartphone(document.querySelector(TOCBAR_QUERY));
}
function toggleTocBarIfSmartphone() {
  toggleElementIfSmartphone(document.querySelector(TOCBAR_QUERY));
}
