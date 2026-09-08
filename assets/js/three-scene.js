/**
 * 7 SPICE BUFFET RESTAURANT - THREE.JS 3D SCENES
 * 1. Hero 3D Floating Gourmet Composition & Vegetables with Golden Rim Lighting
 * 2. "The Secret Behind The Flavour" 3D Spice Orbit around Golden "7"
 */

(function() {
    'use strict';

    // Verify Three.js is available
    if (typeof THREE === 'undefined') {
        console.warn('Three.js library is not loaded. 3D orbit component will be skipped.');
        return;
    }

    const isMobile = window.innerWidth < 768;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.75);

    // Hero 3D canvas removed — full image hero is used instead.
    // Only the Spice Orbit around golden "7" is initialized below.

    function initHeroScene(canvas) {
        const container = canvas.parentElement;
        const width = container.clientWidth || window.innerWidth;
        const height = container.clientHeight || 540;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.z = 24;

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: !isMobile,
            powerPreference: 'high-performance'
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(pixelRatio);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.1;

        // Realistic Golden & Warm Ambient Lighting
        const ambientLight = new THREE.AmbientLight(0xfff5e6, 0.7);
        scene.add(ambientLight);

        const goldKeyLight = new THREE.PointLight(0xFFDF73, 2.4, 60);
        goldKeyLight.position.set(15, 12, 18);
        scene.add(goldKeyLight);

        const warmFillLight = new THREE.PointLight(0xD4AF37, 1.8, 50);
        warmFillLight.position.set(-14, -8, 12);
        scene.add(warmFillLight);

        const rimLight = new THREE.DirectionalLight(0xFFEAA7, 1.2);
        rimLight.position.set(0, 20, -10);
        scene.add(rimLight);

        // Group for all floating objects
        const foodGroup = new THREE.Group();
        scene.add(foodGroup);

        // Helper materials
        const goldMaterial = new THREE.MeshStandardMaterial({
            color: 0xD4AF37,
            metalness: 0.85,
            roughness: 0.25,
            emissive: 0x3a2505
        });

        const redChilliMat = new THREE.MeshStandardMaterial({
            color: 0xDC2626,
            roughness: 0.35,
            metalness: 0.2,
            clearcoat: 0.8,
            clearcoatRoughness: 0.2
        });

        const greenChilliMat = new THREE.MeshStandardMaterial({
            color: 0x16A34A,
            roughness: 0.4,
            metalness: 0.15,
            clearcoat: 0.6
        });

        const tomatoMat = new THREE.MeshStandardMaterial({
            color: 0xEF4444,
            roughness: 0.2,
            metalness: 0.1,
            clearcoat: 0.9
        });

        const lemonMat = new THREE.MeshStandardMaterial({
            color: 0xFACC15,
            roughness: 0.5,
            metalness: 0.1
        });

        const bellPepperMat = new THREE.MeshStandardMaterial({
            color: 0xF97316,
            roughness: 0.3,
            metalness: 0.15,
            clearcoat: 0.7
        });

        const garlicMat = new THREE.MeshStandardMaterial({
            color: 0xF5F0E6,
            roughness: 0.6,
            metalness: 0.05
        });

        const cinnamonMat = new THREE.MeshStandardMaterial({
            color: 0x854D0E,
            roughness: 0.8,
            metalness: 0.1
        });

        const herbMat = new THREE.MeshStandardMaterial({
            color: 0x15803D,
            roughness: 0.5,
            side: THREE.DoubleSide
        });

        // Procedural Creation of 3D Stylized Food Items
        const floatingItems = [];

        // 1. Tomato (Glossy sphere with calyx stem)
        const tomatoGroup = new THREE.Group();
        const tomatoMesh = new THREE.Mesh(new THREE.SphereGeometry(1.2, 24, 24), tomatoMat);
        tomatoMesh.scale.set(1, 0.9, 1);
        tomatoGroup.add(tomatoMesh);
        const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.5, 8), herbMat);
        stem.position.y = 1.1;
        tomatoGroup.add(stem);
        tomatoGroup.position.set(-6.5, 3.5, 2);
        foodGroup.add(tomatoGroup);
        floatingItems.push({ obj: tomatoGroup, rotSpeed: [0.008, 0.012, 0.005], floatSpeed: 1.2, offset: 0 });

        // 2. Red Chilli (Curved tapered cylinder)
        const chilliCurve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, -1.8, 0),
            new THREE.Vector3(0.3, -0.6, 0.2),
            new THREE.Vector3(0.5, 0.6, -0.1),
            new THREE.Vector3(0.2, 1.6, 0)
        ]);
        const chilliGeo = new THREE.TubeGeometry(chilliCurve, 20, 0.36, 12, false);
        const redChilliMesh = new THREE.Mesh(chilliGeo, redChilliMat);
        redChilliMesh.position.set(7.2, 2.8, 1);
        foodGroup.add(redChilliMesh);
        floatingItems.push({ obj: redChilliMesh, rotSpeed: [0.01, 0.015, 0.008], floatSpeed: 1.5, offset: 1.2 });

        // 3. Green Chilli
        const greenChilliMesh = new THREE.Mesh(chilliGeo, greenChilliMat);
        greenChilliMesh.position.set(-7, -3.2, 3);
        greenChilliMesh.rotation.z = Math.PI / 3;
        foodGroup.add(greenChilliMesh);
        floatingItems.push({ obj: greenChilliMesh, rotSpeed: [0.007, 0.01, 0.012], floatSpeed: 1.1, offset: 2.5 });

        // 4. Bell Pepper (Lobed Torus / Sphere combo)
        const pepperGroup = new THREE.Group();
        for (let i = 0; i < 4; i++) {
            const lobe = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.35, 1.8, 12), bellPepperMat);
            const angle = (i * Math.PI) / 2;
            lobe.position.set(Math.cos(angle) * 0.45, 0, Math.sin(angle) * 0.45);
            pepperGroup.add(lobe);
        }
        pepperGroup.position.set(6.8, -3.5, 2.5);
        foodGroup.add(pepperGroup);
        floatingItems.push({ obj: pepperGroup, rotSpeed: [0.009, 0.008, 0.006], floatSpeed: 1.3, offset: 3.8 });

        // 5. Lemon (Citrus spheroid)
        const lemonMesh = new THREE.Mesh(new THREE.SphereGeometry(1.0, 20, 20), lemonMat);
        lemonMesh.scale.set(1.4, 0.95, 0.95);
        lemonMesh.position.set(-4.5, 6, -1);
        foodGroup.add(lemonMesh);
        floatingItems.push({ obj: lemonMesh, rotSpeed: [0.012, 0.008, 0.01], floatSpeed: 1.4, offset: 4.2 });

        // 6. Garlic Clove / Bulb
        const garlicMesh = new THREE.Mesh(new THREE.ConeGeometry(0.9, 1.5, 12), garlicMat);
        garlicMesh.position.set(5.5, 6.2, 0);
        foodGroup.add(garlicMesh);
        floatingItems.push({ obj: garlicMesh, rotSpeed: [0.006, 0.014, 0.005], floatSpeed: 1.6, offset: 5.1 });

        // 7. Cinnamon Stick
        const cinnamonMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 2.4, 12), cinnamonMat);
        cinnamonMesh.rotation.x = Math.PI / 4;
        cinnamonMesh.position.set(-6, -6, 0);
        foodGroup.add(cinnamonMesh);
        floatingItems.push({ obj: cinnamonMesh, rotSpeed: [0.01, 0.007, 0.014], floatSpeed: 1.2, offset: 0.8 });

        // 8. Golden Cutlery Accent (Mini Golden Spoon & Fork)
        const spoonHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 2.8, 8), goldMaterial);
        const spoonHead = new THREE.Mesh(new THREE.SphereGeometry(0.4, 16, 16), goldMaterial);
        spoonHead.scale.set(0.8, 1.2, 0.3);
        spoonHead.position.y = 1.4;
        const spoonGroup = new THREE.Group();
        spoonGroup.add(spoonHandle);
        spoonGroup.add(spoonHead);
        spoonGroup.position.set(7.5, -0.5, 3);
        spoonGroup.rotation.z = -Math.PI / 4;
        foodGroup.add(spoonGroup);
        floatingItems.push({ obj: spoonGroup, rotSpeed: [0.006, 0.008, 0.012], floatSpeed: 0.9, offset: 2.1 });

        // Swirling Golden Spice Particles
        const particleCount = isMobile ? 35 : 80;
        const particlesGeo = new THREE.BufferGeometry();
        const posArray = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount * 3; i += 3) {
            posArray[i] = (Math.random() - 0.5) * 32;
            posArray[i + 1] = (Math.random() - 0.5) * 24;
            posArray[i + 2] = (Math.random() - 0.5) * 16;
        }
        particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const particlesMat = new THREE.PointsMaterial({
            size: isMobile ? 0.18 : 0.28,
            color: 0xFFDF73,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        const spiceParticles = new THREE.Points(particlesGeo, particlesMat);
        scene.add(spiceParticles);

        // Mouse Parallax Handling
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        window.addEventListener('mousemove', function(e) {
            const normX = (e.clientX / window.innerWidth) * 2 - 1;
            const normY = -(e.clientY / window.innerHeight) * 2 + 1;
            targetX = normX * 2.5;
            targetY = normY * 2;
        });

        // Optimization: Pause rendering when hero is out of view
        let isHeroVisible = true;
        if ('IntersectionObserver' in window) {
            const heroObserver = new IntersectionObserver((entries) => {
                isHeroVisible = entries[0].isIntersecting;
            }, { threshold: 0.05 });
            heroObserver.observe(container);
        }

        // Animation Loop
        let clock = new THREE.Clock();

        function animateHero() {
            requestAnimationFrame(animateHero);
            if (!isHeroVisible) return;

            const elapsedTime = clock.getElapsedTime();

            // Smooth mouse interpolation
            mouseX += (targetX - mouseX) * 0.04;
            mouseY += (targetY - mouseY) * 0.04;
            foodGroup.position.x = mouseX;
            foodGroup.position.y = mouseY;
            foodGroup.rotation.y = mouseX * 0.08;

            // Animate each floating object with organic bobbing & rotation
            floatingItems.forEach(item => {
                item.obj.rotation.x += item.rotSpeed[0];
                item.obj.rotation.y += item.rotSpeed[1];
                item.obj.rotation.z += item.rotSpeed[2];
                item.obj.position.y += Math.sin(elapsedTime * item.floatSpeed + item.offset) * 0.008;
            });

            // Golden spice particles slow drift
            spiceParticles.rotation.y = elapsedTime * 0.04;
            spiceParticles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.05;

            renderer.render(scene, camera);
        }
        animateHero();

        // Resize Listener
        window.addEventListener('resize', function() {
            const newW = container.clientWidth;
            const newH = container.clientHeight || 540;
            camera.aspect = newW / newH;
            camera.updateProjectionMatrix();
            renderer.setSize(newW, newH);
        });
    }

    /* ==========================================================================
       SCENE 2: "THE SECRET BEHIND THE FLAVOUR" 3D SPICE ORBIT
       ========================================================================== */
    const orbitCanvas = document.getElementById('orbitThreeCanvas');
    if (orbitCanvas) {
        initOrbitScene(orbitCanvas);
    }

    function initOrbitScene(canvas) {
        const container = canvas.parentElement;
        const width = container.clientWidth || 800;
        const height = container.clientHeight || 520;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
        camera.position.set(0, 5, 28);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: !isMobile,
            powerPreference: 'high-performance'
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(pixelRatio);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;

        // Illumination
        const ambient = new THREE.AmbientLight(0xfff5e6, 0.6);
        scene.add(ambient);

        const goldSpot = new THREE.PointLight(0xFFDF73, 2.8, 60);
        goldSpot.position.set(8, 12, 14);
        scene.add(goldSpot);

        const rimSpot = new THREE.PointLight(0xD4AF37, 2.0, 50);
        rimSpot.position.set(-10, -6, 12);
        scene.add(rimSpot);

        // Core Group
        const orbitMasterGroup = new THREE.Group();
        scene.add(orbitMasterGroup);

        // --- Sculpted Metallic Golden "7" ---
        const goldMaterial = new THREE.MeshStandardMaterial({
            color: 0xD4AF37,
            metalness: 0.9,
            roughness: 0.2,
            emissive: 0x241804
        });

        const sevenGroup = new THREE.Group();

        // Horizontal top bar of "7"
        const topBar = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.85, 0.9), goldMaterial);
        topBar.position.set(0, 2.4, 0);
        sevenGroup.add(topBar);

        // Serif accent on top left
        const serif = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.95, 0.9), goldMaterial);
        serif.position.set(-1.67, 1.85, 0);
        sevenGroup.add(serif);

        // Diagonal stem of "7"
        const stemHeight = 5.2;
        const stem = new THREE.Mesh(new THREE.BoxGeometry(0.85, stemHeight, 0.9), goldMaterial);
        stem.rotation.z = -0.42;
        stem.position.set(0.5, 0.1, 0);
        sevenGroup.add(stem);

        // Center golden glow sphere
        const coreGlowMesh = new THREE.Mesh(
            new THREE.SphereGeometry(1.6, 16, 16),
            new THREE.MeshBasicMaterial({
                color: 0xD4AF37,
                transparent: true,
                opacity: 0.15,
                blending: THREE.AdditiveBlending
            })
        );
        sevenGroup.add(coreGlowMesh);

        orbitMasterGroup.add(sevenGroup);

        // --- 3D Orbital Rings ---
        const orbitRadiusX = 10.5;
        const orbitRadiusZ = 7.0;

        // Visible Golden Orbit Track
        const curvePoints = [];
        for (let i = 0; i <= 64; i++) {
            const theta = (i / 64) * Math.PI * 2;
            curvePoints.push(new THREE.Vector3(Math.cos(theta) * orbitRadiusX, 0, Math.sin(theta) * orbitRadiusZ));
        }
        const orbitCurve = new THREE.CatmullRomCurve3(curvePoints);
        const orbitTrackGeo = new THREE.TubeGeometry(orbitCurve, 64, 0.05, 8, true);
        const orbitTrackMat = new THREE.MeshBasicMaterial({
            color: 0xD4AF37,
            transparent: true,
            opacity: 0.4
        });
        const orbitTrack = new THREE.Mesh(orbitTrackGeo, orbitTrackMat);
        orbitTrack.rotation.x = 0.35; // Tilted orbit plane
        orbitMasterGroup.add(orbitTrack);

        // Second subtle counter-tilted ring
        const orbitTrack2 = new THREE.Mesh(orbitTrackGeo, new THREE.MeshBasicMaterial({
            color: 0xFFDF73,
            transparent: true,
            opacity: 0.2
        }));
        orbitTrack2.rotation.x = -0.25;
        orbitTrack2.rotation.z = 0.2;
        orbitTrack2.scale.set(0.85, 0.85, 0.85);
        orbitMasterGroup.add(orbitTrack2);

        // --- 7 Orbiting Signature Spices ---
        const spicesData = [
            { name: "Chilli", color: 0xDC2626, geo: new THREE.ConeGeometry(0.5, 1.6, 10), rot: [0.4, 0, 0.8] },
            { name: "Cardamom", color: 0x84CC16, geo: new THREE.SphereGeometry(0.7, 12, 12), scale: [0.7, 1.2, 0.7] },
            { name: "Cinnamon", color: 0x78350F, geo: new THREE.CylinderGeometry(0.25, 0.25, 1.9, 8), rot: [0.7, 0.3, 0] },
            { name: "Star Anise", color: 0xA16207, geo: new THREE.TorusGeometry(0.7, 0.28, 8, 8), rot: [1.2, 0.4, 0] },
            { name: "Pepper", color: 0x1F2937, geo: new THREE.DodecahedronGeometry(0.55), rot: [0, 0.5, 0] },
            { name: "Garlic", color: 0xF3F4F6, geo: new THREE.ConeGeometry(0.65, 1.3, 10), rot: [0.2, 0, 0.5] },
            { name: "Herbs", color: 0x15803D, geo: new THREE.BoxGeometry(0.2, 1.4, 0.8), rot: [0.5, 0.5, 0.2] }
        ];

        const spiceMeshes = [];
        const spiceCount = spicesData.length;

        spicesData.forEach((spice, idx) => {
            const mat = new THREE.MeshStandardMaterial({
                color: spice.color,
                roughness: 0.4,
                metalness: 0.2,
                emissive: 0x111111
            });
            const mesh = new THREE.Mesh(spice.geo, mat);
            if (spice.scale) {
                mesh.scale.set(spice.scale[0], spice.scale[1], spice.scale[2]);
            }
            if (spice.rot) {
                mesh.rotation.set(spice.rot[0], spice.rot[1], spice.rot[2]);
            }

            // Small glowing aura around each spice satellite
            const halo = new THREE.Mesh(
                new THREE.SphereGeometry(0.9, 8, 8),
                new THREE.MeshBasicMaterial({
                    color: 0xFFDF73,
                    transparent: true,
                    opacity: 0.2,
                    blending: THREE.AdditiveBlending
                })
            );
            mesh.add(halo);

            orbitMasterGroup.add(mesh);
            spiceMeshes.push({
                mesh: mesh,
                baseAngle: (idx / spiceCount) * Math.PI * 2,
                data: spice
            });
        });

        // Scroll and Mouse Dynamics
        let scrollVelocity = 0;
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;
            const delta = Math.abs(currentScrollY - lastScrollY);
            scrollVelocity = Math.min(delta * 0.002, 0.05);
            lastScrollY = currentScrollY;
        }, { passive: true });

        // Interactive Mouse Drag / Tilt
        let isOrbitVisible = true;
        if ('IntersectionObserver' in window) {
            const orbitObserver = new IntersectionObserver((entries) => {
                isOrbitVisible = entries[0].isIntersecting;
            }, { threshold: 0.05 });
            orbitObserver.observe(container);
        }

        let orbitClock = new THREE.Clock();
        let orbitRotation = 0;

        function animateOrbit() {
            requestAnimationFrame(animateOrbit);
            if (!isOrbitVisible) return;

            const delta = orbitClock.getDelta();
            
            // Base orbital speed + scroll acceleration with gentle decay
            orbitRotation += (0.45 + scrollVelocity * 10) * delta;
            scrollVelocity *= 0.94; // friction decay

            // Gentle wobble on central 7
            sevenGroup.rotation.y = Math.sin(orbitRotation * 0.6) * 0.25;
            sevenGroup.rotation.x = Math.cos(orbitRotation * 0.4) * 0.08;

            // Position each spice along the tilted elliptical orbit
            spiceMeshes.forEach(item => {
                const currentAngle = item.baseAngle + orbitRotation;
                const x = Math.cos(currentAngle) * orbitRadiusX;
                const z = Math.sin(currentAngle) * orbitRadiusZ;
                
                // Project onto tilted plane (rotation around X by 0.35 rad)
                const tiltAngle = 0.35;
                const y = -z * Math.sin(tiltAngle);
                const finalZ = z * Math.cos(tiltAngle);

                item.mesh.position.set(x, y, finalZ);
                item.mesh.rotation.y += 0.02;
                item.mesh.rotation.x += 0.015;
            });

            renderer.render(scene, camera);
        }
        animateOrbit();

        // Resize Listener
        window.addEventListener('resize', function() {
            const newW = container.clientWidth;
            const newH = container.clientHeight || 520;
            camera.aspect = newW / newH;
            camera.updateProjectionMatrix();
            renderer.setSize(newW, newH);
        });
    }

})();
