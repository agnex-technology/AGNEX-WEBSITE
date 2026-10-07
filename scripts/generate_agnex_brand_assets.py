import os
import base64
import numpy as np
from PIL import Image, ImageDraw, ImageFont

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.dirname(SCRIPT_DIR)
SRC_PATH = os.path.join(REPO_ROOT, "assets", "images", "logo.png")
if not os.path.exists(SRC_PATH):
    SRC_PATH = os.path.join(REPO_ROOT, "logo.png")
BRAND_DIR = os.path.join(REPO_ROOT, "public", "brand")
PUBLIC_DIR = os.path.join(REPO_ROOT, "public")

os.makedirs(BRAND_DIR, exist_ok=True)
os.makedirs(PUBLIC_DIR, exist_ok=True)

# 1. Load original uploaded image
orig_img = Image.open(SRC_PATH).convert('RGB')
arr = np.array(orig_img).astype(float)

# 2. Crop logo bounding box
mask = np.any(arr < 240, axis=2)
coords = np.argwhere(mask)
y0, x0 = coords.min(axis=0)
y1, x1 = coords.max(axis=0)

pad = 16
y0_pad = max(0, y0 - pad)
x0_pad = max(0, x0 - pad)
y1_pad = min(orig_img.height, y1 + pad)
x1_pad = min(orig_img.width, x1 + pad)
crop = arr[y0_pad:y1_pad, x0_pad:x1_pad]

# 3. Alpha extraction (transparent background)
min_c = np.min(crop, axis=2)
alpha = 255.0 - min_c
alpha = np.clip((alpha - 6.0) * (255.0 / (255.0 - 6.0)), 0, 255)
a_norm = np.maximum(alpha / 255.0, 1e-4)[:, :, None]

fg = (crop - 255.0 * (1.0 - a_norm)) / a_norm
fg = np.clip(fg, 0, 255)

# Dark version (original dark text #0C1C29 + blue #057AEF)
logo_dark_rgba = np.dstack([fg.astype(np.uint8), alpha.astype(np.uint8)])
img_dark = Image.fromarray(logo_dark_rgba, 'RGBA')
img_dark.save(os.path.join(BRAND_DIR, "agnex-logo.png"), "PNG", optimize=True)

# Light version (white text #F7F8FA + exact same blue #057AEF)
blue_metric = (fg[:, :, 2] - fg[:, :, 0] - 15.0) / 80.0
blue_weight = np.clip(blue_metric, 0.0, 1.0)[:, :, None]
white_target = np.array([247.0, 248.0, 250.0])
light_fg = fg * blue_weight + white_target * (1.0 - blue_weight)
light_fg = np.clip(light_fg, 0, 255).astype(np.uint8)

logo_light_rgba = np.dstack([light_fg, alpha.astype(np.uint8)])
img_light = Image.fromarray(logo_light_rgba, 'RGBA')
img_light.save(os.path.join(BRAND_DIR, "agnex-logo-light.png"), "PNG", optimize=True)

# 4. Extract Mark (X + soaring arrow)
# In cropped coordinates:
# Find horizontal boundary where X and arrow live (approx right 35% of the logo)
crop_w, crop_h = crop.shape[1], crop.shape[0]
x_start_mark = int(crop_w * 0.67) # start around 67%
mark_strip = (alpha[:, x_start_mark:] > 20)
mark_coords = np.argwhere(mark_strip)
if len(mark_coords) > 0:
    my0, mx0 = mark_coords.min(axis=0)
    my1, mx1 = mark_coords.max(axis=0)
    mx0 += x_start_mark
    mx1 += x_start_mark
    
    # Pad slightly to square
    mw = mx1 - mx0
    mh = my1 - my0
    pad_m = 12
    mx0 = max(0, mx0 - pad_m)
    mx1 = min(crop_w, mx1 + pad_m)
    my0 = max(0, my0 - pad_m)
    my1 = min(crop_h, my1 + pad_m)
    
    mark_dark = img_dark.crop((mx0, my0, mx1, my1))
    mark_light = img_light.crop((mx0, my0, mx1, my1))
    
    mark_dark.save(os.path.join(BRAND_DIR, "agnex-mark.png"), "PNG", optimize=True)
    mark_light.save(os.path.join(BRAND_DIR, "agnex-mark-light.png"), "PNG", optimize=True)

