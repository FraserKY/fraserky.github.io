# Editing this site

No build step. Five HTML pages, one stylesheet, one script. Edit, save, refresh.

## Live preview while you type

1. Open the repo folder in VS Code.
2. Install the **Live Preview** extension (VS Code will offer it — it's in
   `.vscode/extensions.json`).
3. Open `index.html`, press `Ctrl+Shift+P`, run **Live Preview: Show Preview**.

The preview refreshes on save, so you can watch the page change as you edit.

Double-clicking an HTML file also works, but the theme toggle's memory behaves
differently on `file://` than on the live site. Use Live Preview for anything
involving the theme.

## Where the text is

Every editable block is marked with a comment:

```html
<!-- EDIT: section "It works inside the conditions it was trained on" -->
```

Search a file for `EDIT:` to jump between them. Change the words between the
tags, leave the tags themselves alone.

```html
<p>old wording</p>   ->   <p>new wording</p>
```

## Rules

Leave alone: anything inside `<head>`, and `class="..."` attributes.

Entities are punctuation, not code:

| You type    | You get |
|-------------|---------|
| `&mdash;`   | —       |
| `&ndash;`   | –       |
| `&rsquo;`   | ’       |
| `&hellip;`  | …       |
| `&amp;`     | &       |

Use `&rsquo;` for apostrophes in words like `don&rsquo;t`. A plain `'` works
too, it just looks slightly worse.

## Adding a project

1. Add the page: copy `jetson-nano.html`, rename it, edit the text.
2. Add the card: in `index.html`, find `EDIT: project cards` and copy a whole
   `<a class="card">` block.
3. Add it to the dropdown: in the `<div class="menu">` block of every page,
   copy one `<a href="...">` line.

## Adding an image

Put the file in `Images/`, then swap the grey placeholder for a real image:

```html
<div class="slot">Images/jetson-card.jpg</div>
```

becomes

```html
<img src="Images/jetson-card.jpg" alt="Describe the picture here">
```

Resize photos to about 1600px wide before committing. Straight-off-the-phone
photos are several MB each and make the page slow.

## Changing the look

`assets/site.css`, the `:root` block at the top. Colours, corner radii and
shadows are all variables — change one and every page follows. The
`:root[data-theme="dark"]` block below it is the dark equivalent.

## Publishing

```
git add -A
git commit -m "what you changed"
git push
```

Live at https://fraserky.github.io a minute or so later.
