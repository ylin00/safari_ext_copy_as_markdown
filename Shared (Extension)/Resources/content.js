browser.runtime.sendMessage({ greeting: "hello" }).then((response) => {
    console.log("Received response: ", response);
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received request: ", request);
});

// Function to handle text conversion
function handleTextConversion() {
    const selectedText = window.getSelection().toString().trim();
    const pageUrl = window.location.href;
    const pageTitle = document.title;
    
    // Send the text to the background script
    browser.runtime.sendMessage({
        action: 'convertToMarkdown',
        text: selectedText,
        url: pageUrl,
        title: pageTitle
    });
}

// Listen for keyboard shortcut (macOS only)
document.addEventListener('keydown', function(event) {
    // Check for Cmd+Shift+D
    if (event.metaKey && event.shiftKey && event.key === 'D') {
        event.preventDefault();
        handleTextConversion();
    }
});

// Listen for messages from the background script
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'contextMenuClicked') {
        handleTextConversion();
    }
});
