
'use client';

import { useEffect, useRef } from 'react';

export const ParticleBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        let particles: Particle[] = [];
        const colors = [
            'hsla(var(--primary), 0.7)',
            'hsla(var(--secondary), 0.7)',
            'hsla(var(--destructive), 0.5)',
            'hsla(var(--foreground), 0.5)',
        ];

        class Particle {
            x: number;
            y: number;
            directionX: number;
            directionY: number;
            size: number;
            color: string;
            speedX: number;
            speedY: number;

            constructor(x: number, y: number, directionX: number, directionY: number, size: number, color: string) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
                this.speedX = directionX;
                this.speedY = directionY;
            }

            draw() {
                ctx!.beginPath();
                ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx!.fillStyle = this.color;
                ctx!.fill();
            }

            update() {
                if (this.x > width + this.size || this.x < -this.size) {
                    this.x = this.directionX > 0 ? -this.size : width + this.size;
                }
                if (this.y > height + this.size || this.y < -this.size) {
                     this.y = this.directionY > 0 ? -this.size : height + this.size;
                }
                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        function init() {
            particles = [];
            let numberOfParticles = (width * height) / 12000;
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 1.5) + 0.5;
                let x = Math.random() * width;
                let y = Math.random() * height;
                let directionX = (Math.random() * 0.4) - 0.2;
                let directionY = (Math.random() * 0.4) - 0.2;
                let color = colors[Math.floor(Math.random() * colors.length)];

                particles.push(new Particle(x, y, directionX, directionY, size, color));
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx!.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
            }
        }
        
        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            init();
        }

        init();
        animate();
        
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);

    }, []);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};
