---
layout: page
title: Educação Acadêmica
permalink: /curriculo/educacao-academica/
lang: pt-br
link_en_us: /resume/academic-education/
---

{% if site.graduations %}
  {% assign graduations = site.graduations | sort: "order" %}
  {% for graduation in graduations reversed %}
    {{ graduation.output }}
  {% endfor %}
{% else %}
  Informações de graduação não disponíveis.
{% endif %}
