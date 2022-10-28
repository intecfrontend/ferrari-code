import { isMobile } from "react-device-detect";
import Translate from "@identitybuilding/idb-react-translations";

const punycode = require("punycode/");

let host = window.location.hostname;
host = host.replace("www.", "");

let devMode = false;
if (host.includes(".dev")) {
  devMode = true;
}

let subdomain = host.match(/([a-z0-9|-]+)/g);
subdomain =
  subdomain.length === 3 || subdomain.length === 4
    ? subdomain[0].toLowerCase()
    : "";

let domain = window.location.hostname

  .replace("www.", "")
  .match(/([a-z0-9|-]+)/g);
domain =
  domain.length === 2 || domain.length === 1
    ? domain[0].toLowerCase()
    : domain.length === 3
    ? domain[1].toLowerCase()
    : domain[2] && domain[2].toLowerCase();

// get the decoded punycode name
let decoded_subdomain = punycode.toUnicode(subdomain);
subdomain = decoded_subdomain

let lang =
  host.includes("stad")
    ? "nl"
    : host.includes("ville")
    ? "fr"
    : host.includes("city")
    ? "en"
    : "nl";

const search_slug = Translate("search_slug", lang);
const page_slug = Translate("page", lang).toLowerCase();
const initialState = {
  lang: lang,
  translate: (x) => Translate(x, lang),
  device: isMobile ? "mobile" : "desktop",
  nis: subdomain,
  decoded_nis: decoded_subdomain,
  dev: devMode,
  domain: domain,
  search_path: (location, keyword, page, keyboard, as, filter) => {
    let loc = "";

    if (typeof location === "object") {
      if (location.length === 1) {
        if (location[0].slug === subdomain) {
          loc = false;
        } else {
          loc = location[0].slug;
        }
      } else {
        loc = location.map((loc) => loc.slug);
      }
    } else {
      loc = location;
    }
    return `/${search_slug}${loc ? `/in/${loc}` : ""}${
      keyword ? `/naar/${keyword}` : ""
    }${page ? `/${page_slug}=${page}` : ""}${as ? `?category=${as}` : ""}${
      filter && filter.length > 0 ? `${as ? "&" : "?"}service=${filter}` : ""
    }`;
  },
};

const GeneralReducer = (state = initialState, action) => state;

export default GeneralReducer;
