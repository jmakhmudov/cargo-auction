document.addEventListener('DOMContentLoaded', function () {
    var rows = document.querySelectorAll('table .field-is_active');

    rows.forEach(function (row) {
        var img = row.querySelector('img');

        var currentElement = row;
        while (currentElement && currentElement.tagName !== 'TABLE') {
            if (img.alt === 'True' && currentElement.tagName === 'TR') {
                currentElement.style.backgroundColor = 'rgba(161, 255, 165, 0.15)';
            } else if (img.alt === 'False' && currentElement.tagName === 'TR') {
                currentElement.style.backgroundColor = 'rgba(255, 146, 146, 0.15)';
            }

            currentElement = currentElement.parentNode;
        }
    });
})