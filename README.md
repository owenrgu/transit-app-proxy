# Transit App Proxy

This is a proxy service that allows GET requests to be made to the [Transit App API](https://api-doc.transitapp.com/) from front-end applications. Front-end applications cannot request the Transit App API normally due to CORS policy restrictions.

## How To Use

The files in this repository are made to run on [Google Cloud Functions](https://cloud.google.com/functions?hl=en).

If you're deploying this on your own, ensure your `package.json` file contains `"axios": "^1.7.3"` in the dependencies, otherwise your proxy will not work.

When you have deployed your function to Cloud Run Functions, you'll get a URL that you can use to make requests to. When making requests, make sure to pass your Transit App API Key and the URL you want to request. You must pass the parameters that Transit App requires, as well as the two that the function itself requires.

An example request would be:
```
https://your-cloud-function.cloudfunctions.net/busproxy?apiKey=hjs4e9853w2&url=https://external.transitapp.com/v3/public/nearby_routes?lat=1.25823&lon=1.36276
```

## License

Note that whilst this proxy is made to specifically make requests to the [Transit App API](https://api-doc.transitapp.com/), the repository is under the MIT License. This means you are free to take the code and adapt it for your own use, even if that may be for making requests to other third-party APIs.
