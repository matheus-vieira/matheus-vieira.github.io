---
layout: page
permalink: /repositories/
---


# My Github Public Repositories

<div id="ulPages">{% include loading.html %}</div>

<script>{% if jekyll.environment == "production" %}var _0xba7d=["\x75\x73\x65\x20\x73\x74\x72\x69\x63\x74","\x75\x6C\x50\x61\x67\x65\x73","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64","\x6C\x6F\x61\x64\x69\x6E\x67","\x64\x69\x73\x70\x6C\x61\x79","\x73\x74\x79\x6C\x65","\x6E\x6F\x6E\x65","\x4C\x49","\x63\x72\x65\x61\x74\x65\x45\x6C\x65\x6D\x65\x6E\x74","\x68\x61\x73\x4F\x77\x6E\x50\x72\x6F\x70\x65\x72\x74\x79","\x73\x65\x74\x41\x74\x74\x72\x69\x62\x75\x74\x65","\x68\x33","\x61","\x68\x74\x6D\x6C\x5F\x75\x72\x6C","\x47\x69\x74\x68\x75\x62\x20\x50\x61\x67\x65\x20\x2D\x20","\x6E\x61\x6D\x65","\x20\x2D\x20","\x64\x65\x73\x63\x72\x69\x70\x74\x69\x6F\x6E","\x63\x72\x65\x61\x74\x65\x54\x65\x78\x74\x4E\x6F\x64\x65","\x61\x70\x70\x65\x6E\x64\x43\x68\x69\x6C\x64","\x6F\x6E\x6C\x6F\x61\x64","\x74\x68\x65\x6E","\x66\x6F\x72\x45\x61\x63\x68","\x6A\x73\x6F\x6E","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x61\x70\x69\x2E\x67\x69\x74\x68\x75\x62\x2E\x63\x6F\x6D\x2F\x75\x73\x65\x72\x73\x2F\x6D\x61\x74\x68\x65\x75\x73\x2D\x76\x69\x65\x69\x72\x61\x2F\x72\x65\x70\x6F\x73"];_0xba7d[0];!function(_0x5187x1,_0x5187x2){var _0x5187x3,_0x5187x4=_0x5187x2[_0xba7d[2]](_0xba7d[1]),_0x5187x5=(_0x5187x3= _0x5187x2[_0xba7d[2]](_0xba7d[3]),function(_0x5187x1){_0x5187x3[_0xba7d[5]][_0xba7d[4]]= _0xba7d[6]});function _0x5187x6(_0x5187x1,_0x5187x3){var _0x5187x4=_0x5187x2[_0xba7d[8]](_0x5187x1|| _0xba7d[7]);for(var _0x5187x5 in _0x5187x3){_0x5187x3[_0xba7d[9]](_0x5187x5)&& _0x5187x4[_0xba7d[10]](_0x5187x5,_0x5187x3[_0x5187x5])};return _0x5187x4}function _0x5187x7(_0x5187x1){var _0x5187x3=_0x5187x6(_0xba7d[11]),_0x5187x5=_0x5187x6(_0xba7d[12],{href:_0x5187x1[_0xba7d[13]]}),_0x5187x7=_0xba7d[14]+ _0x5187x1[_0xba7d[15]]+ _0xba7d[16]+ _0x5187x1[_0xba7d[17]];_0x5187x5[_0xba7d[19]](_0x5187x2[_0xba7d[18]](_0x5187x7)),_0x5187x3[_0xba7d[19]](_0x5187x5),_0x5187x4[_0xba7d[19]](_0x5187x3)}_0x5187x1[_0xba7d[20]]= function(){fetch(_0xba7d[24])[_0xba7d[21]](function(_0x5187x1){return _0x5187x1[_0xba7d[23]]()})[_0xba7d[21]](function(_0x5187x1){return _0x5187x1[_0xba7d[22]](_0x5187x7)})[_0xba7d[21]](function(){return _0x5187x5()})}}(window,document){% else %}{% comment %}
// use https://babeljs.io/repl
// then use https://javascript-minifier.com/
// then use https://javascriptobfuscator.com/Javascript-Obfuscator.aspx
{% endcomment %}
(function(w, d) {
  const baseUrl = "https://end2endsystems.github.io",
    ulPages = d.getElementById("ulPages"),
    done = (function doneIFE() {
      var el = d.getElementById("loading");
      return function done(show) {
        el.style.display = "none";
      };
    })();

  function createElement(tag, attributes) {
    const element = d.createElement(tag || "LI");
    for (const key in attributes)
      if (attributes.hasOwnProperty(key))
        element.setAttribute(key, attributes[key]);
    return element;
  }

  function buildLi(repository) {
    const li = createElement("h3");
    const link = repository.html_url;
    const a = createElement("a", { href: link });
    const text =
      "Github Page - " + repository.name + " - " + repository.description;
    a.appendChild(d.createTextNode(text));
    li.appendChild(a);
    ulPages.appendChild(li);
  }

  w.onload = function onload() {
    fetch("https://api.github.com/users/matheus-vieira/repos")
      .then(r => r.json())
      .then(r => r.forEach(buildLi))
      .then(() => done());
  };
})(window, document);{% endif %}</script>
