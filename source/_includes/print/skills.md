{% assign lang = page.lang | default: "en-us" %}

<h2>{{ site.messages[lang].print-resume.title.skills }}</h2>

{% assign skills = site.skills | sort: "order" %}
{% for skill in skills %}
  {{ skill }}
{% endfor %}
