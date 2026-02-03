import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

export default function AnimatedCounter({
    end,
    suffix = '',
    prefix = '',
    duration = 2,
    decimals = 0
}) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!isInView || hasAnimated.current) return;
        hasAnimated.current = true;

        const startTime = Date.now();
        const endValue = parseFloat(end);

        const animate = () => {
            const now = Date.now();
            const elapsed = (now - startTime) / 1000;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = easeOut * endValue;

            setCount(currentValue);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [isInView, end, duration]);

    const displayValue = decimals > 0
        ? count.toFixed(decimals)
        : Math.round(count);

    return (
        <span ref={ref}>
            {prefix}{displayValue}{suffix}
        </span>
    );
}
