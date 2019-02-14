{% assign lang = page.lang | default: "en-us" %}

<h2>{{ site.messages[lang].print-resume.title.education }}</h2>

{% assign graduations = site.graduations | sort: "order" %}
{% for g in graduations reversed %}
  {% if g.type != "Individual course" and g.type != "technical" %}
<div class="well well-sm page">
  {{ site.messages[lang].print-resume.title.institution }}:
  <strong>{{ g.institution }}</strong> &mdash;
  <time datetime="{{ g.startdate }}">{{ g.startdate | date: "%Y" }}</time> &dash; <time datetime="{{ g.enddate }}">{{ g.enddate | date: "%Y" }}</time>
  <p>{{ site.messages[lang].print-resume.title.course }}: <strong>{{ g[lang].name }}</strong></p>
</div>
  {% endif %}
{% endfor %}
