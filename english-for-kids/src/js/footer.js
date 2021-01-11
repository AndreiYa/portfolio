const footer = document.createElement("footer");
document.body.append(footer);

const footerWrapper = document.createElement("div");
footerWrapper.className = "footer__wrapper";
const authorGitLink = document.createElement("a");
const createYear = document.createElement("span");
const cursLink = document.createElement("a");

footer.append(footerWrapper);
authorGitLink.setAttribute("href", "https://github.com/AndreiYa");
authorGitLink.textContent = "Author GitHub";
createYear.textContent = "2020";
cursLink.setAttribute("href", "https://rs.school/js/");
cursLink.textContent = "Task for RSSchool";

footerWrapper.append(authorGitLink);
footerWrapper.append(createYear);
footerWrapper.append(cursLink);
