function showPDF(pdfPath) {
    if (!pdfPath) {
        alert('PDF coming soon!');
        return;
    }
    
    const content = document.querySelector('.content');
    const title = content.querySelector('h1');
    const page = content.querySelector('p');
    const contentClass = content.className;
    content.innerHTML = `
        ${title.outerHTML}
        ${page.outerHTML}
        <div class="pdf-container">
            <iframe class="pdf-viewer" src="${pdfPath}"></iframe>
        </div>
    `;
}