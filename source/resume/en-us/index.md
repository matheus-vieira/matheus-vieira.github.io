---
title: Print Resume
permalink: /resume/en-us/
---

<table width="100%">
  <tr>
    <td><img src="{{ site.author.thumb | prepend: site.baseurl }}" alt="author thumb"></td>
    <td>{{ site.author.name }}</td>
  </tr>
  <tr>
    <td colspan="2"># Skills</td>
    <td colspan="2" rowspan="10">
      {% assign skills = site.skills %}
      {% for skill in skills  %}
        {{ skill }}
      {% endfor %}
    </td>
  </tr>
</table>

<style type="text/css">
  .tg  {border-collapse:collapse;border-spacing:0;margin:0px auto; width:100%}
  .tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
  .tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
  .tg .tg-0lax{text-align:left;vertical-align:top}
  @media screen and (max-width: 767px) {.tg {width: auto !important;}.tg col {width: auto !important;}.tg-wrap {overflow-x: auto;-webkit-overflow-scrolling: touch;margin: auto 0px;}}
</style>
<div class="tg-wrap">
<table class="tg">
  <tr>
    <th><img src="{{ site.author.thumb | prepend: site.baseurl }}" alt="author thumb"></th>
    <th>
      {{ site.author.name }}
      <br />
      Curitiba - Paraná - Brazil
    </th>
  </tr>
  <tr>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-0lax"></td>
    <td class="tg-0lax">
        {% for skill in site.skills  %}
          {{ skill }}
        {% endfor %}
    </td>
  </tr>
</table></div>