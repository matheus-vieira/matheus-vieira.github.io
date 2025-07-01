/**
 * @jest-environment jsdom
 */

describe('Interview Question Filter', () => {
  let container;

  beforeEach(() => {
    // Setup DOM
    document.body.innerHTML = `
      <div id="tagFilter">
        <input type="checkbox" value="javascript" id="js-filter">
        <input type="checkbox" value="css" id="css-filter">
        <input type="checkbox" value="html" id="html-filter">
      </div>
      <ol id="questionsList">
        <li data-tags="javascript, css">
          <a href="/question1">Question 1 <small>[javascript, css]</small></a>
        </li>
        <li data-tags="html">
          <a href="/question2">Question 2 <small>[html]</small></a>
        </li>
        <li data-tags="javascript">
          <a href="/question3">Question 3 <small>[javascript]</small></a>
        </li>
      </ol>
    `;

    // Simulate the filter function
    const tagFilter = document.getElementById('tagFilter');
    const questionsList = document.getElementById('questionsList');
    
    tagFilter.addEventListener('change', function () {
      const checked = Array.from(tagFilter.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
      Array.from(questionsList.getElementsByTagName('li')).forEach(function (li) {
        const tags = li.getAttribute('data-tags') ? li.getAttribute('data-tags').split(', ') : [];
        li.style.display = (checked.length === 0 || checked.some(tag => tags.includes(tag))) ? '' : 'none';
      });
    });
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should show all questions when no filters are selected', () => {
    const questions = document.querySelectorAll('#questionsList li');
    questions.forEach(question => {
      expect(question.style.display).not.toBe('none');
    });
  });

  test('should filter questions by JavaScript tag', () => {
    const jsFilter = document.getElementById('js-filter');
    const questions = document.querySelectorAll('#questionsList li');
    
    jsFilter.checked = true;
    jsFilter.dispatchEvent(new Event('change', { bubbles: true }));

    expect(questions[0].style.display).not.toBe('none'); // has javascript tag
    expect(questions[1].style.display).toBe('none');     // no javascript tag
    expect(questions[2].style.display).not.toBe('none'); // has javascript tag
  });

  test('should filter questions by CSS tag', () => {
    const cssFilter = document.getElementById('css-filter');
    const questions = document.querySelectorAll('#questionsList li');
    
    cssFilter.checked = true;
    cssFilter.dispatchEvent(new Event('change', { bubbles: true }));

    expect(questions[0].style.display).not.toBe('none'); // has css tag
    expect(questions[1].style.display).toBe('none');     // no css tag
    expect(questions[2].style.display).toBe('none');     // no css tag
  });

  test('should show questions matching any selected filter', () => {
    const jsFilter = document.getElementById('js-filter');
    const htmlFilter = document.getElementById('html-filter');
    const questions = document.querySelectorAll('#questionsList li');
    
    jsFilter.checked = true;
    htmlFilter.checked = true;
    jsFilter.dispatchEvent(new Event('change', { bubbles: true }));

    expect(questions[0].style.display).not.toBe('none'); // has javascript
    expect(questions[1].style.display).not.toBe('none'); // has html
    expect(questions[2].style.display).not.toBe('none'); // has javascript
  });

  test('should handle questions without data-tags attribute', () => {
    // Add a question without tags
    const questionsList = document.getElementById('questionsList');
    const newLi = document.createElement('li');
    newLi.innerHTML = '<a href="/question4">Question 4</a>';
    questionsList.appendChild(newLi);

    const jsFilter = document.getElementById('js-filter');
    jsFilter.checked = true;
    jsFilter.dispatchEvent(new Event('change', { bubbles: true }));

    const questions = document.querySelectorAll('#questionsList li');
    expect(questions[3].style.display).toBe('none'); // no tags should be hidden
  });

  test('should reset to show all when filters are unchecked', () => {
    const jsFilter = document.getElementById('js-filter');
    const questions = document.querySelectorAll('#questionsList li');
    
    // First filter
    jsFilter.checked = true;
    jsFilter.dispatchEvent(new Event('change', { bubbles: true }));
    
    // Then unfilter
    jsFilter.checked = false;
    jsFilter.dispatchEvent(new Event('change', { bubbles: true }));

    questions.forEach(question => {
      expect(question.style.display).not.toBe('none');
    });
  });
});
