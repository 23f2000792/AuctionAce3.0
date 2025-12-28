
'use client';

import { useEffect, useRef } from 'react';

// A simple 2D Vector class
class Vector {
    x: number;
    y: number;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(v: Vector) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }
}

// The particle class
class Particle {
    pos: Vector;
    vel: Vector;
    size: number;
    color: string;
    
    constructor(x: number, y: number, color: string) {
        this.pos = new Vector(x, y);
        this.vel = new Vector(Math.random() - 0.5, Math.random() - 0.5);
        this.size = Math.random() * 2 + 1;
        this.color = color;
    }

    update(ctx: CanvasRenderingContext2D, width: number, height: number) {
        this.pos.add(this.vel);

        // Bounce off walls
        if (this.pos.x < 0 || this.pos.x > width) this.vel.x *= -1;
        if (this.pos.y < 0 || this.pos.y > height) this.vel.y *= -1;

        this.draw(ctx);
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}


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

        const init = () => {
            particles = [];
            const numParticles = (width * height) / 10000;
            for (let i = 0; i < numParticles; i++) {
                const color = colors[Math.floor(Math.random() * colors.length)];
                particles.push(new Particle(Math.random() * width, Math.random() * height, color));
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            
            // Draw lines between nearby particles
            for(let i = 0; i < particles.length; i++) {
                for(let j = i; j < particles.length; j++) {
                    const dist = Math.hypot(particles[i].pos.x - particles[j].pos.x, particles[i].pos.y - particles[j].pos.y);
                    if (dist < 100) {
                        ctx.strokeStyle = particles[i].color;
                        ctx.lineWidth = 0.2;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].pos.x, particles[i].pos.y);
                        ctx.lineTo(particles[j].pos.x, particles[j].pos.y);
                        ctx.stroke();
                    }
                }
            }
            
            particles.forEach(p => p.update(ctx, width, height));

            requestAnimationFrame(animate);
        };
        
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

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 bg-background" />;
};
