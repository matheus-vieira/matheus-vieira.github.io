{% assign lang = page.lang | default: "en-us" %}

<h2>{{ site.messages[lang].print-resume.title.experiences }}</h2>

{% assign experiences = site.experiences-print | sort: "order" %}
{% for experience in experiences reversed %}
  {{ experience }}
{% endfor %}
