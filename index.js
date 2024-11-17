// Written by Owen Meade, 17 Nov 2024
// Libraries
const functions = require("@google-cloud/functions-framework");
const axios = require("axios");

// Functions
functions.http("get", async (req, res) => {
  // set CORS headers for preflight requests
  res.set("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    // handle preflight requests
    // learn about preflight requests: https://www.peakhour.io/learning/pre-flight/
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization, apiKey");
    res.set("Access-Control-Max-Age", "3600");
    res.status(204).send("");
    return;
  }

  // get url to send request to & return bad request if not specified
  if (!req.query.url || !req.query.apiKey) {
    res.status(400).json({"error": "You must specify a url and apiKey query"});
    return;
  }

  try {
    // parse url properly, including any parameters in the url query
    const urlObj = new URL(req.query.url);
    Object.keys(req.query).forEach(key => {
        if (key !== "url" && key !== "apiKey") {
            urlObj.searchParams.append(key, req.query[key]);
        }
    });

    // forward the request to the target url
    const response = await axios({
      method: "GET",
      url: urlObj.toString(),
      headers: { "apiKey": req.query.apiKey },
    });

    // respond with the content from the target url
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({"error": `Error fetching URL: ${error.message}`});
  }
});
