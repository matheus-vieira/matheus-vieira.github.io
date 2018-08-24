---
layout: page
permalink: /contact/
---

## Leave a message

<form id="contact" method="POST" action="https://formspree.io/matheus.costa.vieira@gmail.com">
  <input type="hidden" name="_next" value="{{ "/contact/thanks/" | prepend: site.baseurl }}" />
  <input type="hidden" name="_language" value="en-US" />
  <select id="mail-select">
    <option value="{{ site.author.email }}" selected>Personal - {{ site.author.email }}</option>
    <option value="{{ site.author.email-prof }}">Teacher - {{ site.author.email-prof }}</option>
  </select>
  <input type="email" name="email" placeholder="Your email" required />
  <input type="text" name="_subject" placeholder="Type a subject!" required />
  <textarea name="message" placeholder="Your message" required></textarea>
  <button type="submit" class="btn btn-ghost">Send</button>
</form>
<script>
  var _0xee9e=["\x75\x73\x65\x20\x73\x74\x72\x69\x63\x74","\x6F\x6E\x6C\x6F\x61\x64","\x63\x6F\x6E\x74\x61\x63\x74","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64","\x6D\x61\x69\x6C\x2D\x73\x65\x6C\x65\x63\x74","\x63\x68\x61\x6E\x67\x65","\x61\x63\x74\x69\x6F\x6E","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x66\x6F\x72\x6D\x73\x70\x72\x65\x65\x2E\x69\x6F\x2F","\x76\x61\x6C\x75\x65","\x61\x64\x64\x45\x76\x65\x6E\x74\x4C\x69\x73\x74\x65\x6E\x65\x72"];_0xee9e[0];!function(_0xdbdex1,_0xdbdex2){_0xdbdex1[_0xee9e[1]]= function(){var _0xdbdex1=_0xdbdex2[_0xee9e[3]](_0xee9e[2]),_0xdbdex3=_0xdbdex2[_0xee9e[3]](_0xee9e[4]);_0xdbdex3[_0xee9e[9]](_0xee9e[5],function(){return _0xdbdex1[_0xee9e[6]]= _0xee9e[7]+ _0xdbdex3[_0xee9e[8]]})}}(window,document)
</script>
{% comment %}
// use https://babeljs.io/repl
// then use https://javascript-minifier.com/
// then use https://javascriptobfuscator.com/Javascript-Obfuscator.aspx
((w, d) => w.onload = () => {
  const f = d.getElementById('contact');
  const m = d.getElementById('mail-select');
  m.addEventListener('change', () => f.action = `https://formspree.io/${m.value}`);
})(window, document);
{% endcomment %}