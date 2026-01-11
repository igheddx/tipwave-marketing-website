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
    <title>${title} - Tipwave</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
            color: #333;
        }
        h1 {
            color: #1a1a1a;
            border-bottom: 3px solid #00b4a6;
            padding-bottom: 10px;
        }
        h2 {
            color: #1a1a1a;
            margin-top: 40px;
        }
        h3 {
            color: #333;
            margin-top: 30px;
        }
        strong {
            color: #1a1a1a;
        }
        a {
            color: #00b4a6;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        .back-link {
            display: inline-block;
            margin-bottom: 20px;
            padding: 10px 20px;
            background: #00b4a6;
            color: white;
            border-radius: 5px;
        }
        .back-link:hover {
            background: #009688;
            text-decoration: none;
        }
        hr {
            border: none;
            border-top: 1px solid #e0e0e0;
            margin: 30px 0;
        }
        ul, ol {
            padding-left: 30px;
        }
        li {
            margin-bottom: 8px;
        }
    </style>
</head>
<body>
    <a href="/" class="back-link">← Back to Tipwave</a>
    ${content}
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
