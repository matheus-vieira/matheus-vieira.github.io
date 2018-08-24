---
layout: page
permalink: /courses/
---

<h2>Github Curses Available {% include loading.html %}</h2>

<div id="ulPages"></div>

{% assign url = site.baseurl %}
{% if url == '' %}
{% assign url = 'https://matheus-vieira.github.io' %}
{% endif %}
<script>
(function (w, d) {
  const ulPages = d.getElementById("ulPages");
  const baseUrl =  "https://matheus-vieira.github.io";

  const done = (function doneIFE() {
    var el = d.getElementById("loading");
    return function done(show) {
      el.style.display = 'none';
    };
  }());

  function filter(repository) {
    let ret = repository.has_pages;
    ret &= !!repository.homepage;
    ret &= repository.homepage && repository.homepage.includes(baseUrl);
    ret &= repository.homepage != baseUrl;
    return !!ret;
  }
  function buildLi(repository) {
    if (!filter(repository)) return;
    const li = createElement("h3");
    const a = createElement("a", { "href": repository.homepage });
    a.appendChild(d.createTextNode(repository.name + ' - ' + repository.description));
    li.appendChild(a);
    ulPages.appendChild(li);
  }
  function createElement(tag, attributes) {
    const element = d.createElement(tag || 'LI');
    for (const key in attributes)
    if (attributes.hasOwnProperty(key))
      element.setAttribute(key, attributes[key]);
    return element;
  }

  w.onload = function onload() {
      fetch("https://api.github.com/users/matheus-vieira/repos")
        .then(r => r.json())
        .then(r => r.forEach(buildLi))
        .then(() => done());

  };
})(window, document);
</script>
{% comment %}
// use https://babeljs.io/repl
// then use https://javascript-minifier.com/
// then use https://javascriptobfuscator.com/Javascript-Obfuscator.aspx
(function (w, d) {
  const ulPages = d.getElementById("ulPages");
  const baseUrl =  "https://matheus-vieira.github.io";

  const done = (function doneIFE() {
    var el = d.getElementById("loading");
    return function done(show) {
      el.style.display = 'none';
    };
  }());

  function filter(repository) {
    let ret = repository.has_pages;
    ret &= !!repository.homepage;
    ret &= repository.homepage && repository.homepage.includes(baseUrl);
    ret &= repository.homepage != baseUrl;
    return !!ret;
  }
  function buildLi(repository) {
    if (!filter(repository)) return;
    const li = createElement("h3");
    const a = createElement("a", { "href": repository.homepage });
    a.appendChild(d.createTextNode(repository.name + ' - ' + repository.description));
    li.appendChild(a);
    ulPages.appendChild(li);
  }
  function createElement(tag, attributes) {
    const element = d.createElement(tag || 'LI');
    for (const key in attributes)
    if (attributes.hasOwnProperty(key))
      element.setAttribute(key, attributes[key]);
    return element;
  }

  w.onload = function onload() {
      fetch("https://api.github.com/users/matheus-vieira/repos")
        .then(r => r.json())
        .then(r => r.forEach(buildLi));
        //.then(() => done());

  };
})(window, document);
{% endcomment %}