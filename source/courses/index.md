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
<script>var _0xef88=["\x75\x73\x65\x20\x73\x74\x72\x69\x63\x74","\x75\x6C\x50\x61\x67\x65\x73","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x6D\x61\x74\x68\x65\x75\x73\x2D\x76\x69\x65\x69\x72\x61\x2E\x67\x69\x74\x68\x75\x62\x2E\x69\x6F","\x6C\x6F\x61\x64\x69\x6E\x67","\x64\x69\x73\x70\x6C\x61\x79","\x73\x74\x79\x6C\x65","\x6E\x6F\x6E\x65","\x68\x61\x73\x5F\x70\x61\x67\x65\x73","\x68\x6F\x6D\x65\x70\x61\x67\x65","\x69\x6E\x63\x6C\x75\x64\x65\x73","\x68\x33","\x61","\x6E\x61\x6D\x65","\x20\x2D\x20","\x64\x65\x73\x63\x72\x69\x70\x74\x69\x6F\x6E","\x63\x72\x65\x61\x74\x65\x54\x65\x78\x74\x4E\x6F\x64\x65","\x61\x70\x70\x65\x6E\x64\x43\x68\x69\x6C\x64","\x4C\x49","\x63\x72\x65\x61\x74\x65\x45\x6C\x65\x6D\x65\x6E\x74","\x68\x61\x73\x4F\x77\x6E\x50\x72\x6F\x70\x65\x72\x74\x79","\x73\x65\x74\x41\x74\x74\x72\x69\x62\x75\x74\x65","\x6F\x6E\x6C\x6F\x61\x64","\x74\x68\x65\x6E","\x66\x6F\x72\x45\x61\x63\x68","\x6A\x73\x6F\x6E","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x61\x70\x69\x2E\x67\x69\x74\x68\x75\x62\x2E\x63\x6F\x6D\x2F\x75\x73\x65\x72\x73\x2F\x6D\x61\x74\x68\x65\x75\x73\x2D\x76\x69\x65\x69\x72\x61\x2F\x72\x65\x70\x6F\x73"];_0xef88[0];!function(_0x7db3x1,_0x7db3x2){var _0x7db3x3,_0x7db3x4=_0x7db3x2[_0xef88[2]](_0xef88[1]),_0x7db3x5=_0xef88[3],_0x7db3x6=(_0x7db3x3= _0x7db3x2[_0xef88[2]](_0xef88[4]),function(_0x7db3x1){_0x7db3x3[_0xef88[6]][_0xef88[5]]= _0xef88[7]});function _0x7db3x7(_0x7db3x1){if(function(_0x7db3x1){var _0x7db3x2=_0x7db3x1[_0xef88[8]];return _0x7db3x2&=  !!_0x7db3x1[_0xef88[9]],_0x7db3x2&= _0x7db3x1[_0xef88[9]]&& _0x7db3x1[_0xef88[9]][_0xef88[10]](_0x7db3x5),!!(_0x7db3x2&= _0x7db3x1[_0xef88[9]]!= _0x7db3x5)}(_0x7db3x1)){var _0x7db3x3=_0x7db3x8(_0xef88[11]),_0x7db3x6=_0x7db3x8(_0xef88[12],{href:_0x7db3x1[_0xef88[9]]});_0x7db3x6[_0xef88[17]](_0x7db3x2[_0xef88[16]](_0x7db3x1[_0xef88[13]]+ _0xef88[14]+ _0x7db3x1[_0xef88[15]])),_0x7db3x3[_0xef88[17]](_0x7db3x6),_0x7db3x4[_0xef88[17]](_0x7db3x3)}}function _0x7db3x8(_0x7db3x1,_0x7db3x3){var _0x7db3x4=_0x7db3x2[_0xef88[19]](_0x7db3x1|| _0xef88[18]);for(var _0x7db3x5 in _0x7db3x3){_0x7db3x3[_0xef88[20]](_0x7db3x5)&& _0x7db3x4[_0xef88[21]](_0x7db3x5,_0x7db3x3[_0x7db3x5])};return _0x7db3x4}_0x7db3x1[_0xef88[22]]= function(){fetch(_0xef88[26])[_0xef88[23]](function(_0x7db3x1){return _0x7db3x1[_0xef88[25]]()})[_0xef88[23]](function(_0x7db3x1){return _0x7db3x1[_0xef88[24]](_0x7db3x7)})[_0xef88[23]](function(){return _0x7db3x6()})}}(window,document)</script>
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
        .then(r => r.forEach(buildLi))
        .then(() => done());

  };
})(window, document);
{% endcomment %}
