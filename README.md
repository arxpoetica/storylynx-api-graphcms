# storylynx-api-graphcms

StoryLynx API plugin for GraphCMS support.

## Usage

This plugin requires several environment variables for GraphCMS to work. First, set the correct plugin variable in the `.env` file for development and `.env.enc-source` for production:

```
LYNX_API_PLUGIN=storylynx-api-graphcms
```

In addition, add the following environment variables to those two files to specify the correct GraphCMS information:

```
LYNX_GRAPHCMS_ENDPOINT=https://graph.cms.endpoint.goes.here.com
LYNX_GRAPHCMS_TOKEN=query-token-goes-here
```
<!-- LYNX_GRAPHCMS_MUTATE_TOKEN=mutate-token-goes-here -->
