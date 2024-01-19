document.addEventListener('DOMContentLoaded', function () {
   var rows = document.querySelectorAll('table .field-is_active');

// Iterate through each row
rows.forEach(function(row) {
    // Get the img element inside the table row
    var img = row.querySelector('img');

    // Traverse up the DOM hierarchy to find the table element
    var currentElement = row;
    while (currentElement && currentElement.tagName !== 'TABLE') {
        // Check the alt attribute value and apply the corresponding class
        if (img.alt === 'True') {
            currentElement.style.backgroundColor = '#E1FFE0';
        } else if (img.alt === 'False') {
            currentElement.style.backgroundColor = '#ffe0e0';
        }

        // Move up to the parent element
        currentElement = currentElement.parentNode;
    }
});
})