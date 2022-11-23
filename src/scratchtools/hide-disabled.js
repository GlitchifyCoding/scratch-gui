var style = document.createElement("style");
style.textContent = `
.blocklyContextMenu > [aria-disabled='true'] {
display: none !important;
}
`;
document.body.appendChild(style)