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

---

{% assign sorted_experiences = site.experiences | sort: 'admissiondate' | reverse %}
{% assign end2end = sorted_experiences | where_exp: "item", "item.company contains 'End2End'" | first %}
{% assign other_experiences = sorted_experiences | reject: "company", "End2End Systems" %}

{% if end2end %}
  {{ end2end.output }}
{% endif %}

{% for experience in other_experiences %}
  {{ experience.output }}
{% endfor %}