# 5. Generate Favicons
# Create square icon on dark background #0B0D10
def create_square_icon(size, light_mark):
    icon = Image.new('RGBA', (size, size), (11, 13, 16, 255))
    draw = ImageDraw.Draw(icon)
    
    # Scale mark to fit nicely within square (approx 72% of size)
    target_w = int(size * 0.76)
    aspect = light_mark.width / light_mark.height
    target_h = int(target_w / aspect)
    if target_h > int(size * 0.76):
        target_h = int(size * 0.76)
        target_w = int(target_h * aspect)
    
    scaled_mark = light_mark.resize((target_w, target_h), Image.Resampling.LANCZOS)
    pos_x = (size - target_w) // 2
    pos_y = (size - target_h) // 2
    icon.paste(scaled_mark, (pos_x, pos_y), scaled_mark)
    return icon

fav_32 = create_square_icon(32, mark_light)
fav_180 = create_square_icon(180, mark_light)
fav_192 = create_square_icon(192, mark_light)
fav_512 = create_square_icon(512, mark_light)

fav_32.save(os.path.join(PUBLIC_DIR, "favicon-32.png"), "PNG")
fav_180.save(os.path.join(PUBLIC_DIR, "favicon-180.png"), "PNG")
fav_192.save(os.path.join(PUBLIC_DIR, "favicon-192.png"), "PNG")
fav_512.save(os.path.join(PUBLIC_DIR, "favicon-512.png"), "PNG")
fav_512.save(os.path.join(PUBLIC_DIR, "pwa-512.png"), "PNG")

# Multi-res favicon.ico
fav_16 = create_square_icon(16, mark_light)
fav_48 = create_square_icon(48, mark_light)
fav_16.save(
    os.path.join(PUBLIC_DIR, "favicon.ico"),
    format="ICO",
    sizes=[(16, 16), (32, 32), (48, 48)],
    append_images=[fav_32, fav_48]
)

# 6. Generate SVG files with embedded high-DPI data uri to preserve 100% exact raster geometry
with open(os.path.join(BRAND_DIR, "agnex-logo.png"), "rb") as f:
    dark_b64 = base64.b64encode(f.read()).decode('utf-8')
with open(os.path.join(BRAND_DIR, "agnex-logo-light.png"), "rb") as f:
    light_b64 = base64.b64encode(f.read()).decode('utf-8')
with open(os.path.join(BRAND_DIR, "agnex-mark-light.png"), "rb") as f:
    mark_light_b64 = base64.b64encode(f.read()).decode('utf-8')

w_logo, h_logo = img_dark.size
svg_dark = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w_logo} {h_logo}" width="{w_logo}" height="{h_logo}">
  <title>AGNEX Technology Logo</title>
  <image width="{w_logo}" height="{h_logo}" href="data:image/png;base64,{dark_b64}"/>
</svg>'''

svg_light = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w_logo} {h_logo}" width="{w_logo}" height="{h_logo}">
  <title>AGNEX Technology Logo (Light)</title>
  <image width="{w_logo}" height="{h_logo}" href="data:image/png;base64,{light_b64}"/>
</svg>'''

w_mark, h_mark = mark_light.size
svg_mark = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w_mark} {h_mark}" width="{w_mark}" height="{h_mark}">
  <title>AGNEX Technology Mark</title>
  <image width="{w_mark}" height="{h_mark}" href="data:image/png;base64,{mark_light_b64}"/>
</svg>'''

svg_favicon = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="10" fill="#0B0D10"/>
  <rect width="62" height="62" x="1" y="1" rx="9" fill="none" stroke="#20242B" stroke-width="1"/>
  <image x="8" y="14" width="48" height="{int(48 * (h_mark/w_mark))}" href="data:image/png;base64,{mark_light_b64}"/>
</svg>'''

