{% assign lang = page.lang | default: "en-us" %}

<h2>Skills</h2>

{% assign skills = site.skills | sort: "order" %}
{% for skill in skills %}
  {{ skill }}
{% endfor %}
<hr />
{% for skill in skills %}
  {{ skill }}
{% endfor %}
<hr />
{% for skill in skills %}
  {{ skill }}
{% endfor %}
