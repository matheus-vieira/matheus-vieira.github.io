---
layout: page
title: Academic Education
permalink: /resume/academic-education/
---

{% if site.graduations %}
  {% assign graduations = site.graduations | sort: "order" %}
  {% for graduation in graduations reversed %}
    {{ graduation.output }}
  {% endfor %}
{% else %}
  No graduations information available.
{% endif %}