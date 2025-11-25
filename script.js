let selectedCompanion = null;
let currentPage = 'title';
let currentBenefitTab = 'physical';
let currentBenefit = 'bone';

const exercises = [
    'Jump', 'Push-ups', 'Squats', 'Lunges', 'Burpees',
    'High Knees', 'Mountain Climbers', 'Plank', 'Crunches', 
    'Jump Rope', 'Wall Sit', 'Run in place', 'Dancing',
    'Arm Circles', 'Leg Raises', 'Star Jumps'
];

const benefitInfo = {
    // Physical benefits
    bone: {
        title: 'Bone Health',
        description: 'Regular exercise helps build and maintain strong bones! Weight-bearing exercises like jumping, running, and dancing increase bone density and reduce the risk of osteoporosis as you age.'
    },
    muscle: {
        title: 'Muscle Strength',
        description: 'Exercise builds and tones your muscles, making everyday activities easier. Stronger muscles also support your joints and help prevent injuries!'
    },
    weight: {
        title: 'Weight Management',
        description: 'Physical activity helps you maintain a healthy weight by burning calories and building muscle. Combined with good nutrition, exercise is key to a healthy body composition.'
    },
    heart: {
        title: 'Heart Health',
        description: 'Cardiovascular exercise strengthens your heart and improves circulation. A strong heart pumps blood more efficiently, reducing your risk of heart disease.'
    },
    energy: {
        title: 'Energy Levels',
        description: 'Regular exercise actually increases your energy levels! It improves your cardiovascular system and helps oxygen and nutrients reach your tissues more efficiently.'
    },
    // Mental benefits
    mood: {
        title: 'Mood Boost',
        description: 'Exercise releases endorphins, the "feel-good" hormones! These natural mood boosters help reduce feelings of depression and anxiety, leaving you feeling happier.'
    },
    stress: {
        title: 'Stress Relief',
        description: 'Physical activity reduces stress hormones like cortisol and adrenaline. Exercise also helps clear your mind and provides a healthy outlet for tension.'
    },
    sleep: {
        title: 'Better Sleep',
        description: 'Regular exercise helps you fall asleep faster and enjoy deeper sleep. Just avoid intense workouts close to bedtime!'
    },
    focus: {
        title: 'Improved Focus',
        description: 'Exercise increases blood flow to the brain, improving memory, concentration, and cognitive function. It can help you think more clearly and stay focused.'
    },
    confidence: {
        title: 'Self-Confidence',
        description: 'Achieving fitness goals, big or small, builds self-esteem and confidence. Exercise helps you feel strong, capable, and proud of what your body can do!'
    },
    // Social benefits
    teamwork: {
        title: 'Teamwork Skills',
        description: 'Group exercises and team sports teach cooperation and collaboration. You learn to work together toward common goals and support each other!'
    },
    communication: {
        title: 'Communication',
        description: 'Exercising with others improves your ability to communicate effectively. Whether giving encouragement or coordinating moves, you practice important social skills.'
    },
    friendship: {
        title: 'Building Friendships',
        description: 'Shared physical activities create bonds and friendships! Workout buddies provide support, accountability, and make exercise more fun.'
    },
    motivation: {
        title: 'Mutual Motivation',
        description: 'Exercising with others keeps you motivated and accountable. You inspire each other to show up, push harder, and celebrate successes together!'
    }
};

const benefitMascots = {
    bone: ["images/bunny-head.png", "images/kitty-head.png"],
    muscle: ["images/dog-head.png", "images/bear-head.png"],
    weight: ["images/panda-head.png", "images/fox-head.png"],
    heart: ["images/bird-head.png", "images/puppy-head.png"],
    energy: ["images/chick-head.png", "images/hamster-head.png"],

    mood: ["images/cat-head.png", "images/koala-head.png"],
    stress: ["images/monkey-head.png", "images/pig-head.png"],
    sleep: ["images/owl-head.png", "images/sheep-head.png"],
    focus: ["images/tiger-head.png", "images/rabbit-head.png"],
    confidence: ["images/lion-head.png", "images/wolf-head.png"],

    teamwork: ["images/otter-head.png", "images/deer-head.png"],
    communication: ["images/cow-head.png", "images/goat-head.png"],
    friendship: ["images/mouse-head.png", "images/duck-head.png"],
    motivation: ["images/chipmunk-head.png", "images/swan-head.png"]
};


