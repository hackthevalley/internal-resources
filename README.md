<h1 align="center">
  <div align="center">
    <img src="https://cdn.hackthevalley.io/assets/full-logo?color=lime" width="160"/>
  </div>
  Lorem Ipsum
</h1>

[![Netlify Status](https://api.netlify.com/api/v1/badges/d840078f-f256-448b-9de5-8724283e6d92/deploy-status)](https://app.netlify.com/sites/htv-cdn/deploys)

## Overview

This repo contains all internal documents + tooling for use across the organization beyond development

## API Usage

| Url | Description | Params |
| --- | --- | --- |
| `/assets/logo` | Serves the HTV logo without text | color: `hex`, background: `hex`, padded: `true`, format: `webp\|png` |
| `/assets/full-logo` | Servers the HTV logo with text | color: `hex`, background: `hex`, padded: `true`, format: `webp\|png` |
| `/logo.svg` | Raw HTV logo without text | none |
| `/full-logo.svg` | Raw HTV logo with text | none |
| `/logo-padded.svg` | Raw HTV logo with padding and without text | none |
| `/full-logo-added.svg` | Raw HTV logo with padding and text | none |

> To prevent exhausting our lambda usage, we have aggressive caching from the DNS. Currently, TTL of the cache is 8 hours.

> If must, cache busting can be done by including some hash in the string query (ie. &hash=xxxxxxxx). This is not recommend as lambda function invocations don't grow on trees...

## Colors

We allow for use of hex for colors, but some named colors are also in place to help with
theme matching with our applications. These colors (and their names), can be found in the [ui-kit](https://github.com/hackthevalley/hack-the-ui/blob/master/src/styles/_colors.scss#L6).

---

<p align="center">
<a target="_blank" rel="noreferrer noopener" href="https://hackthevalley.io">
  <img src="https://cdn.hackthevalley.io/assets/logo?color=gray" width="25"/>
</a>
</p>
