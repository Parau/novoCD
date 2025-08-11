# blogptbr

## 0.2.1

### Patch Changes

- 5fe59b3: alterado pelo jules 2

## 0.2.0

### Minor Changes

- ddff99b: feat: Add thumbnail images to blog posts

  This commit introduces thumbnail images for blog posts in the `blogptbr` application.
  - Updates the `Post` interface and data fetching logic in `lib/posts.ts` to include a `thumb` property.
  - Adds a `thumb` field to the frontmatter of all existing posts.
  - Adds placeholder images to `public/images/thumbs`.
  - Refactors the post list into a new `PostList` client component to display the posts with their thumbnails. This also resolves a React Server Components issue with the Mantine `Card.Section` component.
  - Updates the main page to use the new `PostList` component.

### Patch Changes

- 567c78e: alteracao do jules

## 0.1.1

### Patch Changes

- 93ea212: Teste incial do changeset
