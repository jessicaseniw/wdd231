// ================= Course Data (REQUIRED ARRAY OF OBJECTS) =================
const courses = [
    { name: "CSE 110", category: "CSE", credits: 3, completed: true },
    { name: "CSE 111", category: "CSE", credits: 3, completed: true },
    { name: "WDD 130", category: "WDD", credits: 3, completed: false },
    { name: "WDD 131", category: "WDD", credits: 3, completed: false }
];

// ================= Elements =================
const filterButtons = document.querySelectorAll('.course-filters button');
const courseList = document.querySelector('.course-list');
const creditsParagraph = document.querySelector('.credits');

// ================= Render Courses =================
function renderCourses(courseArray) {
    courseList.innerHTML = "";

    courseArray.forEach(course => {
        const courseElement = document.createElement("div");

        courseElement.classList.add("course");

        if (course.completed) {
            courseElement.classList.add("completed");
        }

        courseElement.dataset.category = course.category;
        courseElement.dataset.credits = course.credits;

        courseElement.textContent = course.name;

        courseList.appendChild(courseElement);
    });

    updateCredits(courseArray);
}

// ================= Calculate Credits (reduce required) =================
function updateCredits(courseArray) {
    const totalCredits = courseArray.reduce((sum, course) => {
        return sum + course.credits;
    }, 0);

    creditsParagraph.textContent =
        `The total credits for courses listed above is ${totalCredits}`;
}

// ================= Filter Courses =================
function filterCourses(filter) {
    if (filter === "ALL") {
        renderCourses(courses);
        return;
    }

    const filteredCourses = courses.filter(course => course.category === filter);
    renderCourses(filteredCourses);
}

// ================= Event Listeners =================
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterCourses(button.dataset.filter);
    });
});

// ================= Initialize Page =================
renderCourses(courses);