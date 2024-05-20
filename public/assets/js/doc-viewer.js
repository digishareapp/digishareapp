(function(jQuery) {
    "use strict";
    $(document).on('click', '[data-load-file="file"]', function() {
        setValueOnModal($(this))
    })

    function setValueOnModal(__this) {
        let target = __this.attr('data-load-target')
        let url = __this.attr('data-url')
        let title = __this.attr('data-title')
        let previewUrl = __this.attr('data-preview-url')
        $('.modal-title').html(title)
        $('.modal-preview-link').attr('href', previewUrl)
        loadDocToHtml(target, url)
    }

    function loadDocToHtml(target, url) {
        $(target).html('')
        $(target).officeToHtml({
            url: url,
            pdfSetting: {
                setLang: "",
                setLangFilesPath: "" /*"include/pdf/lang/locale" - relative to app path*/
            }
        });
    }
    const urlParams = new URLSearchParams(window.location.search);
    const param = urlParams.get('page-type');
    let elem
    if (param !== null) {
        switch (param) {
            case 'pdf':
                elem = document.getElementById('pdf-container')
                break;

            case 'docx':
                elem = document.getElementById('docx-container')
                break;

            case 'pptx':
                elem = document.getElementById('pptx-container')
                break;

            case 'xlsx':
                elem = document.getElementById('xlsx-container')
                break;

            default:
                break;
        }
        if (elem !== undefined && elem !== null) {
            setValueOnModal($(elem))
            $('#exampleModal').modal('show')
        }
    }
})(jQuery)