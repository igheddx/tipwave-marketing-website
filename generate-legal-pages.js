import fs from 'fs';
import { marked } from 'marked';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const template = (title, content) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#0E7490">
    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="icon" type="image/png" sizes="32x32" href="/images/logo/favicon-32.png">
    <link rel="apple-touch-icon" href="/images/logo/apple-touch-icon.png">
    <title>${title} - Tipwave</title>
    <style>
        :root { --brand-50:#E6F6F9; --brand-700:#0E7490; --brand-800:#155E75; --ink-900:#1B2530; --ink-700:#334155; --ink-500:#64748B; --surface:#F5F7FA; }
        * { box-sizing: border-box; }
        body {
            margin: 0;
            font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.7;
            color: var(--ink-700);
            background: var(--surface);
            -webkit-font-smoothing: antialiased;
        }
        .site-header {
            position: sticky; top: 0; z-index: 10;
            background: rgba(255,255,255,0.92);
            backdrop-filter: blur(8px);
            border-bottom: 1px solid #e2e8f0;
        }
        .site-header .inner {
            max-width: 1100px; margin: 0 auto; padding: 0 24px; height: 64px;
            display: flex; align-items: center; justify-content: space-between;
        }
        .site-header img { height: 36px; width: auto; display: block; }
        .back-link {
            font-size: 14px; font-weight: 600; color: var(--brand-700); text-decoration: none;
            padding: 8px 14px; border-radius: 10px;
        }
        .back-link:hover { background: var(--brand-50); }
        main { max-width: 820px; margin: 0 auto; padding: 40px 20px 64px; }
        .doc {
            background: #fff; border: 1px solid #f1f5f9; border-radius: 16px;
            padding: 40px; box-shadow: 0 1px 3px rgba(15,23,42,.06);
        }
        h1 { color: var(--ink-900); font-size: 2rem; line-height: 1.2; margin: 0 0 24px; }
        h2 { color: var(--ink-900); font-size: 1.35rem; margin: 40px 0 12px; }
        h3 { color: var(--ink-900); font-size: 1.1rem; margin: 28px 0 8px; }
        strong { color: var(--ink-900); }
        a { color: var(--brand-700); }
        a:hover { color: var(--brand-800); }
        hr { border: none; border-top: 1px solid #e2e8f0; margin: 32px 0; }
        ul, ol { padding-left: 24px; }
        li { margin-bottom: 8px; }
        .site-footer {
            max-width: 820px; margin: 0 auto; padding: 0 20px 48px;
            text-align: center; font-size: 14px; color: var(--ink-500);
        }
        .site-footer a { color: var(--ink-500); margin: 0 10px; text-decoration: none; }
        .site-footer a:hover { color: var(--brand-700); text-decoration: underline; }
        @media (max-width: 600px) { .doc { padding: 24px 20px; } h1 { font-size: 1.6rem; } }
    </style>
</head>
<body>
    <header class="site-header">
        <div class="inner">
            <a href="/" aria-label="Tipwave home"><img src="/images/logo/tipwave-logo-v2.png" alt="Tipwave"></a>
            <a href="/" class="back-link">← Back to Tipwave</a>
        </div>
    </header>
    <main>
        <article class="doc">
            ${content}
        </article>
    </main>
    <footer class="site-footer">
        <p>
            <a href="/terms-of-service.html">Terms of service</a>
            <a href="/privacy-policy.html">Privacy policy</a>
            <a href="/acceptable-use-policy.html">Acceptable use</a>
            <a href="/refund-policy.html">Refund policy</a>
        </p>
        <p>&copy; 2026 Tipwave. All rights reserved.</p>
    </footer>
</body>
</html>`;

const files = [
    { md: 'terms-of-service.md', html: 'terms-of-service.html', title: 'Terms of Service' },
    { md: 'privacy-policy.md', html: 'privacy-policy.html', title: 'Privacy Policy' },
    { md: 'acceptable-use-policy.md', html: 'acceptable-use-policy.html', title: 'Acceptable Use Policy' },
    { md: 'refund-policy.md', html: 'refund-policy.html', title: 'Refund Policy' }
];

const publicDir = path.join(__dirname, 'public');

files.forEach(({ md, html, title }) => {
    const mdPath = path.join(publicDir, md);
    const htmlPath = path.join(publicDir, html);
    
    const markdown = fs.readFileSync(mdPath, 'utf-8');
    const content = marked(markdown);
    const fullHtml = template(title, content);
    
    fs.writeFileSync(htmlPath, fullHtml);
    console.log(`✓ Generated ${html}`);
});

console.log('All legal pages generated successfully!');
