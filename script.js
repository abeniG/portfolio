// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');

        // Initialize animations after page loads
        initAnimations();
        initParallaxEffects();
        initScrollAnimations();
    }, 1500);
});

// Initialize GSAP animations
function initAnimations() {
    // Animate hero elements with staggered delay
    gsap.from('.hero-badge', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 0.5
    });

    gsap.from('.hero-title', {
        duration: 1.2,
        y: 50,
        opacity: 0,
        delay: 0.7
    });

    gsap.from('.hero-subtitle', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 0.9
    });

    gsap.from('.hero-description', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 1.1
    });

    gsap.from('.hero-buttons', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 1.3
    });

    gsap.from('.hero-experience', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 1.5
    });

    // Animate the phone with 3D effect
    gsap.from('.phone-frame', {
        duration: 1.5,
        scale: 0.8,
        rotationY: 180,
        opacity: 0,
        delay: 1,
        ease: "back.out(1.7)"
    });

    // Animate floating elements with staggered delay
    gsap.from('.floating-element', {
        duration: 1,
        scale: 0,
        opacity: 0,
        stagger: 0.2,
        delay: 1.8,
        ease: "back.out(1.7)"
    });

    // Animate phone content
    gsap.from('.user-profile', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        delay: 2,
        ease: "power2.out"
    });

    gsap.from('.app-stats', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        delay: 2.2,
        ease: "power2.out"
    });

    gsap.from('.recent-activity', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        delay: 2.4,
        ease: "power2.out"
    });

    gsap.from('.quick-actions', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        delay: 2.6,
        ease: "power2.out"
    });
}

// Initialize parallax effects
function initParallaxEffects() {
    // Parallax on scroll for background layers
    const parallaxLayers = document.querySelectorAll('.parallax-layer');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        parallaxLayers.forEach(layer => {
            const depth = layer.getAttribute('data-depth');
            const movement = -(scrolled * depth);

            gsap.to(layer, {
                y: movement,
                duration: 0.5,
                ease: "none"
            });
        });
    });

    // Parallax for section elements
    gsap.utils.toArray('.section').forEach((section, i) => {
        const sectionBg = section.querySelector('.section-bg');
        if (!sectionBg) return;

        gsap.to(sectionBg, {
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            },
            y: (i % 2 === 0) ? 100 : -100,
            ease: "none"
        });
    });

    // Parallax for floating elements in hero
    window.addEventListener('mousemove', (e) => {
        const floatingElements = document.querySelectorAll('.floating-element');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        floatingElements.forEach((el, i) => {
            const speed = 0.05 * (i + 1);
            const x = (mouseX * 50 - 25) * speed;
            const y = (mouseY * 50 - 25) * speed;

            gsap.to(el, {
                x: x,
                y: y,
                duration: 1,
                ease: "power2.out"
            });
        });
    });
}

// Initialize scroll animations
function initScrollAnimations() {
    // Animate sections on scroll
    gsap.utils.toArray('.section').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 1
        });
    });

    // Animate project cards on scroll
    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            y: 100,
            opacity: 0,
            duration: 1,
            delay: i * 0.1,
            ease: "power2.out"
        });
    });

    // Animate TV display on scroll
    const tvFrame = document.querySelector('.tv-frame');
    if (tvFrame) {
        gsap.from(tvFrame, {
            scrollTrigger: {
                trigger: tvFrame,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            scale: 0.8,
            opacity: 0,
            duration: 1.5,
            ease: "back.out(1.7)"
        });
    }

    // Animate skill meters on scroll
    gsap.utils.toArray('.meter-fill').forEach(fill => {
        const width = fill.getAttribute('data-width');

        gsap.to(fill, {
            scrollTrigger: {
                trigger: fill.closest('.skill-channel'),
                start: "top 90%",
                toggleActions: "play none none reverse"
            },
            width: `${width}%`,
            duration: 2,
            ease: "power2.out"
        });
    });

    // Animate skill categories on scroll
    gsap.utils.toArray('.category-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            delay: i * 0.2,
            ease: "power2.out"
        });
    });

    // Parallax effect for hero background on scroll
    gsap.to('.parallax-background', {
        scrollTrigger: {
            trigger: '.hero',
            start: "top top",
            end: "bottom top",
            scrub: true
        },
        y: 300,
        ease: "none"
    });
}

