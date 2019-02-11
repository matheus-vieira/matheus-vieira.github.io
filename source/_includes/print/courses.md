{% assign lang = page.lang | default: "en-us" %}

<h2>{{ site.messages[lang].print-resume.title.courses }}</h2>

{% assign graduations = site.graduations-print | sort: "order" %}
{% for graduation in graduations reversed %}
  {% if graduation.type == "Individual course" and graduation.type != "technical" %}
    {{ graduation }}
  {% endif %}
{% endfor %}
