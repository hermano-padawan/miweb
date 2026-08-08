import os
import re
import pathlib
import hashlib

root = pathlib.Path('src/content')
files = sorted(root.rglob('*.md'))
print(f'Processing {len(files)} markdown files...')
for path in files:
    text = path.read_text(encoding='utf-8')
    m = re.match(r'^---\s*\n(.*?)\n---\s*\n', text, re.S)
    if not m:
        continue
    fm = m.group(1)
    title_m = re.search(r'^title:\s*(?:"([^"]+)"|\'([^\']+)\'|(.+))$', fm, re.M)
    cat_m = re.search(r'^category:\s*(?:"([^"]+)"|\'([^\']+)\'|(.+))$', fm, re.M)
    if title_m:
        title = title_m.group(1) or title_m.group(2) or title_m.group(3).strip()
    else:
        title = path.stem
    if cat_m:
        category = cat_m.group(1) or cat_m.group(2) or cat_m.group(3).strip()
    else:
        category = ''
    section = path.parts[2]
    slug = path.stem
    outdir = pathlib.Path('public/images') / section / 'articles'
    outdir.mkdir(parents=True, exist_ok=True)
    filename = f'{slug}.svg'
    outpath = outdir / filename
    h = hashlib.sha1(slug.encode('utf-8')).hexdigest()
    hue = int(h[:6], 16) % 360
    bg = f'hsl({hue}, 70%, 46%)'
    txt = 'white'
    words = title.split()
    lines = []
    line = ''
    for w in words:
        if len(line) + len(w) + 1 > 24:
            lines.append(line.strip())
            line = w + ' '
        else:
            line += w + ' '
    if line:
        lines.append(line.strip())
    if len(lines) > 3:
        lines = [' '.join(lines[:2]), ' '.join(lines[2:])] if len(lines) == 4 else lines[:3]
    width, height = 1200, 630
    text_y = 160
    line_height = 80
    content = [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">',
        f'  <rect width="100%" height="100%" fill="{bg}"/>',
        '  <defs>',
        '    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">',
        '      <stop offset="0%" stop-color="rgba(255,255,255,0.12)"/>',
        '      <stop offset="100%" stop-color="rgba(0,0,0,0.16)"/>',
        '    </linearGradient>',
        '  </defs>',
        '  <rect x="0" y="0" width="100%" height="100%" fill="url(#g)"/>',
        '  <text x="60" y="100" font-family="Inter, Arial, sans-serif" font-size="45" fill="rgba(255,255,255,0.8)" font-weight="600">Nexo Bíblico</text>',
        '  <rect x="60" y="120" width="1100" height="5" fill="rgba(255,255,255,0.5)" rx="2"/>'
    ]
    for idx, ln in enumerate(lines[:3]):
        y = text_y + idx * line_height
        content.append(f'  <text x="60" y="{y}" font-family="Inter, Arial, sans-serif" font-size="70" fill="{txt}" font-weight="700">{ln}</text>')
    if category:
        y = text_y + min(len(lines), 3) * line_height + 20
        content.append(f'  <text x="60" y="{y}" font-family="Inter, Arial, sans-serif" font-size="38" fill="rgba(255,255,255,0.82)">{category}</text>')
    content.extend([
        '  <rect x="60" y="520" width="1080" height="70" fill="rgba(255,255,255,0.08)" rx="18"/>',
        '  <text x="80" y="568" font-family="Inter, Arial, sans-serif" font-size="28" fill="rgba(255,255,255,0.72)">Contenido Nexo Bíblico</text>',
        '</svg>'
    ])
    outpath.write_text('\n'.join(content), encoding='utf-8')
    new_image_path = f'/images/{section}/articles/{filename}'
    if 'image:' in fm:
        new_fm = re.sub(r'(^image:).*$', f'\1 "{new_image_path}"', fm, flags=re.M)
    else:
        new_fm = fm + f'\nimage: "{new_image_path}"'
    new_text = text[:m.start(1)] + new_fm + text[m.end(1):]
    path.write_text(new_text, encoding='utf-8')
    print(f'Updated {path}: image -> {new_image_path}')
