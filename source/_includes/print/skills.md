{% assign lang = page.lang | default: "en-us" %}

<h2 class="txt-center">Skills</h2>

<h6>{{ site.messages[lang].print-resume.title.skills-idiom }}</h6>
{% assign skills = site.skills | sort: "skill" | sort: "percent" | reverse %}
{% for skill in skills %}
  {% if skill.type == "idiom" %}
<small class="print-skill">
  <label>{% if skill[lang] %} {{ skill[lang].skill }} {% else %} {{ skill["en-us"].skill }} {% endif %} </label>
  <progress value="{{ skill.percent }}" max="100" style="max-width: 100px"></progress>
</small>
  {% endif %}
{% endfor %}
<h6>{{ site.messages[lang].print-resume.title.skills-languages }}</h6>
{% for skill in skills %}
  {% if skill.type == "language" %}
<small class="print-skill">
  <label>{% if skill[lang] %} {{ skill[lang].skill }} {% else %} {{ skill["en-us"].skill }} {% endif %} </label>
  <progress value="{{ skill.percent }}" max="100" style="max-width: 100px"></progress>
</small>
  {% endif %}
{% endfor %}
<h6>{{ site.messages[lang].print-resume.title.skills-framework }}</h6>
{% for skill in skills %}
  {% if skill.type == "framework" %}
<small class="print-skill">
  <label>{% if skill[lang] %} {{ skill[lang].skill }} {% else %} {{ skill["en-us"].skill }} {% endif %} </label>
  <progress value="{{ skill.percent }}" max="100" style="max-width: 100px"></progress>
</small>
  {% endif %}
{% endfor %}
<h6>{{ site.messages[lang].print-resume.title.skills-others }}</h6>
{% for skill in skills %}
  {% if skill.type == "other" %}
<small class="print-skill">
  <label>{% if skill[lang] %} {{ skill[lang].skill }} {% else %} {{ skill["en-us"].skill }} {% endif %} </label>
  <progress value="{{ skill.percent }}" max="100" style="max-width: 100px"></progress>
</small>
  {% endif %}
{% endfor %}
