---
layout: page
permalink: /repositories/
---

<h2>My Github Public Repositories {% include loading.html %}</h2>

<div id="ulPages"></div>

<script>var _0x3144=["\x75\x73\x65\x20\x73\x74\x72\x69\x63\x74","\x75\x6C\x50\x61\x67\x65\x73","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64","\x6C\x6F\x61\x64\x69\x6E\x67","\x64\x69\x73\x70\x6C\x61\x79","\x73\x74\x79\x6C\x65","\x6E\x6F\x6E\x65","\x68\x33","\x61","\x68\x74\x6D\x6C\x5F\x75\x72\x6C","\x47\x69\x74\x68\x75\x62\x20\x50\x61\x67\x65\x20\x2D\x20","\x6E\x61\x6D\x65","\x20\x2D\x20","\x64\x65\x73\x63\x72\x69\x70\x74\x69\x6F\x6E","\x63\x72\x65\x61\x74\x65\x54\x65\x78\x74\x4E\x6F\x64\x65","\x61\x70\x70\x65\x6E\x64\x43\x68\x69\x6C\x64","\x4C\x49","\x63\x72\x65\x61\x74\x65\x45\x6C\x65\x6D\x65\x6E\x74","\x68\x61\x73\x4F\x77\x6E\x50\x72\x6F\x70\x65\x72\x74\x79","\x73\x65\x74\x41\x74\x74\x72\x69\x62\x75\x74\x65","\x6F\x6E\x6C\x6F\x61\x64","\x74\x68\x65\x6E","\x66\x6F\x72\x45\x61\x63\x68","\x6A\x73\x6F\x6E","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x61\x70\x69\x2E\x67\x69\x74\x68\x75\x62\x2E\x63\x6F\x6D\x2F\x75\x73\x65\x72\x73\x2F\x6D\x61\x74\x68\x65\x75\x73\x2D\x76\x69\x65\x69\x72\x61\x2F\x72\x65\x70\x6F\x73"];_0x3144[0];!function(_0xa8f4x1,_0xa8f4x2){var _0xa8f4x3,_0xa8f4x4=_0xa8f4x2[_0x3144[2]](_0x3144[1]),_0xa8f4x5=(_0xa8f4x3= _0xa8f4x2[_0x3144[2]](_0x3144[3]),function(_0xa8f4x1){_0xa8f4x3[_0x3144[5]][_0x3144[4]]= _0x3144[6]});function _0xa8f4x6(_0xa8f4x1){var _0xa8f4x3=_0xa8f4x7(_0x3144[7]),_0xa8f4x5=_0xa8f4x7(_0x3144[8],{href:_0xa8f4x1[_0x3144[9]]}),_0xa8f4x6=_0x3144[10]+ _0xa8f4x1[_0x3144[11]]+ _0x3144[12]+ _0xa8f4x1[_0x3144[13]];_0xa8f4x5[_0x3144[15]](_0xa8f4x2[_0x3144[14]](_0xa8f4x6)),_0xa8f4x3[_0x3144[15]](_0xa8f4x5),_0xa8f4x4[_0x3144[15]](_0xa8f4x3)}function _0xa8f4x7(_0xa8f4x1,_0xa8f4x3){var _0xa8f4x4=_0xa8f4x2[_0x3144[17]](_0xa8f4x1|| _0x3144[16]);for(var _0xa8f4x5 in _0xa8f4x3){_0xa8f4x3[_0x3144[18]](_0xa8f4x5)&& _0xa8f4x4[_0x3144[19]](_0xa8f4x5,_0xa8f4x3[_0xa8f4x5])};return _0xa8f4x4}_0xa8f4x1[_0x3144[20]]= function(){fetch(_0x3144[24])[_0x3144[21]](function(_0xa8f4x1){return _0xa8f4x1[_0x3144[23]]()})[_0x3144[21]](function(_0xa8f4x1){return _0xa8f4x1[_0x3144[22]](_0xa8f4x6)})[_0x3144[21]](function(){return _0xa8f4x5()})}}(window,document)</script>
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

  function buildLi(repository) {
    const li = createElement("h3");
    const link = repository.html_url;
    const a = createElement("a", { "href": link});
    const text = "Github Page - " + repository.name + ' - ' + repository.description;
    a.appendChild(d.createTextNode(text));
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
