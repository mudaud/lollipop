export default function Browser() {
    let browserName = "";

    if ((!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0) {
        browserName = "Opera"
    }

    if (typeof InstallTrigger !== 'undefined') {
        browserName = "Firefox"
    }

    if (/constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification)) || navigator.userAgent.toLowerCase().indexOf('safari/') > -1) {
        browserName = "Safari"
    }

    if (/*@cc_on!@*/false || !!document.documentMode) {
        browserName = "IE"
    }

    if (browserName !== 'IE' && !!window.StyleMedia) {
        browserName = "Edge"
    }

    if (!!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime)) {
        browserName = "Chrome"
    }

    if (browserName == 'Chrome' && (navigator.userAgent.indexOf("Edg") != -1)) {
        browserName = "EdgeChromium"
    }

    return browserName.toLowerCase();
}