function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    const navItems = document.querySelectorAll('.nav-item');
    
    sections.forEach(section => section.classList.remove('active'));
    navItems.forEach(item => item.classList.remove('active'));
    
    document.getElementById(sectionId).classList.add('active');
    element.closest('.nav-item').classList.add('active');

    // Reset to title page when going back to home
    if (sectionId === 'home') {
        showHomePage('title');
    }
}

function showHomePage(page) {
    document.getElementById('titlePage').style.display = 'none';
    document.getElementById('companionPage').style.display = 'none';
    document.getElementById('exercisePage').style.display = 'none';

    if (page === 'title') {
        document.getElementById('titlePage').style.display = 'block';
        setTimeout(() => {
            showHomePage('companion');
        }, 2000);
    } else if (page === 'companion') {
        document.getElementById('companionPage').style.display = 'block';
    } else if (page === 'exercise') {
        document.getElementById('exercisePage').style.display = 'block';
    }

    currentPage = page;
}

function selectCompanion(index, type) {
    const companions = document.querySelectorAll('.companion');
    companions.forEach(c => c.classList.remove('selected'));
    companions[index].classList.add('selected');
    
    selectedCompanion = { index, type };

    setTimeout(() => {
        const img = companions[index].querySelector('img').cloneNode(true);
        img.style.width = '180px';
        img.style.height = '200px';

        const container = document.getElementById('selectedCompanionDisplay');
        container.innerHTML = '';
        container.appendChild(img);

        showHomePage('exercise');
        generateExercise();
    }, 500);
}

function generateExercise() {
    if (!selectedCompanion) return;

    const randomExercise = exercises[Math.floor(Math.random() * exercises.length)];
    const randomCount = Math.floor(Math.random() * 20) + 5;
    
    document.getElementById('exerciseText').textContent = `${randomExercise} ${randomCount} times with me!`;
}

function switchBenefitTab(tab, element) {
    currentBenefitTab = tab;

    // Update tab buttons
    const tabs = document.querySelectorAll('.benefit-tab');
    tabs.forEach(t => t.classList.remove('active'));

    // Safely activate the clicked element
    if (element instanceof HTMLElement) {
        element.classList.add('active');
    }

    // Update benefit sections
    const sections = document.querySelectorAll('.specific-benefits');
    sections.forEach(s => s.classList.remove('active'));

    const activeSection = document.getElementById(`${tab}-benefits`);
    if (activeSection) {
        activeSection.classList.add('active');
    }

    // Get the first benefit button
    const firstBtn = activeSection?.querySelector('.specific-benefit-btn');

    if (firstBtn) {
        // Use dataset OR a safer text extraction
        const firstBenefit =
            firstBtn.dataset.benefit ||
            firstBtn.textContent.trim().toLowerCase();

        showBenefitInfo(firstBenefit);
    }
}


function showBenefitInfo(benefit) {
    currentBenefit = benefit;

    // Update active button in current tab
    const currentSection = document.getElementById(`${currentBenefitTab}-benefits`);
    const buttons = currentSection.querySelectorAll('.specific-benefit-btn');
    buttons.forEach(btn => {
        if (btn.textContent.toLowerCase() === benefit) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update info display
    const info = benefitInfo[benefit];
    document.getElementById('benefitTitle').textContent = info.title;
    document.getElementById('benefitDescription').textContent = info.description;

    // ⭐ UPDATE TALKING MASCOTS ⭐
    const mascots = benefitMascots[benefit];
    const talkingRow = document.querySelector(".mascots-row");

    talkingRow.innerHTML = `
        <img src="${mascots[0]}" style="width:20%">
        <img src="${mascots[1]}" style="width:20%">
    `;
}

// Show title page on load
window.addEventListener('load', () => {
    showHomePage('title');
});