{% assign lang = page.lang | default: "en-us" %}

<h2>{{ site.messages[lang].print-resume.title.education }}</h2>

{% if site.graduations %}
  {% assign graduations = site.graduations | sort: "order" %}
{% else %}
  {% assign graduations = "" | split: "" %}
{% endif %}
{% for g in graduations reversed %}
  {% if g.type != "Individual course" and g.type != "technical" %}
<div class="page">
  <strong>{{ g[lang].name }}</strong> &mdash; {{ g.institution }} (<time datetime="{{ g.startdate }}">{{ g.startdate | date: "%Y" }}</time> &dash; <time datetime="{{ g.enddate }}">{{ g.enddate | date: "%Y" }}</time>)
</div>
  {% endif %}
{% endfor %}
