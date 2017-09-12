'use strict';

(function populateAllBooks () {
  var appUrl = window.location.pathname;
  var el = document.getElementById('allbooks');
  var wrapper = createEl('div');
  var row = createEl('div', { class: 'row' });

  wrapper.appendChild(row);

  var apiUrl = appUrl === '/dashboard' ? 'api/user/books' : 'api/trades/all';

  ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
    // Convert book data from string to JSON
    data = JSON.parse(data);
    // Create HTML elements for each book
    var col, image, button, icon;
    if (data.items === null) {
      col = createEl('div', { class: 'col-12 mb-4' });
      col.innerHTML = '<p>No items found.</p>'
      row.appendChild(col);
      return;
    };
    data.items.map(function (book) {
      // Create the HTML elements
      col = createEl('div', { class: 'col-4 col-md-3 col-lg-2 mb-4' });
      image = createEl('img', { src: book.info.thumbnail, class: 'w-100' });
      if (appUrl === '/dashboard') {
        button = createEl('a', { href: 'api/user/books/delete?id=' + book._id, class: 'btn-sm btn-danger btn-request ml-3' });
        icon = createEl('i', { class: 'fa fa-times' });
      } else {
        button = createEl('a', { href: '#', class: 'btn-sm btn-primary btn-request ml-3' });
        icon = createEl('i', { class: 'fa fa-retweet' });
      }
      // Structure the HTML elements (Child > Parent)var
      button.appendChild(icon);
      col.appendChild(image);
      col.appendChild(button);
      row.appendChild(col);
    });
  });

  // Append to page
  el.appendChild(wrapper);

  function createEl (tag, attr = {}) {
    var el = document.createElement(tag);
    for ( var a in attr ) {
      el.setAttribute(a, attr[a])
    }
    return el;
  }
})();