with open(os.path.join(BRAND_DIR, "agnex-logo.svg"), "w", encoding="utf-8") as f:
    f.write(svg_dark)
with open(os.path.join(BRAND_DIR, "agnex-logo-light.svg"), "w", encoding="utf-8") as f:
    f.write(svg_light)
with open(os.path.join(BRAND_DIR, "agnex-mark.svg"), "w", encoding="utf-8") as f:
    f.write(svg_mark)
with open(os.path.join(BRAND_DIR, "agnex-favicon.svg"), "w", encoding="utf-8") as f:
    f.write(svg_favicon)
with open(os.path.join(PUBLIC_DIR, "favicon.svg"), "w", encoding="utf-8") as f:
    f.write(svg_favicon)

# 7. Generate Open Graph Card (agnex-og.png, 1200x630)
og_w, og_h = 1200, 630
og = Image.new('RGBA', (og_w, og_h), (11, 13, 16, 255))
draw = ImageDraw.Draw(og)

# Subtle architectural grid markers
grid_color = (32, 36, 43, 180)
for x in range(60, og_w, 120):
    draw.line([(x, 0), (x, og_h)], fill=(20, 24, 30, 255), width=1)
for y in range(45, og_h, 90):
    draw.line([(0, y), (og_w, y)], fill=(20, 24, 30, 255), width=1)

# Subtle ambient glow behind logo
glow = Image.new('RGBA', (og_w, og_h), (0, 0, 0, 0))
glow_draw = ImageDraw.Draw(glow)
glow_draw.ellipse([og_w//2 - 240, 120, og_w//2 + 240, 340], fill=(5, 122, 239, 35))
glow = glow.filter(Image.fromarray(np.zeros((1,1), dtype=np.uint8)).filter) if False else glow
og = Image.alpha_composite(og, glow)

# Paste light logo scaled to width 520px
og_logo_w = 520
og_logo_h = int(og_logo_w * (h_logo / w_logo))
og_logo_scaled = img_light.resize((og_logo_w, og_logo_h), Image.Resampling.LANCZOS)
logo_x = (og_w - og_logo_w) // 2
logo_y = 160
og.paste(og_logo_scaled, (logo_x, logo_y), og_logo_scaled)

# Draw clean typography below logo
# Try loading Inter/Arial
try:
    font_sub = ImageFont.truetype("arial.ttf", 34)
    font_promise = ImageFont.truetype("arial.ttf", 22)
    font_url = ImageFont.truetype("arial.ttf", 16)
except Exception:
    font_sub = ImageFont.load_default()
    font_promise = ImageFont.load_default()
    font_url = ImageFont.load_default()

text_sub = "Engineering What's Next."
text_promise = "Ideas, engineered into impact."
text_url = "AGNEX.TECH  •  01 DIGITAL  •  02 SYSTEMS  •  03 INTELLIGENCE  •  04 ENGINEERING"

draw = ImageDraw.Draw(og)
# Centered text drawing
def draw_center(text, y, font, fill):
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    draw.text(((og_w - tw)//2, y), text, font=font, fill=fill)

draw_center(text_sub, logo_y + og_logo_h + 55, font_sub, (247, 248, 250, 255))
draw_center(text_promise, logo_y + og_logo_h + 105, font_promise, (124, 132, 144, 255))

# Bottom subtle border and metadata
draw.line([(80, og_h - 70), (og_w - 80, og_h - 70)], fill=(32, 36, 43, 255), width=1)
draw_center(text_url, og_h - 45, font_url, (90, 98, 110, 255))

og.convert('RGB').save(os.path.join(BRAND_DIR, "agnex-og.png"), "PNG", optimize=True)

# 8. Remove legacy Vantrex brand files in public/brand/
for fname in os.listdir(BRAND_DIR):
    if fname.startswith("Vantrex"):
        try:
            os.remove(os.path.join(BRAND_DIR, fname))
            print(f"Removed legacy: {fname}")
        except Exception as e:
            pass

print("AGNEX brand assets successfully generated!")
