//
// PUBLIC_INTERFACE
// blogLoader - utility to map slugs to markdown imports and prepare metadata.
//
// This avoids adding a bundler plugin by relying on static imports we declare here.
// If you add new posts, update blogIndex.json and add an entry here.
//
import helloCyberpunk from '../content/blog/hello-cyberpunk.md?raw';
import secureLlmPipelines from '../content/blog/secure-llm-pipelines.md?raw';
import { parseFrontmatter } from './markdown';

const registry = {
  'hello-cyberpunk': helloCyberpunk,
  'secure-llm-pipelines': secureLlmPipelines,
};

// PUBLIC_INTERFACE
export function listAvailableSlugs() {
  /** Return array of slugs available in the registry. */
  return Object.keys(registry);
}

// PUBLIC_INTERFACE
export function loadMarkdownBySlug(slug) {
  /** Returns { raw: string, data: object, content: string } or null if not found. */
  const raw = registry[slug];
  if (!raw) return null;
  const { data, content } = parseFrontmatter(raw);
  return { raw, data, content };
}
