{% assign lang = page.lang | default: "en-us" %}

<h2>{{ site.messages[lang].print-resume.title.education }}</h2>

{% assign graduations = site.graduations-print | sort: "order" %}
{% for graduation in graduations %}
  {% if graduation.type != "Individual course" and graduation.type != "technical" %}
    {{ graduation }}
  {% endif %}
{% endfor %}
