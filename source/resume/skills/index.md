---
layout: page
permalink: /resume/skills/
title: Skills
---

## Some professional skills that I learned through years

{% assign skills = site.skills | sort: "skill" | sort: "percent" | reverse %}

{% assign spoken_languages = skills | where: "type", "idiom" %}
{% include skills-section.html title="Spoken languages" skills=spoken_languages %}

{% assign programming_languages = skills | where: "type", "language" | where: "sub-type", "programming" %}
{% include skills-section.html title="Programming languages" skills=programming_languages %}

{% assign markup_languages = skills | where: "type", "language" | where: "sub-type", "markup" %}
{% include skills-section.html title="Markup languages" skills=markup_languages %}

{% assign cloud_providers = skills | where: "type", "cloud" %}
{% include skills-section.html title="Cloud Providers" skills=cloud_providers %}

{% assign libraries_frameworks = skills | where: "type", "framework" | where: "sub-type", "library" %}
{% include skills-section.html title="Libraries and frameworks" skills=libraries_frameworks %}

{% assign architectures = skills | where: "type", "other" | where: "sub-type", "architecture" %}
{% include skills-section.html title="System architecture and design patterns" skills=architectures %}

{% assign version_control = skills | where: "type", "other" | where: "sub-type", "version control" %}
{% include skills-section.html title="Version control" skills=version_control %}

{% assign design_skills = skills | where: "type", "other" | where: "sub-type", "design" %}
{% include skills-section.html title="Design" skills=design_skills %}