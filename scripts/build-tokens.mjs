/**
 * Token Pipeline: YAML → CSS
 * Reads src/design-tokens/tokens.yaml and generates src/design-tokens/generated-tokens.css
 *
 * Usage: node scripts/build-tokens.mjs
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const TOKENS_PATH = join(ROOT, 'src', 'design-tokens', 'tokens.yaml');
const OUTPUT_PATH = join(ROOT, 'src', 'design-tokens', 'generated-tokens.css');

// Load and parse YAML
const raw = readFileSync(TOKENS_PATH, 'utf-8');
const tokens = yaml.load(raw);

// Flatten primitive colors into a lookup map for reference resolution
const primitives = {};

function flattenPrimitives(obj, prefix = '') {
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && '$value' in value) {
      primitives[path] = value.$value;
    } else if (value && typeof value === 'object') {
      flattenPrimitives(value, path);
    }
  }
}

flattenPrimitives(tokens.color.primitive, 'color.primitive');

// Resolve {color.primitive.xxx} references to actual values
function resolveRef(value) {
  if (typeof value !== 'string') return value;
  return value.replace(/\{([^}]+)\}/g, (_, ref) => {
    const resolved = primitives[ref];
    if (!resolved) {
      console.warn(`  WARNING: Unresolved reference {${ref}}`);
      return `{${ref}}`;
    }
    return resolved;
  });
}

// Extract semantic tokens for a mode
function extractSemanticTokens(semanticObj) {
  const vars = {};
  for (const [key, value] of Object.entries(semanticObj)) {
    if (value && typeof value === 'object' && '$value' in value) {
      vars[`--${key}`] = resolveRef(value.$value);
    }
  }
  return vars;
}

// Extract chart tokens
function extractChartTokens(chartObj) {
  const vars = {};
  for (const [key, value] of Object.entries(chartObj)) {
    if (value && typeof value === 'object' && '$value' in value) {
      vars[`--chart-${key}`] = resolveRef(value.$value);
    }
  }
  return vars;
}

// Extract sidebar tokens
// Maps "background" → "--sidebar", others → "--sidebar-{key}"
function extractSidebarTokens(sidebarObj) {
  const vars = {};
  for (const [key, value] of Object.entries(sidebarObj)) {
    if (value && typeof value === 'object' && '$value' in value) {
      const varName = key === 'background' ? '--sidebar' : `--sidebar-${key}`;
      vars[varName] = resolveRef(value.$value);
    }
  }
  return vars;
}

// Build :root block
const lightTokens = extractSemanticTokens(tokens.color.semantic.light);
const lightCharts = extractChartTokens(tokens.color.chart.light);
const lightSidebar = extractSidebarTokens(tokens.color.sidebar.light);

const rootVars = {
  '--radius': tokens.borderRadius.base.$value,
  '--ease-botanical': tokens.animation.easing.botanical.$value,
  '--duration-normal': tokens.animation.duration.normal.$value,
  ...lightTokens,
  ...lightCharts,
  ...lightSidebar,
};

// Build .dark block
const darkTokens = extractSemanticTokens(tokens.color.semantic.dark);
const darkCharts = extractChartTokens(tokens.color.chart.dark);
const darkSidebar = extractSidebarTokens(tokens.color.sidebar.dark);

const darkVars = {
  ...darkTokens,
  ...darkCharts,
  ...darkSidebar,
};

// Format CSS
function formatBlock(selector, vars) {
  const entries = Object.entries(vars)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join('\n');
  return `${selector} {\n${entries}\n}`;
}

const timestamp = new Date().toISOString();
const css = `/* AUTO-GENERATED — do not edit
 * Source: src/design-tokens/tokens.yaml
 * Generated: ${timestamp}
 * Script: scripts/build-tokens.mjs
 */

${formatBlock(':root', rootVars)}

${formatBlock('.dark', darkVars)}
`;

writeFileSync(OUTPUT_PATH, css, 'utf-8');
console.log(`Tokens built → ${OUTPUT_PATH}`);
console.log(`  :root  — ${Object.keys(rootVars).length} variables`);
console.log(`  .dark  — ${Object.keys(darkVars).length} variables`);
