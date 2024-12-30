// Load and Render Markdown Function
function renderMarkdown(mdFilePath, containerId) {
    fetch(mdFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load Markdown file: ${mdFilePath}`);
            }
            return response.text();
        })
        .then(mdContent => {
            const converter = new showdown.Converter();
            const htmlContent = converter.makeHtml(mdContent);
            document.getElementById(containerId).innerHTML = htmlContent;
        })
        .catch(error => {
            console.error(error);
            document.getElementById(containerId).innerHTML = "<p>Content could not be loaded.</p>";
        });
}

// Check if we are on a page that requires Markdown rendering
document.addEventListener("DOMContentLoaded", () => {
    const mdContainer = document.getElementById("markdown-content");
    if (mdContainer) {
        const mdFilePath = mdContainer.getAttribute("data-md-file");
        renderMarkdown(mdFilePath, "markdown-content");
    }
});
