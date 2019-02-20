---
layout: page
permalink: /resume/skills/
---

{% assign skills = site.skills | sort: "skill" | sort: "percent" | reverse %}

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
<h2>Unified Modeling Language</h2>

{% for skill in skills %}
  {% if skill.type == "other" and skill.sub-type == "uml" %}
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

## System architecture and design patterns:

<em>GRASP</em>: `Information Specialist`, `Creator`, `High cohesion`, `low coupling.`

<em>GoF</em>: `Singleton`, `Façade`, `Factory`, `Observer`, `Decorator.`

## Version control

`GIT `, `Subversion`, `Team Foundation System`

## Design

`Accessibility`, `Usability`, `User Experience`, `Information Architecture`
