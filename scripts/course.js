// ================= Course Filter & Credits =================

const filterButtons = document.querySelectorAll('.course-filters button');
const courses = document.querySelectorAll('.course');
const creditsParagraph = document.querySelector('.credits');

// Atualiza o total de créditos com reduce
function updateCredits() {
    const visibleCourses = Array.from(courses).filter(course =>
        course.style.display !== 'none'
    );

    const totalCredits = visibleCourses.reduce((total, course) => {
        return total + Number(course.dataset.credits);
    }, 0);

    creditsParagraph.textContent =
        `The total credits for courses listed above is ${totalCredits}`;
}

// Filtro de cursos
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

        updateCredits();
    });
});

// Inicializa créditos ao carregar a página
updateCredits();