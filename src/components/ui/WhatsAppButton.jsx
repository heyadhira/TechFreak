import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useSiteSettings } from '@/hooks/useSiteSettings';

export default function WhatsAppButton({
    phoneNumber,
    message = "Hi! I'm interested in your web development services.",
    className = ''
}) {
    const { settings } = useSiteSettings();
    const activePhoneNumber = phoneNumber || settings.whatsapp || '919876543210';

    const whatsappUrl = `https://wa.me/${activePhoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-colors ${className}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <MessageCircle className="w-7 h-7" />

            {/* Pulse animation */}
            <span className="absolute w-full h-full rounded-full bg-green-500 animate-ping opacity-25" />
        </motion.a>
    );
}
