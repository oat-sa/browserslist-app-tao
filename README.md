# Browsers supported by TAO

This app lists all the browser versions supported by TAO in real time. The app uses the browserslist config from https://github.com/oat-sa/browserslist-config-tao and displays the list of supported browsers.

## Demo
https://oat-sa.github.io/browserslist-app-tao

## Using the list inside a web page
There are two ways to consume these data, either via API or in an iFrame.

### API
A simple JSON API is available at [oat-sa.github.io/browserslist-app-tao/api.json](https://oat-sa.github.io/browserslist-app-tao/api.json). If you wish you can also download a copy of the icon set as [png](/src/media/icons.png) or [psd](/src/media/icons.psd).

### JavaScript example
```javascript
fetch('https://oat-sa.github.io/browserslist-app-tao/api.json')
  .then(response => response.json())
  .then(data => console.log(data));
```

### iFrame
Alternatively you can embed the page in an `<iframe>` element. You can pass any number of options as URL parameters to adapt the look and feel.

### Basic setup
```html
<iframe src="https://oat-sa.github.io/browserslist-app-tao" height="…" width="…"></iframe>
```

### Fancy setup with CSS overwriting
Optionally you can overwrite the styles of the `<body>` element and remove the page heading by adding parameters to the `<iframe>` URL. The link to the repository will be removed by default.

```php
<?php
$params = [
    'background-color' => '#336',
    'color' => 'silver',
    'font-family' => 'Comic Sans MS',
    'transform' => 'scale(.8)', // iframe will remain at the top left when scaled
    'title' => false // this one removes the title, values can be `false` or `0`
];
?>

<iframe src="https://oat-sa.github.io/browserslist-app-tao?<?=http_build_query($params)?>" height="…" width="…"></iframe>
```

While the above example uses PHP, you can obviously do this manually as well. Be careful to encode the parameters, otherwise the `#` on color values will break the query string.

## Working on the code

### Install

`npm ci`

### Run

The app will be available on http://localhost:3000:

`npm run start`

### Update

There is a 2-step process to make the latest browsers available in the API:

> An update PR will also be opened by an action once per month.

#### 1. Update browserslist db

The following script installs the latest version of `caniuse-lite` in the package-lock.json. Without it, the API can receive outdated browsers. The resulting updated file should be committed.

`npm run update-db`

#### 2. Update the API file

The following script regenerates the file `public/api.json` (by reading the configuration exported by the installed dependency `@oat-sa/browserslist-config-tao/index.js` and passing that string into `browserslist`). The resulting updated file should be committed.

`npm run build-api`

### Deployment

There is a script to build the API and the app, and deploy the result to [Github Pages](https://oat-sa.github.io/browserslist-app-tao):

`npm run deploy`
