/**
 * IW code to mamage IW extension installation states.
 * Shows/hides elements based on its classes according installation states:
 *
 *   .iw-not-supported-browser - page is open in unsupported (Chrome) browser
 *   .iw-can-install-extension - extension can be installed, provide the install trigger
 *   .iw-extension-installed - extension is already installed in the browser
 *   .iw-installation-success -
 *   .iw-installation-failure -
 *
 * Mark node with class
 *   .iw-click-install - to let the code attach event to trigger extension installation
 */

var IW_EXT_ID = 'kkphiaafmfbkggbicfnggaaikbljcafg';
var IW_EXT_URL = 'https://chrome.google.com/webstore/detail/' + IW_EXT_ID;

function modifyClass(nodeClass, disp) {
  var nds = document.querySelectorAll(nodeClass);
  if (nds && nds.length > 0) {
    Array.prototype.forEach.call(nds, disp);
  }
}

function modifyClasses(nodeClasses, disp) {
  nodeClasses.forEach(function(nodeClass) {
    modifyClass(nodeClass, disp);
  });
}

function setDisplay(nd, val) { nd.style.display = val; }
function dispHide(nd) { setDisplay(nd, 'none'); }
function dispShow(nd) { setDisplay(nd, 'block'); }

function initInstallButton (buttNd) {
  buttNd.addEventListener("click", function(e) {
    if (typeof chrome != 'undefined') {
      chrome.webstore.install(IW_EXT_URL,
        function successCallback() {
          modifyClass('.iw-installation-success', dispShow);
          modifyClasses(['.iw-can-install-extension', '.iw-installation-failure'], dispHide);
        },
        function failureCallback() {
          modifyClass('.iw-installation-failure', dispShow);
        }
      );
    }
  });
}

document.addEventListener("DOMContentLoaded", function init() {
  if (typeof chrome != 'undefined') {
    // Chrome browser
    modifyClass('.iw-click-install', initInstallButton);
    modifyClasses(['.iw-extension-installed', '.iw-not-supported-browser'], dispHide);
    chrome.runtime.sendMessage(IW_EXT_ID, {type: 'installed'},
      function(response) {
        if (response.installed) {
          modifyClass('.iw-extension-installed', dispShow);
          modifyClass('.iw-can-install-extension', dispHide);
        } else {
          modifyClass('.iw-can-install-extension', dispShow);
        }
      }
    );
  } else {
    // unsupported browser
    modifyClass('.iw-not-supported-browser', dispShow);
    modifyClasses(['.iw-can-install-extension', '.iw-extension-installed'], dispHide);
  }
  modifyClasses(['.iw-installation-success', '.iw-installation-failure'], dispHide);
}, false);
