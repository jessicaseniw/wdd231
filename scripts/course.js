// ================= Course Filter =================

// Select elements
const filterButtons = document.querySelectorAll('.course-filters button');
const courses = document.querySelectorAll('.course');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;

        courses.forEach(course => {
            const category = course.dataset.category;

            if (filter === 'ALL' || category === filter) {
                course.style.display = 'block';
            } else {
                course.style.display = 'none';
            }
        });
    });
});