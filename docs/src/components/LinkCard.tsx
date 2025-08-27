import React from 'react';
import Link from '@docusaurus/Link';

interface LinkCardProps {
    title: string;
    description: string;
    to: string;
}

export default function LinkCard({ title, description, to }: LinkCardProps) {
    return (
        <Link
            to={to}
            style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'block',
                border: '1px solid #eee',
                borderRadius: 12,
                padding: 24,
                width: 280,
                transition: 'all 0.2s',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            }}
        >
            <h3 style={{ marginBottom: 8 }}>{title}</h3>
            <p style={{ color: '#555' }}>{description}</p>
            <div style={{ marginTop: 12, fontWeight: 'bold', color: '#0078d4' }}>→ Go</div>
        </Link>
    );
}
