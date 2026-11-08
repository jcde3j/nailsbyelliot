# Nails by Elliot

Static website for Nails by Elliot, served by a dependency-free Node server and deployed on Railway.

## Adding photos

Drop image files (`.jpg`, `.png`, `.webp`) into the folder for their design category under `public/images/`:

| Folder | Gallery tab |
| --- | --- |
| `french` | French |
| `chrome` | Chrome |
| `3d` | 3D |
| `floral` | Floral |
| `blooming-gel` | Blooming Gel |
| `polka-dot` | Polka Dot |
| `other` | Other |

Add a new folder to add a new category. The gallery reads the folders at request time, so a push with new images is all it takes.

## Editing text, prices and contact details

Everything is in `public/index.html`. Search for `TODO` to find what still needs filling in (booking link, phone, Instagram, address). The services and prices section is hidden until the list is ready.

## Run locally

```
npm start
```

Then open http://localhost:3000.
