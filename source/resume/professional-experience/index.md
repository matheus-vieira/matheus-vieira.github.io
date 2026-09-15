---
layout: page
title: Professional experience
permalink: /resume/professional-experience/
excerpt: "All my professional experiences"
description: ""
---

{% assign current_experiences = site.experiences | where_exp: "item", "item.resignationdate == nil" | sort: 'admissiondate' %}
{% assign past_experiences = site.experiences | where_exp: "item", "item.resignationdate != nil" | sort: 'resignationdate' | reverse %}
{% assign sorted_experiences = current_experiences | concat: past_experiences %}

{% for experience in sorted_experiences %}
  {{ experience.output }}
{% endfor %}
