function convertToMarkdown(text, url, title) {
    let markdown = '';
    
    if (text) {
        // If text is selected, create a markdown quote with the selected text
        markdown = `> ${text}\n\n`;
    }
    
    // Add source attribution
    markdown += `[${title}](${url})`;
    
    return markdown;
}

// Create context menu item
browser.contextMenus.create({
    id: "copy-as-markdown",
    title: "Copy as Markdown",
    contexts: ["selection", "page"]
});

// Handle context menu clicks
browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "copy-as-markdown") {
        browser.tabs.sendMessage(tab.id, { action: "contextMenuClicked" });
    }
});

// Handle keyboard commands
browser.commands.onCommand.addListener((command) => {
    if (command === "copy-as-markdown") {
        browser.tabs.query({active: true, currentWindow: true}, (tabs) => {
            browser.tabs.sendMessage(tabs[0].id, { action: "contextMenuClicked" });
        });
    }
});

// Handle messages from content script
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'convertToMarkdown') {
        const markdown = convertToMarkdown(message.text, message.url, message.title);
        
        // Copy to clipboard
        navigator.clipboard.writeText(markdown).then(() => {
            // Show a notification that the text was copied
            browser.runtime.sendNativeMessage('copy_as_markdown', {
                status: 'success',
                message: 'Text copied as markdown!'
            });
        }).catch(err => {
            browser.runtime.sendNativeMessage('copy_as_markdown', {
                status: 'error',
                message: 'Failed to copy text: ' + err.message
            });
        });
    }
});
