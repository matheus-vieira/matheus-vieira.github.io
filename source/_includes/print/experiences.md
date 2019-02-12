{% assign lang = page.lang | default: "en-us" %}

<h2>{{ site.messages[lang].print-resume.title.experiences }}</h2>

{% assign list = site.experiences | reverse %}
{% for i in (0..site.max_experiences) %}
<div class="page">
  <em>{{ list[i][lang].jobtitle }}</em> &mdash; <strong>{{ list[i].company }}</strong> &mdash;
  <time datetime="{{ list[i].admissiondate }}">{{ list[i].admissiondate | date: "%Y" }}</time> &dash;
  {% if list[i].resignationdate %}
    <time datetime="{{ list[i].resignationdate }}">{{ list[i].resignationdate | date: "%Y" }}</time>
  {% else %}
    {{ site.messages[lang].print-resume.title.current }}
  {% endif %}
  <br />{{ list[i][lang].description }}
  <br />{{ list[i].languages | join: ', ' }}
  <br />{{ list[i].frameworks | join: ', ' }}
  <p>{{ list[i].additionInfo | join: ', ' }}</p>
</div>
{% endfor %}
