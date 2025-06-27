// Get all <pre> tags with the class myPreTag
const preTags = document.querySelectorAll("#myPreTag");

// Loop through each <pre> tag
preTags.forEach(preTag => {

    // Create a copy button element
    const copyButton = document.createElement("spam");
    copyButton.innerText = "Copiar";
    copyButton.classList.add("copy-button");

    // Append the copy button to the <pre> tag
    preTag.appendChild(copyButton);

    // Add click event listener to the copy button
    copyButton.addEventListener("click", () => {
        // Hide the copy button temporarily
        copyButton.style.display = "none";

        // Create a range and select the text inside the <pre> tag
        const range = document.createRange();
        range.selectNode(preTag);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);

        try {
            // Copy the selected text to the clipboard
            document.execCommand("copy");

            // Alert the user that the text has been copied
            copyButton.innerText = "Copiado!";
            setTimeout(() => {
                copyButton.innerText = "Copiar";
            }, 2000);
        } catch (err) {
            console.error("Unable to copy text:", err);
        } finally {
            // Show the copy button again
            copyButton.style.display = "inline";

            // Deselect the text
            window.getSelection().removeAllRanges();
        }
    });
});