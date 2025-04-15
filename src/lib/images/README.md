# Image Assets in Svelte Library

This directory contains image assets that can be used throughout the Svelte application.

## Adding Images

1. Place your image files in this directory (`src/lib/images/`)
2. Supported formats include: `.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`, `.webp`

## Using Images in Svelte Components

There are two main ways to use images in your Svelte components:

### 1. Direct Import

```svelte
<script>
  import myImage from '$lib/images/myImage.png';
</script>

<img src={myImage} alt="Description" />
```

### 2. Dynamic Import using @sveltejs/kit

```svelte
<script>
  // Using $lib alias
  const imagePath = '/src/lib/images/myImage.png';
</script>

<img src={imagePath} alt="Description" />
```

## Best Practices

- Use descriptive filenames for your images
- Include meaningful alt text for accessibility
- Consider using `.webp` format for better performance
- For responsive images, consider using `<picture>` element or CSS media queries
- Keep image files optimized and compressed

## Example Directory Structure

```
src/lib/images/
├── logo.svg
├── hero-image.webp
├── icons/
│   ├── menu.svg
│   └── close.svg
└── backgrounds/
    └── pattern.png
```

## Note

Remember to add image files to your version control system unless specifically excluded in `.gitignore`.
