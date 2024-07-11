import './App.css';
import getBrowserListing from './data-provider/browsers.js';

function App() {

    const render = () => {

        /**
         * Format browser and OS as `Browser/OS` or `Browser`
         * @param {Object} entry
         * @returns {String}
         */
        const label = entry => entry.os ? entry.browser + '/' + entry.os : entry.browser;

        /**
         * Format browser and OS as `browser-os` or `browser`
         * @param {Object} entry
         * @returns {String}
         */
        const key = entry => (entry.os ?
            entry.browser + '-' + entry.os :
            entry.browser).toLowerCase().replace(/\W+/g, '-');

        /**
         * Format [version-a, version-b] as `version-a, version-b`
         * @param {Object} entry
         * @returns {String}
         */
        const versions = entry => entry.versions.join(', ');

        /**
         * Return either `Version` or `Versions`, depending on the actual number of versions
         * @param {Object} entry
         * @returns {String}
         */
        const vLabel = entry => entry.versions.length === 1 && !entry.versions[0].includes('-') ?
            'Version' :
            'Versions';

        return getBrowserListing().map((entry) => (
            <li className={key(entry)} key={key(entry)}>
                <span className="icon"> </span>
                <h2 className="title">{label(entry)}</h2>
                <span className="supported">{vLabel(entry)}</span>
                <span className="versions">{versions(entry)}</span>
            </li>
        ));
    };

    return (
        <div className="app">
            <h1 className="title">Browsers supported by TAO</h1>
            <ul className="browsers">{render()}</ul>
            <p className="updated-msg">Updated monthly, last update: {process.env.REACT_APP_BUILD_DATE || 'unknown'}</p>
        </div>
    );
}

export default App;
