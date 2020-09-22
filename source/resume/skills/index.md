---
layout: page
permalink: /resume/skills/
---

## Some professional skills that I learned through years

{% assign skills = site.skills | sort: "skill" | sort: "percent" | reverse %}

<article class="page card">
<h2>Spoken languages</h2>

{% for skill in skills %}
  {% if skill.type == "idiom" %}
  {{ skill }}
  {% endif %}
{% endfor %}
</article>

<article class="page card">
<h2>Programming languages</h2>

{% for skill in skills %}
  {% if skill.type == "language" and skill.sub-type == "programming" %}
  {{ skill }}
  {% endif %}
{% endfor %}
</article>

<article class="page card">
<h2>Markup languages</h2>

{% for skill in skills %}
  {% if skill.type == "language" and skill.sub-type == "markup" %}
  {{ skill }}
  {% endif %}
{% endfor %}
</article>

<article class="page card">
<h2>Libraries and frameworks</h2>

{% for skill in skills %}
  {% if skill.type == "framework" and skill.sub-type == "library" %}
  {{ skill }}
  {% endif %}
{% endfor %}
</article>

<article class="page card">
<h2>System architecture and design patterns</h2>

{% for skill in skills %}
  {% if skill.type == "other" and skill.sub-type == "architecture" %}
  {{ skill }}
  {% endif %}
{% endfor %}
</article>

<article class="page card">
<h2>Version control</h2>

{% for skill in skills %}
  {% if skill.type == "other" and skill.sub-type == "version control" %}
  {{ skill }}
  {% endif %}
{% endfor %}
</article>

<article class="page card">
<h2>Design</h2>

{% for skill in skills %}
  {% if skill.type == "other" and skill.sub-type == "design" %}
  {{ skill }}
  {% endif %}
{% endfor %}
</article>
