document.addEventListener("DOMContentLoaded", () => {
    const bloggerList = document.querySelector('.sidebar__blogger-list');

   

    bloggers.forEach(blogger => {
        const bloggerItem = document.createElement('li');
        bloggerItem.classList.add('sidebar__blogger-item');
        bloggerItem.innerHTML = `
            <img src="${blogger.avatar}" alt="${blogger.firstName} ${blogger.lastName}" class="sidebar__avatar">
            <span><strong>${blogger.firstName} ${blogger.lastName}</strong></span>
        `;
        bloggerList.appendChild(bloggerItem);
    });
});




