import fs from "fs";
import path from "path";
import { parseDocument } from "htmlparser2";
import { glob } from "glob";
import crypto from "crypto";

// Define the base CSP policies
const cspDirectives = {
  "script-src": ["'self'", "'unsafe-inline'"],
  "worker-src": ["'self'"],
  "manifest-src": ["'self'"],
  "style-src": ["'self'"],
  "style-src-attr": ["'none'"],
  "img-src": ["'self'"],
  "font-src": ["'self'"],
  "connect-src": ["'self'"],
  "frame-src": [
    "https://www.google.com",
    "https://www.youtube.com",
    "https://www.instagram.com",
    "https://open.spotify.com",
    "https://vimeo.com",
    "https://www.dailymotion.com",
    "https://www.youtube.com",
    "https://datawrapper.dwcdn.net",
    "https://www.ultimedia.com",
    "https://bmeli.cartodb.com",
    "https://exod.app",
    "https://w.soundcloud.com",
    "https://www.facebook.com",
    "https://www.flickr.com",
    "https://www.flightradar24.com",
  ],
  "child-src": [
    "https://www.google.com",
    "https://www.youtube.com",
    "https://www.instagram.com",
    "https://open.spotify.com",
    "https://vimeo.com",
    "https://www.dailymotion.com",
    "https://www.youtube.com",
    "https://datawrapper.dwcdn.net",
    "https://www.ultimedia.com",
    "https://bmeli.cartodb.com",
    "https://exod.app",
    "https://w.soundcloud.com",
    "https://www.facebook.com",
    "https://www.flickr.com",
    "https://www.flightradar24.com",
  ],
  "default-src": ["'none'"],
};

// Function to generate CSP headers string
function generateCSP(scriptHashes, styleHashes) {
  return Object.entries(cspDirectives)
    .map(([directive, sources]) => {
      const newSources = new Set(sources);
      if (directive === "script-src") {
        for (const hash of scriptHashes) {
          newSources.add(hash);
        }
      } else if (directive === "style-src") {
        for (const hash of styleHashes) {
          newSources.add(hash);
        }
      }
      return `${directive} ${[...newSources].join(" ")}`;
    })
    .join("; ");
}

const styleAttribs = new Set();

// Function to generate hashes for inline scripts and styles
function generateHashesForHtmlFile(file) {
  let dom;
  try {
    dom = parseDocument(fs.readFileSync(file, "utf8"));
  } catch (error) {
    console.error(`Error while parsing file: ${file}`);
    console.error(error);
    return { scriptHashes: [], styleHashes: [] };
  }

  const scriptHashes = new Set();
  const styleHashes = new Set();

  visit(dom, (node) => {
    if (node?.name === "script") {
      try {
        const content = node?.children[0]?.data || "";
        const hash = crypto.createHash("sha256");
        hash.update(content);
        scriptHashes.add(`'sha256-${hash.digest("base64")}'`);
      } catch (error) {
        console.error(
          `Error generating hash for <${node.name}>: ${node.children[0].data}`,
        );
      }
    }

    if (node?.attribs?.style) {
      styleAttribs.add(
        `${node?.name}: ${node?.attribs?.class}\n  ${node?.children[0]?.data}`,
      );
    }

    if (node?.name === "style") {
      try {
        const content = node?.children[0]?.data || "";
        const hash = crypto.createHash("sha256");
        hash.update(content);
        styleHashes.add(`'sha256-${hash.digest("base64")}'`);
      } catch (error) {
        console.error(
          `Error generating hash for <${node.name}>: ${node.attribs?.style || node.children[0].data}`,
        );
      }
    }
  });

  return {
    scriptHashes: Array.from(scriptHashes),
    styleHashes: Array.from(styleHashes),
  };
}

// Function to iterate over the dom tree
function visit(node, visitor) {
  if (!node) return;

  visitor(node);

  if (node.children && node.children.length > 0) {
    node.children.forEach((child) => visit(child, visitor));
  }
}

// Function to update the HTML file with the Content Security Policy
function updateHtmlFile(file) {
  const { scriptHashes, styleHashes } = generateHashesForHtmlFile(file);
  const csp = generateCSP(scriptHashes, styleHashes);
  const content = fs.readFileSync(file, "utf8");
  const headTagRegex = /<head\b([^>]*)>/;
  const headTagMatch = content.match(headTagRegex);
  const headTagAttributes = headTagMatch ? headTagMatch[1] : "";
  const updatedContent = content.replace(
    headTagRegex,
    `<head ${headTagAttributes}>${`
      <meta http-equiv="Content-Security-Policy" content="${csp}">
    `}`,
  );
  fs.writeFileSync(file, updatedContent);
}

// Main
console.log("Updating generated HTML files with Content Security Policy...");
const distPath = path.join(process.cwd(), "dist");
const htmlFiles = glob.sync(path.join(distPath, "post", "**/*.html"));

htmlFiles.forEach((file) => {
  try {
    updateHtmlFile(file);
  } catch (error) {
    console.error(`Error generating CSP for ${file}`, error);
  }
});
console.log(Array.from(styleAttribs));
console.log("CSP generation is done");
