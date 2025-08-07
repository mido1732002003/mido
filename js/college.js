// College details page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Get college ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const collegeId = urlParams.get('id');
    
    if (collegeId) {
        loadCollegeDetails(collegeId);
    } else {
        // If no ID is provided, load the first college as a fallback
        loadFirstCollege();
    }
    
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
});

async function loadFirstCollege() {
    try {
        const response = await fetch('data/colleges.json');
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status}`);
        }
        const data = await response.json();
        
        if (data.colleges && data.colleges.length > 0) {
            displayCollegeDetails(data.colleges[0]);
        } else {
            displayError('No colleges found in data');
        }
    } catch (error) {
        console.error('Error loading colleges:', error);
        displayError(`Error loading colleges: ${error.message}. Make sure you're accessing the site through a web server.`);
    }
}

async function loadCollegeDetails(collegeId) {
    try {
        const response = await fetch('data/colleges.json');
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status}`);
        }
        const data = await response.json();
        
        const college = data.colleges.find(c => c.id === collegeId);
        
        if (college) {
            displayCollegeDetails(college);
        } else {
            displayError(`College with ID "${collegeId}" not found. Check if the ID matches those in the JSON file.`);
        }
    } catch (error) {
        console.error('Error loading college details:', error);
        displayError(`Error loading college details: ${error.message}. Make sure you're accessing the site through a web server.`);
    }
}

function displayCollegeDetails(college) {
    // Update page title
    document.title = `${college.name} - Al-Aboud University`;
    
    // Update college name
    document.getElementById('college-name').textContent = college.name;
    
    // Update college image
    const collegeImage = document.getElementById('college-image');
    collegeImage.src = `assets/images/${college.image}`;
    collegeImage.alt = college.name;
    
    // Update college description
    document.getElementById('college-description').textContent = college.description;
    
    // Update departments list
    const departmentsList = document.getElementById('departments-list');
    departmentsList.innerHTML = '';
    
    college.departments.forEach(department => {
        const li = document.createElement('li');
        li.textContent = department;
        departmentsList.appendChild(li);
    });
}

function displayError(message) {
    document.getElementById('college-name').textContent = 'Error';
    document.getElementById('college-description').textContent = message;
    document.getElementById('college-image').style.display = 'none';
    document.getElementById('departments-list').innerHTML = '';
    
    // Add a button to go back to homepage
    const departmentsSection = document.querySelector('.college-info');
    const backButton = document.createElement('a');
    backButton.href = 'index.html';
    backButton.className = 'btn btn-primary';
    backButton.textContent = 'Go to Homepage';
    departmentsSection.appendChild(backButton);
}

// Add CSS for mobile menu (same as main.js)
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