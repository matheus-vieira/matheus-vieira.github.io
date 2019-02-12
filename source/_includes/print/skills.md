{% assign lang = page.lang | default: "en-us" %}

<h2 class="txt-center">Skills</h2>

<h6>{{ site.messages[lang].print-resume.title.skills-idiom }}</h6>
{% assign skills = site.skills | sort: "skill" | sort: "percent" | reverse %}
{% for skill in skills %}
  {% if skill.type == "idiom" %}
    {{ skill }}
  {% endif %}
{% endfor %}
<h6>{{ site.messages[lang].print-resume.title.skills-languages }}</h6>
{% for skill in skills %}
  {% if skill.type == "language" %}
    {{ skill }}
  {% endif %}
{% endfor %}
<h6>{{ site.messages[lang].print-resume.title.skills-framework }}</h6>
{% for skill in skills %}
  {% if skill.type == "framework" %}
    {{ skill }}
  {% endif %}
{% endfor %}
<h6>{{ site.messages[lang].print-resume.title.skills-others }}</h6>
{% for skill in skills %}
  {% if skill.type == "other" %}
    {{ skill }}
  {% endif %}
{% endfor %}
