// Main JavaScript for homepage

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Load colleges data
    loadColleges();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

async function loadColleges() {
    try {
        const response = await fetch('data/colleges.json');
        const data = await response.json();
        displayColleges(data.colleges);
    } catch (error) {
        console.error('Error loading colleges:', error);
        document.getElementById('colleges-grid').innerHTML = 
            '<p>Error loading colleges. Please try again later.</p>';
    }
}

function displayColleges(colleges) {
    const collegesGrid = document.getElementById('colleges-grid');
    collegesGrid.innerHTML = '';
    
    colleges.forEach(college => {
        const collegeCard = createCollegeCard(college);
        collegesGrid.appendChild(collegeCard);
    });
}

function createCollegeCard(college) {
    const card = document.createElement('div');
    card.className = 'college-card';
    card.onclick = () => window.location.href = `college.html?id=${college.id}`;
    
    card.innerHTML = `
        <img src="assets/images/${college.image}" alt="${college.name}" class="college-card-image">
        <div class="college-card-content">
            <h3>${college.name}</h3>
            <p>${college.shortDescription}</p>
        </div>
    `;
    
    return card;
}

// Add CSS for mobile menu
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: white;
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
            padding: 2rem 0;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-menu li {
            margin: 1rem 0;
        }
    }
`;
document.head.appendChild(style);