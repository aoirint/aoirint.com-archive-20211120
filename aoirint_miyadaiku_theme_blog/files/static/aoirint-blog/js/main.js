
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
