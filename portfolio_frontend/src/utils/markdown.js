//
// PUBLIC_INTERFACE
// Minimal markdown utilities: parse frontmatter and render a small subset of Markdown to JSX.
// No external dependencies are used to keep bundle small.
//
// Supported syntax (intentionally minimal):
// - Headings: #, ##, ###
// - Bold: **text**
// - Italic: *text*
// - Inline code: `code`
// - Code fences: ```lang ... ``` (language ignored)
// - Links: [text](url)
// - Unordered lists: lines starting with "- "
// - Paragraphs: blank line separated
//
// SECURITY NOTE: We do NOT inject raw HTML; we convert to React elements.
//
import React from 'react';

// PUBLIC_INTERFACE
export function parseFrontmatter(markdownText) {
  /** Parse simple YAML-like frontmatter delimited by --- at start.
   * Returns: { data: Record<string,string>, content: string }
   */
  const fmMatch = markdownText.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!fmMatch) {
    return { data: {}, content: markdownText };
  }
  const fmBody = fmMatch[1];
  const data = {};
  fmBody.split('\n').forEach((line) => {
    const m = line.match(/^(\w+):\s*"(.*)"\s*$/) || line.match(/^(\w+):\s*(.*)\s*$/);
    if (m) {
      const key = m[1].trim();
      let val = m[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      data[key] = val;
    }
  });
  const content = markdownText.slice(fmMatch[0].length);
  return { data, content };
}

// Inline formatting helpers
function renderInline(text) {
  // Escape angle brackets minimally to avoid accidental HTML (not exhaustive, but we don't render HTML anyway)
  let t = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Links: [text](url)
  const parts = [];
  let rest = t;
  const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let m;
  while ((m = linkRe.exec(rest)) !== null) {
    const before = rest.slice(lastIndex, m.index);
    if (before) parts.push(before);
    const txt = m[1];
    const href = m[2];
    parts.push(<a key={`l-${parts.length}`} href={href} className="link" target="_blank" rel="noreferrer">{txt}</a>);
    lastIndex = m.index + m[0].length;
  }
  if (lastIndex < rest.length) parts.push(rest.slice(lastIndex));

  // Now apply bold, italics, inline code on resulting array by mapping strings
  const applyInline = (node, idxBase = 0) => {
    if (typeof node !== 'string') return node;

    // Inline code `code`
    const codeSplit = node.split(/(`[^`]+`)/g).map((seg, i) => {
      if (seg.startsWith('`') && seg.endsWith('`')) {
        return <code key={`c-${idxBase}-${i}`} style={{ fontFamily: 'var(--font-mono)' }}>{seg.slice(1, -1)}</code>;
      }
      return seg;
    });

    // Bold **text**
    const boldProcessed = codeSplit.flatMap((seg, i) => {
      if (typeof seg !== 'string') return seg;
      const chunks = seg.split(/(\*\*[^*]+\*\*)/g).map((s, j) => {
        if (s.startsWith('**') && s.endsWith('**')) {
          return <strong key={`b-${idxBase}-${i}-${j}`}>{s.slice(2, -2)}</strong>;
        }
        return s;
      });
      return chunks;
    });

    // Italic *text*
    const italicProcessed = boldProcessed.flatMap((seg, i) => {
      if (typeof seg !== 'string') return seg;
      const chunks = seg.split(/(\*[^*]+\*)/g).map((s, j) => {
        if (s.startsWith('*') && s.endsWith('*')) {
          return <em key={`i-${idxBase}-${i}-${j}`}>{s.slice(1, -1)}</em>;
        }
        return s;
      });
      return chunks;
    });

    return italicProcessed;
  };

  return parts.map((p, i) => applyInline(p, i));
}

function finalizeParagraph(acc, keyBase) {
  if (!acc.current.length) return null;
  const children = acc.current.reduce((arr, seg, i) => {
    if (typeof seg === 'string' && arr.length && typeof arr[arr.length - 1] === 'string') {
      arr[arr.length - 1] = arr[arr.length - 1] + seg; // merge
    } else {
      arr.push(seg);
    }
    return arr;
  }, []);
  acc.current = [];
  return <p key={`p-${keyBase}`}>{children}</p>;
}

// PUBLIC_INTERFACE
export function renderMarkdownToReact(md) {
  /** Convert minimal markdown to JSX elements array. */
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let listMode = false;
  let listItems = [];
  let para = { current: [] };
  let codeMode = false;
  let codeBuffer = [];

  const flushList = () => {
    if (listMode && listItems.length) {
      out.push(
        <ul key={`ul-${out.length}`} style={{ paddingLeft: 18, marginTop: 0 }}>
          {listItems.map((li, i) => <li key={`li-${i}`}>{renderInline(li)}</li>)}
        </ul>
      );
    }
    listMode = false;
    listItems = [];
  };

  const flushPara = () => {
    const p = finalizeParagraph(para, out.length);
    if (p) out.push(p);
  };

  const flushCode = () => {
    if (codeMode) {
      out.push(
        <pre key={`pre-${out.length}`} style={{ background: 'var(--bg-elev-1)', border: '1px solid var(--border)', borderRadius: 8, padding: 12, overflowX: 'auto' }}>
          <code style={{ fontFamily: 'var(--font-mono)' }}>{codeBuffer.join('\n')}</code>
        </pre>
      );
      codeMode = false;
      codeBuffer = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];

    // Code fence
    if (raw.trim().startsWith('```')) {
      if (!codeMode) {
        // starting code block: flush pending paragraph/list
        flushPara();
        flushList();
        codeMode = true;
        codeBuffer = [];
      } else {
        // ending
        flushCode();
      }
      continue;
    }

    if (codeMode) {
      codeBuffer.push(raw);
      continue;
    }

    // Blank line: paragraph/list separator
    if (raw.trim() === '') {
      flushPara();
      flushList();
      continue;
    }

    // Headings
    const h1 = raw.match(/^# (.*)$/);
    const h2 = raw.match(/^## (.*)$/);
    const h3 = raw.match(/^### (.*)$/);
    if (h1 || h2 || h3) {
      flushPara();
      flushList();
      const text = (h1?.[1] || h2?.[1] || h3?.[1] || '').trim();
      if (h1) out.push(<h1 key={`h1-${out.length}`} className="section-title">{renderInline(text)}</h1>);
      else if (h2) out.push(<h2 key={`h2-${out.length}`} className="section-title">{renderInline(text)}</h2>);
      else out.push(<h3 key={`h3-${out.length}`} className="card-title">{renderInline(text)}</h3>);
      continue;
    }

    // List item
    const li = raw.match(/^\-\s+(.*)$/);
    if (li) {
      flushPara();
      listMode = true;
      listItems.push(li[1]);
      continue;
    }

    // Default paragraph continuation
    if (para.current.length === 0 && out.length > 0) {
      // Start new paragraph after previous element
    }
    para.current.push(...renderInline(raw));
    para.current.push('\n');
  }

  // Flush any remaining buffers
  flushPara();
  flushList();
  flushCode();

  return out;
}
