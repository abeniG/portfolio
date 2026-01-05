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

// Three.js Scene for Hero Section - Mobile App Interface
function initThreeScene() {
    const container = document.getElementById('three-container');
    if (!container) return;

    // Show loading state
    const loadingElement = document.querySelector('.three-loading');
    if (loadingElement) loadingElement.classList.add('active');

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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x0253B3, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x2DD4BF, 0.8, 100);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);

    // Create a mobile phone model
    const phoneGroup = new THREE.Group();

    // Phone body
    const phoneGeometry = new THREE.BoxGeometry(4, 8, 0.4);
    const phoneMaterial = new THREE.MeshPhongMaterial({
        color: 0x1E293B,
        shininess: 100,
        specular: 0x444444
    });
    const phoneBody = new THREE.Mesh(phoneGeometry, phoneMaterial);
    phoneGroup.add(phoneBody);

    // Phone screen
    const screenGeometry = new THREE.PlaneGeometry(3.8, 7.6);
    const screenMaterial = new THREE.MeshPhongMaterial({
        color: 0x0F172A,
        shininess: 50,
        specular: 0x222222,
        side: THREE.DoubleSide
    });
    const phoneScreen = new THREE.Mesh(screenGeometry, screenMaterial);
    phoneScreen.position.z = 0.21;
    phoneGroup.add(phoneScreen);

    // Create mobile app icons
    const appIcons = [];
    const iconPositions = [
        { x: -1.2, y: 2.5, size: 0.8, color: 0x0253B3, label: 'Home' },
        { x: 0, y: 2.5, size: 0.8, color: 0x8B5CF6, label: 'About' },
        { x: 1.2, y: 2.5, size: 0.8, color: 0x2DD4BF, label: 'Projects' },
        { x: -1.2, y: 1.2, size: 0.8, color: 0xFF6B6B, label: 'Skills' },
        { x: 0, y: 1.2, size: 0.8, color: 0x4ECDC4, label: 'Contact' },
        { x: 1.2, y: 1.2, size: 0.8, color: 0x95E6A1, label: 'Flutter' }
    ];

    iconPositions.forEach(pos => {
        // Icon background
        const iconGeometry = new THREE.BoxGeometry(pos.size, pos.size, 0.1);
        const iconMaterial = new THREE.MeshPhongMaterial({
            color: pos.color,
            shininess: 80,
            specular: 0x333333
        });
        const icon = new THREE.Mesh(iconGeometry, iconMaterial);
        icon.position.set(pos.x, pos.y, 0.22);

        // Add animations
        icon.userData = {
            floatSpeed: 0.5 + Math.random(),
            floatOffset: Math.random() * Math.PI * 2,
            originalY: pos.y,
            label: pos.label,
            color: pos.color
        };

        phoneGroup.add(icon);
        appIcons.push(icon);
    });

    // Create website preview on mobile screen (portfolio interface)
    const websiteGroup = new THREE.Group();

    // Website header
    const headerGeometry = new THREE.PlaneGeometry(3.6, 0.8);
    const headerMaterial = new THREE.MeshPhongMaterial({
        color: 0x0253B3,
        shininess: 40
    });
    const websiteHeader = new THREE.Mesh(headerGeometry, headerMaterial);
    websiteHeader.position.set(0, 2.5, 0.01);
    websiteGroup.add(websiteHeader);

    // Portfolio sections
    const sections = [
        { y: 1.2, height: 1.2, color: 0x1E293B, label: 'Projects' },
        { y: -0.3, height: 1.0, color: 0x2DD4BF, label: 'Skills' },
        { y: -1.5, height: 0.8, color: 0x8B5CF6, label: 'Contact' }
    ];

    sections.forEach(section => {
        const sectionGeometry = new THREE.PlaneGeometry(3.4, section.height);
        const sectionMaterial = new THREE.MeshPhongMaterial({
            color: section.color,
            shininess: 30
        });
        const sectionMesh = new THREE.Mesh(sectionGeometry, sectionMaterial);
        sectionMesh.position.set(0, section.y, 0.01);
        websiteGroup.add(sectionMesh);

        // Section title bar
        const titleGeometry = new THREE.BoxGeometry(2, 0.15, 0.02);
        const titleMaterial = new THREE.MeshPhongMaterial({
            color: 0xFFFFFF
        });
        const title = new THREE.Mesh(titleGeometry, titleMaterial);
        title.position.set(0, section.y - section.height * 0.3, 0.02);
        websiteGroup.add(title);
    });

    // Add website to phone screen
    websiteGroup.position.z = 0.22;
    phoneGroup.add(websiteGroup);

    // Create floating Flutter logos around the phone
    const flutterLogos = [];
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 6;

        const flutterGeometry = new THREE.TorusGeometry(0.3, 0.1, 8, 20);
        const flutterMaterial = new THREE.MeshPhongMaterial({
            color: 0x2DD4BF,
            shininess: 100,
            specular: 0x444444
        });

        const flutterLogo = new THREE.Mesh(flutterGeometry, flutterMaterial);
        flutterLogo.position.x = Math.cos(angle) * radius;
        flutterLogo.position.y = Math.sin(angle) * radius;
        flutterLogo.position.z = Math.sin(angle * 2) * 2;

        flutterLogo.userData = {
            angle: angle,
            radius: radius,
            speed: 0.005 + Math.random() * 0.01,
            floatSpeed: 0.001 + Math.random() * 0.002,
            floatOffset: Math.random() * Math.PI * 2
        };

        scene.add(flutterLogo);
        flutterLogos.push(flutterLogo);
    }

    // Create app particles around the phone
    const particleCount = 30;
    const particles = new THREE.Group();

    for (let i = 0; i < particleCount; i++) {
        const size = 0.05 + Math.random() * 0.1;
        const particleGeometry = new THREE.SphereGeometry(size, 8, 8);
        const particleMaterial = new THREE.MeshPhongMaterial({
            color: Math.random() > 0.5 ? 0x0253B3 : 0x8B5CF6,
            transparent: true,
            opacity: 0.6
        });

        const particle = new THREE.Mesh(particleGeometry, particleMaterial);

        const radius = 3 + Math.random() * 3;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);

        particle.position.x = radius * Math.sin(phi) * Math.cos(theta);
        particle.position.y = radius * Math.sin(phi) * Math.sin(theta);
        particle.position.z = radius * Math.cos(phi);

        particle.userData = {
            speed: 0.002 + Math.random() * 0.005,
            rotationAxis: new THREE.Vector3(
                Math.random() - 0.5,
                Math.random() - 0.5,
                Math.random() - 0.5
            ).normalize(),
            originalPosition: particle.position.clone()
        };

        particles.add(particle);
    }

    scene.add(particles);

    // Add phone to scene
    scene.add(phoneGroup);

    // Camera position
    camera.position.z = 12;

    // Animation variables
    let time = 0;
    let mouseX = 0;
    let mouseY = 0;

    // Mouse move interaction
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Device orientation for mobile
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', (e) => {
            if (e.gamma && e.beta) {
                mouseX = e.gamma * 0.02;
                mouseY = e.beta * 0.01 - 0.5;
            }
        });
    }

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;

        // Animate phone floating
        phoneGroup.rotation.y = Math.sin(time * 0.3) * 0.2 + mouseX * 0.5;
        phoneGroup.rotation.x = Math.cos(time * 0.2) * 0.1 + mouseY * 0.3;
        phoneGroup.position.y = Math.sin(time * 0.4) * 0.5;

        // Animate app icons
        appIcons.forEach(icon => {
            const floatAmount = Math.sin(time * icon.userData.floatSpeed + icon.userData.floatOffset) * 0.1;
            icon.position.y = icon.userData.originalY + floatAmount;

            // Gentle pulsing
            icon.scale.x = 1 + Math.sin(time * 0.5 + icon.userData.floatOffset) * 0.05;
            icon.scale.y = 1 + Math.sin(time * 0.5 + icon.userData.floatOffset) * 0.05;

            // Gentle rotation
            icon.rotation.y = Math.sin(time * 0.5 + icon.userData.floatOffset) * 0.1;
        });

        // Animate website sections
        websiteGroup.children.forEach((child, index) => {
            if (index > 0) { // Skip header
                child.position.x = Math.sin(time * 0.3 + index) * 0.05;
            }
        });

        // Animate Flutter logos
        flutterLogos.forEach(logo => {
            logo.userData.angle += logo.userData.speed;
            const floatY = Math.sin(time + logo.userData.floatOffset) * 0.3;

            logo.position.x = Math.cos(logo.userData.angle) * logo.userData.radius;
            logo.position.y = Math.sin(logo.userData.angle) * logo.userData.radius + floatY;

            logo.rotation.x += 0.01;
            logo.rotation.y += 0.01;
        });

        // Animate particles
        particles.children.forEach(particle => {
            particle.rotateOnAxis(particle.userData.rotationAxis, particle.userData.speed);

            // Orbit around phone
            const orbitRadius = 5;
            const orbitSpeed = 0.002;
            const angle = time * orbitSpeed + particle.userData.originalPosition.x;

            particle.position.x = Math.cos(angle) * orbitRadius + Math.sin(time * 0.5) * 1;
            particle.position.z = Math.sin(angle) * orbitRadius + Math.cos(time * 0.3) * 1;
        });

        // Camera follow mouse (subtle)
        camera.position.x += (mouseX * 3 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 2 - camera.position.y) * 0.05;
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

    // Start animation and hide loading
    setTimeout(() => {
        if (loadingElement) loadingElement.classList.remove('active');
    }, 1000);

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
                    document.body.style.overflow = '';
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
            document.documentElement.style.setProperty('--dark-color', '#F8FAFC');
            document.documentElement.style.setProperty('--light-color', '#0F172A');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            // Dark theme implementation would go here
            document.documentElement.style.setProperty('--dark-color', '#0F172A');
            document.documentElement.style.setProperty('--light-color', '#F8FAFC');
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
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');

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

    // Add click effects to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;

            this.appendChild(ripple);

            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Handle window resize for mobile menu
window.addEventListener('resize', () => {
    if (window.innerWidth > 992) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Add CSS for ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(rippleStyle);

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