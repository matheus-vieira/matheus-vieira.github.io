---
layout: page
title: Professional experience
permalink: /resume/professional-experience/
---

{% highlight js %}
function request(file) {
  const log = console.log;
  fetch(file)
    .then(r => r.json())
    .then(j => log(j));
}
{% endhighlight %}

{% assign experiences = site.experiences | sort: 'admissiondate' %}
{% assign experiences = experiences | reverse%}
{% for experience in experiences %}
  {{ experience.output }}
{% endfor %}
