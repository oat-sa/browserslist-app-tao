import browserslist from 'browserslist';
import oatBrowserListConfig from '@oat-sa/browserslist-config-tao';

/**
 * Vocabulary to expand short codes for browsers and OSs to human readable names
 * @type {{ff: string, edge: string, chrome: string, safari: string, and: string, firefox: string, saf: string, chr: string, ios: string, ie: string}}
 */
const dictionary = {
    and: 'Android',
    chr: 'Chrome',
    ff: 'Firefox',
    ios: 'iOS',
    ie: 'Internet Explorer',
    saf: 'Safari',
    chrome: 'Chrome',
    edge: 'Edge',
    firefox: 'Firefox',
    safari: 'Safari'
}

/**
 * Converts the short codes to an object
 * @param {String} browser
 * @returns {{os: string, versions: [*], browser: string, device: string}}
 */
const format = browser => {
    const data = browser.split(' ')[0].split('_').reverse().map(part => dictionary[part] ? dictionary[part] : part);
    const device = data[1] && ['iOS', 'Android'].includes(data[1]) ? 'mobile' : 'desktop';
    return {
        browser: data[0],
        os: data[1] || '',
        versions: [browser.split(' ')[1]],
        device: device
    }
}

/**
 * Lockdown / secure exam browsers for TAO (INV-1156 lockdown-browser POC).
 *
 * Mainstream entries above come from Browserslist + browserslist-config-tao.
 * KioskED and similar clients are not in Can I Use, so they are listed here and
 * merged into public/api.json on `npm run build-api`.
 *
 * TAO client diagnostic (extension-tao-clientdiag) loads api.json via browserslistUrl
 * and matches the detected browser name + version (same rules as Chrome rows).
 * tao-core detects KioskED from User-Agent (e.g. `kiosked/1.8.2`) and exposes
 * browser name `kiosked` — must match LockDownBrowserConfiguration::PROVIDER_KIOSKED.
 *
 * `versions`: minimum supported release; UA version must be >= each listed value
 * (TAO uses version_compare / numeric compare). Bump when product raises the floor.
 *
 * @type {Array<{browser: string, os: string, device: string, versions: string[]}>}
 */
const lockDownBrowserListing = [
    {
        browser: 'kiosked',
        os: '',
        device: 'desktop',
        // INVALSI / POC minimum KioskED version (UA token kiosked/x.y.z)
        versions: ['1.8.2']
    }
];

/**
 * Convert browser data to an array
 * order: desktop -> mobile, then alphabetically, then version
 */
function getBrowserListing () {
    const listing = {
        desktop: {},
        mobile: {}
    }
    browserslist(oatBrowserListConfig).reduce((list, browser) => {
        const key = browser.split(' ')[0];
        const formatted = format(browser);
        if (!listing[formatted.device][key]) {
            listing[formatted.device][key] = formatted;
        } else {
            listing[formatted.device][key].versions = listing[formatted.device][key].versions.concat(formatted.versions);
        }

        return listing;
    }, {});
    for(let device in listing){
        for(let values of Object.values(listing[device])) {
            // Commented out while we'll be supporting from 17.4 to 17.x:
            //
            // Safari returns every minor version; discard them and just keep major
            // if (values.browser === 'Safari') {
            //     values.versions = Array.from(new Set(values.versions.map(safariVer => parseInt(safariVer, 10))));
            // }
            values.versions.sort();
        }
        Object.keys(listing[device]).sort().reduce(
            (obj, key) => {
              obj[key] = listing[device][key];
              return obj;
            },
            {}
          );
    }
    return Object.values(listing['desktop'])
        .concat(Object.values(listing['mobile']))
        .concat(lockDownBrowserListing);
};

export default getBrowserListing;