// Three.js Scene for Hero Section
function initThreeScene() {
    const container = document.getElementById('three-container');
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
    });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Add subtle fog for depth
    scene.fog = new THREE.Fog(0x0a0f1c, 10, 30);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x0253B3, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create floating mobile UI elements
    const elements = [];

    // Create app icons (cubes with rounded corners simulation)
    const createRoundedCube = (width, height, depth, radius) => {
        const shape = new THREE.Shape();
        const eps = 0.00001;
        const radius2 = radius - eps;

        shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true);
        shape.absarc(eps, height - radius2 * 2, eps, Math.PI, Math.PI / 2, true);
        shape.absarc(width - radius2 * 2, height - radius2 * 2, eps, Math.PI / 2, 0, true);
        shape.absarc(width - radius2 * 2, eps, eps, 0, -Math.PI / 2, true);

        const geometry = new THREE.ExtrudeGeometry(shape, {
            depth: depth - radius * 2,
            bevelEnabled: true,
            bevelSegments: 4,
            steps: 1,
            bevelSize: radius,
            bevelThickness: radius
        });

        geometry.center();
        return geometry;
    };

    const iconGeometry = createRoundedCube(1, 1, 0.2, 0.1);
    const iconMaterial = new THREE.MeshPhongMaterial({
        color: 0x0253B3,
        shininess: 100,
        specular: 0x444444,
        transparent: true,
        opacity: 0.8
    });

    for (let i = 0; i < 15; i++) {
        const icon = new THREE.Mesh(iconGeometry, iconMaterial);

        // Position icons in a spherical arrangement
        const radius = 4 + Math.random() * 3;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);

        icon.position.x = radius * Math.sin(phi) * Math.cos(theta);
        icon.position.y = radius * Math.sin(phi) * Math.sin(theta);
        icon.position.z = radius * Math.cos(phi);

        // Random rotation
        icon.rotation.x = Math.random() * Math.PI;
        icon.rotation.y = Math.random() * Math.PI;

        // Add animation properties
        icon.userData = {
            speed: 0.005 + Math.random() * 0.01,
            rotationAxis: new THREE.Vector3(
                Math.random() - 0.5,
                Math.random() - 0.5,
                Math.random() - 0.5
            ).normalize(),
            floatSpeed: 0.001 + Math.random() * 0.002,
            floatOffset: Math.random() * Math.PI * 2,
            originalPosition: icon.position.clone()
        };

        scene.add(icon);
        elements.push(icon);
    }

    // Create Flutter logo in center
    const flutterGeometry = new THREE.TorusGeometry(1.5, 0.3, 16, 100);
    const flutterMaterial = new THREE.MeshPhongMaterial({
        color: 0x2DD4BF,
        shininess: 100,
        specular: 0x444444
    });

    const flutterRing = new THREE.Mesh(flutterGeometry, flutterMaterial);
    flutterRing.rotation.x = Math.PI / 2;
    scene.add(flutterRing);
    elements.push(flutterRing);

    // Create particles
    const particleCount = 80;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const radius = 6 + Math.random() * 4;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);

        particlePositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        particlePositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        particlePositions[i3 + 2] = radius * Math.cos(phi);

        particleSizes[i] = Math.random() * 0.1 + 0.05;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));

    const particleMaterial = new THREE.PointsMaterial({
        color: 0x8B5CF6,
        size: 0.1,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.6
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    elements.push(particles);

    // Camera position
    camera.position.z = 10;

    // Animation loop
    let time = 0;

    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;

        // Animate elements
        elements.forEach(element => {
            if (element.userData.speed && element.userData.rotationAxis) {
                element.rotateOnAxis(element.userData.rotationAxis, element.userData.speed);
            }

            // Float animation
            if (element.userData.floatSpeed && element.userData.originalPosition) {
                const floatAmount = Math.sin(time + element.userData.floatOffset) * 0.5;
                element.position.y = element.userData.originalPosition.y + floatAmount;
            }
        });

        // Rotate Flutter ring
        flutterRing.rotation.z += 0.005;

        // Rotate camera slowly
        camera.position.x = Math.sin(time * 0.1) * 2;
        camera.position.y = Math.cos(time * 0.05) * 1;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    // Handle window resize
    function onWindowResize() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    }

    window.addEventListener('resize', onWindowResize);

    // Start animation
    animate();
}

// TV Channel Switcher
function initTVChannels() {
    const channelButtons = document.querySelectorAll('.channel-btn');
    const channels = document.querySelectorAll('.skill-channel');

    channelButtons.forEach(button => {
        button.addEventListener('click', () => {
            const channelId = button.getAttribute('data-channel');

            // Remove active class from all buttons and channels
            channelButtons.forEach(btn => btn.classList.remove('active'));
            channels.forEach(channel => channel.classList.remove('active'));

            // Add active class to clicked button and corresponding channel
            button.classList.add('active');
            document.getElementById(`channel-${channelId}`).classList.add('active');

            // Add TV static effect when changing channels
            const tvStatic = document.querySelector('.tv-static-overlay');
            if (tvStatic) {
                gsap.to(tvStatic, {
                    opacity: 0.3,
                    duration: 0.1,
                    onComplete: () => {
                        gsap.to(tvStatic, {
                            opacity: 0.1,
                            duration: 0.3
                        });
                    }
                });
            }

            // Add sound effect (simulated with vibration if supported)
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
        });
    });

    // Auto-cycle channels every 8 seconds
    let currentChannel = 1;
    setInterval(() => {
        currentChannel = currentChannel % 3 + 1;
        const button = document.querySelector(`.channel-btn[data-channel="${currentChannel}"]`);
        if (button) button.click();
    }, 8000);
}

