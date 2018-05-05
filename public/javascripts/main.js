$(function () {
  const pageCount = $('#page-count').text();
  const newPageCount = Math.ceil(pageCount / 10);
  const pathname = window.location.pathname.split('/')[1];
  const url = window.location.href.split('=').pop();

  function createButtons (count) {
    const pagination = $('#pagination');
    if (count < 2) { return; }
    let newCount = 0;
    for (var i = 0; i < count; i++) {
      newCount++;
      if (pathname === 'books' && url !== 'checked_out' && url !== 'overdue') {
        pagination.append('<a href="/books/page/' + newCount + '"><button id="page-button">' + newCount + '</button></a>');
      } else if (pathname === 'books' && url === 'checked_out') {
        pagination.append('<a href="/books/page/' + newCount + '?filter=checked_out"><button id="page-button">' + newCount + '</button></a>');
      } else if (pathname === 'books' && url === 'overdue') {
        pagination.append('<a href="/books/page/' + newCount + '?filter=overdue"><button id="page-button">' + newCount + '</button></a>');
      } else if (pathname === 'loans' && url !== 'checked_out' && url !== 'overdue') {
        pagination.append('<a href="/loans/page/' + newCount + '"><button id="page-button">' + newCount + '</button></a>');
      } else if (pathname === 'loans' && url === 'checked_out') {
        pagination.append('<a href="/loans/page/' + newCount + '?filter=checked_out"><button id="page-button">' + newCount + '</button></a>');
      } else if (pathname === 'loans' && url === 'overdue') {
        pagination.append('<a href="/loans/page/' + newCount + '?filter=overdue"><button id="page-button">' + newCount + '</button></a>');
      } else if (pathname === 'patrons' && url !== 'checked_out' && url !== 'overdue') {
        pagination.append('<a href="/patrons/page/' + newCount + '"><button id="page-button">' + newCount + '</button></a>');
      } else if (pathname === 'patrons' && url === 'checked_out') {
        pagination.append('<a href="/patrons/page/' + newCount + '?filter=checked_out"><button id="page-button">' + newCount + '</button></a>');
      } else if (pathname === 'patrons' && url === 'overdue') {
        pagination.append('<a href="/patrons/page/' + newCount + '?filter=overdue"><button id="page-button">' + newCount + '</button></a>');
      }
    }
  }

  createButtons(newPageCount);

  $('.datepicker').datepicker({
    dateFormat: 'yy-mm-dd'
  });

  const search = function() {
    let filter = $('#searchBar').val().toLowerCase();
    let tr = $("tbody tr");
     if (pathname === 'patrons') {
      for (i = 0; i < tr.length; i++) {
          let searchItemsName = tr[i].getElementsByTagName("td")[0];
          let searchItemsAddr = tr[i].getElementsByTagName("td")[1];
          let searchItemsEmail = tr[i].getElementsByTagName("td")[2];
          let searchItemsLib = tr[i].getElementsByTagName("td")[3];
          let searchItemsZip = tr[i].getElementsByTagName("td")[4];
          if ((searchItemsName.innerHTML.toLowerCase().indexOf(filter) > -1) || (searchItemsAddr.innerHTML.toLowerCase().indexOf(filter) > -1) || (searchItemsEmail.innerHTML.toLowerCase().indexOf(filter) > -1) || (searchItemsLib.innerHTML.toLowerCase().indexOf(filter) > -1) || (searchItemsZip.innerHTML.toLowerCase().indexOf(filter) > -1)) {
              tr[i].style.display = "";
          } else {
              tr[i].style.display = "none";
          }
        }
    } else if (pathname === 'books') {
      for (i = 0; i < tr.length; i++) {
          let searchItemsName = tr[i].getElementsByTagName("td")[0];
          let searchItemsAuthor = tr[i].getElementsByTagName("td")[1];
          let searchItemsGenre = tr[i].getElementsByTagName("td")[2];
          let searchItemsPub = tr[i].getElementsByTagName("td")[3];
          if ((searchItemsName.innerHTML.toLowerCase().indexOf(filter) > -1) || (searchItemsAuthor.innerHTML.toLowerCase().indexOf(filter) > -1) || (searchItemsGenre.innerHTML.toLowerCase().indexOf(filter) > -1) || (searchItemsPub.innerHTML.toLowerCase().indexOf(filter) > -1)) {
              tr[i].style.display = "";
          } else {
              tr[i].style.display = "none";
          }
        }
      }
  }
  // Run search function on keyup of search bar input
  $('#searchBar').on('keyup', search);

});
