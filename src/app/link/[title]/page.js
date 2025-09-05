'use client'
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function links() {
    const token = process.env.NEXT_PUBLIC_TOKEN;
    const backend_url = process.env.NEXT_PUBLIC_API_URL;

    const [loading, setLoading] = useState(true);
    const params = useParams(); // Get the dynamic route param
    const currentTitle = params.title; // The [title] from the URL

    useEffect(() => {
        const fetchDataAndRedirect = async () => {
            try {
                const response = await fetch(`${backend_url}api/links`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const Data = await response.json();
                const linkData = Data.data;

                // Find the object where title matches the route param
                const matched = linkData.find(item => item.title === currentTitle);

                if (matched) {
                    // Redirect to the matched URL
                    window.location.href = matched.url.trim(); // Make sure to trim in case of space
                } else {
                    console.error("No matching title found.");
                    // Optionally: redirect to 404 or show a message
                }

            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDataAndRedirect();
    }, [currentTitle]);

    return (
        <>
            {loading && <p>Redirecting...</p>}
        </>
    );
}    
