"use client"

import React, { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

export default function Return() {
    const [status, setStatus] = useState(null);
    const [customerEmail, setCustomerEmail] = useState('');

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get('session_id');

        fetch(`/api/checkout_sessions?session_id=${sessionId}`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                setStatus(data.status);
                setCustomerEmail(data.customer_email);
            });
    }, []);

    if (!status || status === 'open') {
        return (
            redirect('/')
        )
    }

    if (status === 'complete') {


        return (
            <section id="success">
                <p>
                    We appreciate your business! Your story is in way by email will be sent to {customerEmail}.

                    If you have any questions, please email <a href="mailto:contact@kidsadventure.com">contact@kidsadventure.com</a>.
                </p>
            </section>
        )
    }

    return null;
}