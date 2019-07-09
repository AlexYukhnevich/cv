const downloadBtn = document.querySelector('.download');

downloadBtn.addEventListener('click', (e) => {
    html2canvas(document.querySelector('.container'))
            .then(canvas => {
                let contentWidth = canvas.width;
                let contentHeight = canvas.height;
                let pageHeight = contentWidth / 592.28 * 841.89;
                let leftHeight = contentHeight;
                let position = 0;
                let imgWidth = 595.28;
                let imgHeight = 592.28/contentWidth * contentHeight;
                let pageData = canvas.toDataURL('image/jpeg', 1.0);
                let pdf = new jsPDF('', 'pt', 'a4');
                if (leftHeight < pageHeight) {
                    pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight );
                } else {
                    while(leftHeight > 0) {
                        pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                        leftHeight -= pageHeight;
                        position -= 841.89;
                        if(leftHeight > 0) {
                            pdf.addPage();
                        }
                    }
                }
                pdf.save('cv.pdf');
            })
});
