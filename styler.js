/**
 * Overwrite styles
 */
((d) => {
    const root = d.body;
    const style = getComputedStyle(root);
    const config = new URLSearchParams(window.location.search);
    if(['false', '0'].includes(config.get('title'))){
        root.classList.add('no-title');
    }
    root.classList.toggle('in-iframe', window.parent !== window.top);
    config.forEach((value, key) => {
        if(typeof style.getPropertyValue(key) !== 'undefined'){
            root.style[key] = value;
            if(key === 'transform' && value.includes('scale') && !config.get('transform-origin')){
                root.style.transformOrigin = '0 0';
            }
        }
    })
})(document)
