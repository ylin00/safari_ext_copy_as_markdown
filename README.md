# Copy as Markdown Safari Extension
-- all code were written by Cursor

A Safari extension that allows you to copy selected text as markdown with source attribution. Perfect for bloggers, writers, and anyone who frequently needs to quote web content.

## Features

- Copy selected text as markdown with source attribution
- Copy page link as markdown when no text is selected
- Context menu integration
- Keyboard shortcut support (⌘⇧D)
- Native macOS notifications

## Installation

1. Clone this repository
2. Open `copy_as_markdown.xcodeproj` in Xcode
3. Build the project (⌘B)
4. Enable the extension in Safari:
   - Open Safari Preferences
   - Go to Extensions
   - Enable "Copy as Markdown"

## Usage

### Copy Selected Text
1. Select text on any webpage
2. Either:
   - Right-click and select "Copy as Markdown"
   - Use the keyboard shortcut ⌘⇧D
3. The text will be copied as markdown with source attribution

### Copy Page Link
1. Click anywhere on the page (no text selection)
2. Either:
   - Right-click and select "Copy as Markdown"
   - Use the keyboard shortcut ⌘⇧D
3. The page link will be copied as markdown

## Output Format

### With Selected Text
```markdown
> Your selected text here

[Page Title](https://page-url.com)
```

### Without Selected Text
```markdown
[Page Title](https://page-url.com)
```

## Requirements

- macOS 11.0 or later
- Safari 14.0 or later

## License

MIT License - see LICENSE file for details
