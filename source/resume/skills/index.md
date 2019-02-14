---
layout: page
permalink: /resume/skills/
---

## Skills

{% assign skills = site.skills | sort: "skill" | sort: "percent" | reverse %}

### Programming languages

{% for skill in skills %}
  {% if skill.type == "language" and skill.sub-type == "programming" %}
  {{ skill }}
  {% endif %}
{% endfor %}

### Markup languages

{% for skill in skills %}
  {% if skill.type == "language" and skill.sub-type == "markup" %}
  {{ skill }}
  {% endif %}
{% endfor %}

### Libraries and frameworks

{% for skill in skills %}
  {% if skill.type == "framework" and skill.sub-type == "library" %}
  {{ skill }}
  {% endif %}
{% endfor %}
`Bootstrap`, `KnockoutJS`, `JQuery`, `Angular JS`, `.NET`, `Entity Framework`, `Silverlight`

### Unified Modeling Language (UML)

`Class Diagram`, `Sequence Diagram`

### System architecture and design patterns:

<em>GRASP</em>: `Information Specialist`, `Creator`, `High cohesion`, `low coupling.`

<em>GoF</em>: `Singleton`, `Façade`, `Factory`, `Observer`, `Decorator.`

### Version control

`GIT `, `Subversion`, `Team Foundation System`

### Design

`Accessibility`, `Usability`, `User Experience`, `Information Architecture`