// Project Filter
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter projects
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');

                if (filter === 'all' || categories.includes(filter)) {
                    gsap.to(card, {
                        duration: 0.5,
                        opacity: 1,
                        scale: 1,
                        display: 'flex',
                        ease: "power2.out"
                    });
                } else {
                    gsap.to(card, {
                        duration: 0.5,
                        opacity: 0,
                        scale: 0.8,
                        display: 'none',
                        ease: "power2.out"
                    });
                }
            });
        });
    });
}

// Smooth Navigation Scrolling with Active State Update
function initSmoothNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // Function to update active nav link
    function updateActiveNavLink() {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);

    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Update active nav link immediately
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');

                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (window.innerWidth <= 992) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    });
}

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');

        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (hamburger && navMenu &&
        !hamburger.contains(e.target) &&
        !navMenu.contains(e.target) &&
        window.innerWidth <= 992) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.9)';
            navbar.style.boxShadow = 'none';
        }
    }
});

// Theme toggle
const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const icon = themeToggle.querySelector('i');
        if (icon.classList.contains('fa-moon')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            // Light theme implementation would go here
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            // Dark theme implementation would go here
        }
    });
}

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const projectType = contactForm.querySelector('select').value;
        const message = contactForm.querySelector('textarea').value;

        // Simple validation
        if (name && email && projectType && message) {
            // Show success message with animation
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #2DD4BF, #0253B3)';
            submitBtn.disabled = true;

            // Simulate sending
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;

                // Show notification
                showNotification('Message sent successfully!', 'success');

                // Reset form
                contactForm.reset();
            }, 2000);
        } else {
            showNotification('Please fill in all fields.', 'error');
        }
    });
}

// Notification function
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(notification);

    // Animate in
    gsap.from(notification, {
        y: -50,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
    });

    // Remove after 3 seconds
    setTimeout(() => {
        gsap.to(notification, {
            y: -50,
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                notification.remove();
            }
        });
    }, 3000);
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Three.js scene
    initThreeScene();

    // Initialize TV channels
    initTVChannels();

    // Initialize project filter
    initProjectFilter();

    // Initialize smooth navigation
    initSmoothNavigation();

    // Add hover effect to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                duration: 0.3,
                scale: 1.02,
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
                ease: "power2.out"
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.3,
                scale: 1,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                ease: "power2.out"
            });
        });
    });

    // Add hover effect to category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card.querySelector('.category-icon'), {
                duration: 0.3,
                rotationY: 360,
                ease: "power2.out"
            });
        });
    });

    // Add hover effect to TV skills
    document.querySelectorAll('.tv-skill').forEach(skill => {
        skill.addEventListener('mouseenter', () => {
            gsap.to(skill, {
                duration: 0.3,
                backgroundColor: 'rgba(2, 83, 179, 0.1)',
                ease: "power2.out"
            });
        });

        skill.addEventListener('mouseleave', () => {
            gsap.to(skill, {
                duration: 0.3,
                backgroundColor: 'rgba(30, 41, 59, 0.5)',
                ease: "power2.out"
            });
        });
    });

    // Add interactive mouse trail for floating elements
    document.addEventListener('mousemove', (e) => {
        const trail = document.createElement('div');
        trail.className = 'mouse-trail';
        trail.style.left = e.pageX + 'px';
        trail.style.top = e.pageY + 'px';
        document.body.appendChild(trail);

        gsap.to(trail, {
            duration: 0.6,
            opacity: 0,
            scale: 0,
            onComplete: () => {
                trail.remove();
            }
        });
    });

    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--darker-color);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 10000;
            border-left: 4px solid var(--primary-color);
            box-shadow: var(--shadow);
            max-width: 350px;
        }
        
        .notification.success {
            border-left-color: var(--secondary-color);
        }
        
        .notification.error {
            border-left-color: #ff4757;
        }
        
        .notification i {
            font-size: 1.2rem;
        }
        
        .notification.success i {
            color: var(--secondary-color);
        }
        
        .notification.error i {
            color: #ff4757;
        }
        
        @media (max-width: 768px) {
            .notification {
                top: 80px;
                right: 10px;
                left: 10px;
                max-width: none;
            }
        }
    `;
    document.head.appendChild(style);
});

// Handle window resize for mobile menu
window.addEventListener('resize', () => {
    if (window.innerWidth > 992) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Add CSS for mouse trail
const trailStyle = document.createElement('style');
trailStyle.textContent = `
    .mouse-trail {
        position: fixed;
        width: 8px;
        height: 8px;
        background: var(--secondary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
    }
`;
document.head.appendChild(trailStyle);