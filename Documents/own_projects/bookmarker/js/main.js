//Listen for form submit
var myForm = document.getElementById('myForm');

myForm.addEventListener('submit', saveBookmark);

function saveBookmark(event){
  var siteName = document.getElementById('siteName').value;
  var siteURL = document.getElementById('siteURL').value;
  if(!validateForm(siteName, siteURL)) {
    return false;
  }
  var bookmark = {
    name: siteName,
    url: siteURL
  }

  // localStorage.setItem('test', 'Hello world');
  // console.log(localStorage.getItem('test'));
  // localStorage.removeItem('test');
  // console.log(localStorage.getItem('test'));

  if(localStorage.getItem('bookmarks') === null) {
    var bookmarks = [];
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  myForm.reset(); 

  fetchBookmarks();
  // prevent form from submitting
  event.preventDefault();
}

function deleteBookmark(url) {
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  for(let i = 0; i < bookmarks.length; i++) {
    if(bookmarks[i].url == url) {
      bookmarks.splice(i, 1);
    }
  }
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();
}

function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    console.log(bookmarks)
    var bookmarksResults = document.getElementById('bookmarksResults');

    bookmarksResults.innerHTML = '';
    for(let i = 0; i < bookmarks.length; i++) {
      let name = bookmarks[i].name;
      let url = bookmarks[i].url;
      bookmarksResults.innerHTML += '<div class="well">'+
                                    '<h3>'+name+
                                    '<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
                                    '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'+
                                    '</h3>'+
                                    '</div>'
    }
}

function validateForm(siteName, siteURL) {
  if(!siteName || !siteURL ){
    alert('Please fill in the entire form');
    return false;
  }
var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);
if(!siteURL.match(regex)) {
  alert('Please use a valid URL');
  return false;
}
 return true;
}
