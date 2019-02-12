{% assign lang = page.lang | default: "en-us" %}

<h2>{{ site.messages[lang].print-resume.title.courses }}</h2>

{% assign list = site.graduations | sort: "order" %}
{% for i in (0..3) %}
  {% if list[i].type == "Individual course" and list[i].type != "technical" %}
<div class="well well-sm">
  {{ site.messages[lang].print-resume.title.institution }}:
  <strong>{{ list[i].institution }}</strong>
  <time datetime="{{ list[i].startdate }}">{{ list[i].startdate | date: "%Y" }}</time> - <time datetime="{{ list[i].enddate }}">{{ list[i].enddate | date: "%Y" }}</time>
  <p>{{ site.messages[lang].print-resume.title.course }}: <strong>{{ g[lang].name }}</strong></p>
</div>
  {% endif %}
{% endfor %}
