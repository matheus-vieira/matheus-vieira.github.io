---
layout: page
title: Professional experience
permalink: /resume/professional-experience/
---

{% highlight js %}
function request(file) {
  fetch(file)
    .then(r => r.json())
    .then(console.log);
}
{% endhighlight %}

{% assign experiences = site.experiences | sort: 'admissiondate' %}
{% assign experiences = experiences | reverse%}

{% for experience in experiences %}
  {{ experience.output }}
{% endfor %}
