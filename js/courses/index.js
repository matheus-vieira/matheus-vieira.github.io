((d) => {
    const ulPages = d.getElementById("ulPages");
    const baseUrl = "https://matheus-vieira.github.io";
    const githubRepos = "https://api.github.com/users/matheus-vieira/repos";

    fetch(githubRepos)
        .then(response => response.json())
        .then(repositories => repositories.forEach(buildLi));

    function filter(repository) {
        let ret = repository.has_pages;
        ret &= Boolean(repository.homepage);
        ret &= repository.homepage && repository.homepage.includes(baseUrl);
        ret &= repository.homepage != baseUrl;
        return Boolean(ret);
    }

    function buildLi(repository) {
        if (!filter(repository)) return;

        let li = createElement("h3");
        let a = createElement("a", { "href": repository.homepage });
        let text = `${repository.name} - ${repository.description}`;

        a.appendChild(d.createTextNode(text));
        li.appendChild(a);
        ulPages.appendChild(li);
    }

    function createElement(tag = "LI", attributes) {
        let element = d.createElement(tag);

        for (const key in attributes)
            if (attributes.hasOwnProperty(key))
                element.setAttribute(key, attributes[key]);

        return element;
    }
})(document);