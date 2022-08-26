---
layout: page
permalink: /courses/
title: Github Curses Available
---

## [All github repositories]({{ '/repositories' | prepend: site.baseurl }})

<div id="ulPages">{% include loading.html %}</div>

{% assign url = site.baseurl %}
{% if url == '' %}
{% assign url = 'https://end2endsystems.github.io' %}
{% endif %}

<script>{% if jekyll.environment == "production" %}var _0xdada=["\x75\x73\x65\x20\x73\x74\x72\x69\x63\x74","\x75\x6C\x50\x61\x67\x65\x73","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x6D\x61\x74\x68\x65\x75\x73\x2D\x76\x69\x65\x69\x72\x61\x2E\x67\x69\x74\x68\x75\x62\x2E\x69\x6F","\x6C\x6F\x61\x64\x69\x6E\x67","\x64\x69\x73\x70\x6C\x61\x79","\x73\x74\x79\x6C\x65","\x6E\x6F\x6E\x65","\x4C\x49","\x63\x72\x65\x61\x74\x65\x45\x6C\x65\x6D\x65\x6E\x74","\x68\x61\x73\x4F\x77\x6E\x50\x72\x6F\x70\x65\x72\x74\x79","\x73\x65\x74\x41\x74\x74\x72\x69\x62\x75\x74\x65","\x68\x61\x73\x5F\x70\x61\x67\x65\x73","\x68\x6F\x6D\x65\x70\x61\x67\x65","\x69\x6E\x63\x6C\x75\x64\x65\x73","\x68\x33","\x61","\x6E\x61\x6D\x65","\x20\x2D\x20","\x64\x65\x73\x63\x72\x69\x70\x74\x69\x6F\x6E","\x63\x72\x65\x61\x74\x65\x54\x65\x78\x74\x4E\x6F\x64\x65","\x61\x70\x70\x65\x6E\x64\x43\x68\x69\x6C\x64","\x6F\x6E\x6C\x6F\x61\x64","\x74\x68\x65\x6E","\x66\x6F\x72\x45\x61\x63\x68","\x6A\x73\x6F\x6E","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x61\x70\x69\x2E\x67\x69\x74\x68\x75\x62\x2E\x63\x6F\x6D\x2F\x75\x73\x65\x72\x73\x2F\x6D\x61\x74\x68\x65\x75\x73\x2D\x76\x69\x65\x69\x72\x61\x2F\x72\x65\x70\x6F\x73"];_0xdada[0];!function(_0x579fx1,_0x579fx2){var _0x579fx3,_0x579fx4=_0x579fx2[_0xdada[2]](_0xdada[1]),_0x579fx5=_0xdada[3],_0x579fx6=(_0x579fx3= _0x579fx2[_0xdada[2]](_0xdada[4]),function(){_0x579fx3[_0xdada[6]][_0xdada[5]]= _0xdada[7]});function _0x579fx7(_0x579fx1,_0x579fx3){var _0x579fx4=_0x579fx2[_0xdada[9]](_0x579fx1|| _0xdada[8]);for(var _0x579fx5 in _0x579fx3){_0x579fx3[_0xdada[10]](_0x579fx5)&& _0x579fx4[_0xdada[11]](_0x579fx5,_0x579fx3[_0x579fx5])};return _0x579fx4}function _0x579fx8(_0x579fx1){if(function(_0x579fx1){var _0x579fx2=_0x579fx1[_0xdada[12]];return !!(_0x579fx2= (_0x579fx2= (_0x579fx2= _0x579fx2&&  !!_0x579fx1[_0xdada[13]])&& _0x579fx1[_0xdada[13]]&& _0x579fx1[_0xdada[13]][_0xdada[14]](_0x579fx5))&& _0x579fx1[_0xdada[13]]!== _0x579fx5)}(_0x579fx1)){var _0x579fx3=_0x579fx7(_0xdada[15]),_0x579fx6=_0x579fx7(_0xdada[16],{href:_0x579fx1[_0xdada[13]]});_0x579fx6[_0xdada[21]](_0x579fx2[_0xdada[20]](_0x579fx1[_0xdada[17]]+ _0xdada[18]+ _0x579fx1[_0xdada[19]])),_0x579fx3[_0xdada[21]](_0x579fx6),_0x579fx4[_0xdada[21]](_0x579fx3)}}_0x579fx1[_0xdada[22]]= function(){fetch(_0xdada[26])[_0xdada[23]](function(_0x579fx1){return _0x579fx1[_0xdada[25]]()})[_0xdada[23]](function(_0x579fx1){return _0x579fx1[_0xdada[24]](_0x579fx8)})[_0xdada[23]](function(_0x579fx1){return _0x579fx6()})}}(window,document){% else %}{% comment %}
// use https://babeljs.io/repl
// then use https://javascript-minifier.com/
// then use https://javascriptobfuscator.com/Javascript-Obfuscator.aspx
{% endcomment %}(function (w, d) {
    'use strict';
    const ulPages = d.getElementById("ulPages"),
        baseUrl =  "https://end2endsystems.github.io",
        done = (function doneIFE() {
            const el = d.getElementById("loading");
            return function done() {
                el.style.display = 'none';
            };
        }());

    function filter(repository) {
        let ret = repository.has_pages;
        ret = ret && !!repository.homepage;
        ret = ret && repository.homepage && repository.homepage.includes(baseUrl);
        ret = ret && repository.homepage !== baseUrl;
        return !!ret;
    }
    function createElement(tag, attributes) {
        const element = d.createElement(tag || 'LI');
        for (const key in attributes) {
            if (attributes.hasOwnProperty(key)) {
                element.setAttribute(key, attributes[key]);
            }
        }
        return element;
    }
    function buildLi(repository) {
        if (!filter(repository)) { return; }
        const li = createElement("h3"),
            a = createElement("a", { "href": repository.homepage });
        a.appendChild(d.createTextNode(repository.name + ' - ' + repository.description));
        li.appendChild(a);
        ulPages.appendChild(li);
    }

    w.onload = function onload() {
        fetch("https://api.github.com/users/matheus-vieira/repos")
            .then(r => r.json())
            .then(r => r.forEach(buildLi))
            .then(r => done());
    };
}(window, document));{% endif %}</script>
