---
layout: page
permalink: /contact/
---

## Leave a message

<form method="POST" action="https://formspree.io/matheus.costa.vieira@gmail.com">
  <input type="hidden" name="_next" value="{{ "/contact/thanks/" | prepend: site.baseurl }}" />
  <input name="email" placeholder="Your email" type="email">
  <textarea name="message" placeholder="Your message"></textarea>
  <button type="submit" class="btn btn-ghost">Send</button>
</form>