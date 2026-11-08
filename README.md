# Nails by Elliot

Static website for Nails by Elliot, served by a dependency-free Node server and deployed on Railway.

## Adding photos

Drop image files (`.jpg`, `.png`, `.webp`) into the folder for their design category under `public/images/`:

| Folder | Gallery section |
| --- | --- |
| `gel` | Gel |
| `acrylic` | Acrylic |
| `nail-art` | Nail Art |
| `french` | French |
| `seasonal` | Seasonal |
| `bridal` | Bridal |

Add a new folder to add a new category. The gallery reads the folders at request time, so a push with new images is all it takes.

## Editing text, prices and contact details

Everything is in `public/index.html`. Search for `TODO` to find the placeholders (phone, address, booking link, hours, prices).

## Run locally

```
npm start
```

Then open http://localhost:3000.
