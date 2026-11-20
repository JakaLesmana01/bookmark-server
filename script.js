const addBookmarkBtn = document.getElementById("add-bookmark");
const bookmarkList = document.getElementById("bookmark-list");
const bookmarkNameInput = document.getElementById("bookmark-name");
const bookmarkUrlInput = document.getElementById("bookmark-url");

document.addEventListener("DOMContentLoaded", loadBookmark);

addBookmarkBtn.addEventListener("click", addSever);

function addSever() {
  const name = bookmarkNameInput.value.trim();
  const url = bookmarkUrlInput.value.trim();

  if (!name || !url) {
    alert("Pleas enter both name and URL.");
    return;
  } else {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      alert("Please enter a valid URL starting with http:// or https://");
      return;
    }
    addBookmark(name, url);
    saveBookmark(name, url);
    bookmarkNameInput.value = "";
    bookmarkUrlInput.value = "";
  }
}

function addBookmark(name, url) {
  const li = document.createElement("li");
  const link = document.createElement("a");
  link.href = url;
  link.textContent = name;
  link.target = "_blank";

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.addEventListener("click", () => {
      removeBookmarksFromStorage(name,url)
      bookmarkList.removeChild(li);
  });

  li.appendChild(link);
  li.appendChild(removeBtn);
  bookmarkList.appendChild(li);
}

function getBookmarkFromStorage() {
  const bookmarks = localStorage.getItem("bookmarks");
  return bookmarks ? JSON.parse(bookmarks) : [];
}

function saveBookmark(name, url) {
  const bookmark = getBookmarkFromStorage();
  bookmark.push({ name, url });
  localStorage.setItem("bookmarks", JSON.stringify(bookmark));
}

function loadBookmark() {
  const bookmarks = getBookmarkFromStorage();
  bookmarks.forEach((bookmark) => addBookmark(bookmark.name, bookmark.url));
}

function removeBookmarksFromStorage(name,url) {
    let bookmarks = getBookmarkFromStorage();
    bookmarks = bookmarks.filter(bookmark => bookmark.name !== name || bookmark.url !== url);
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
}