"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function FeedBack() {
    const [categoryType, setCategoryType] = useState("");
    const [message, setMessage] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleChange = (e) => {
        setCategoryType(e.target.value);
    };

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Form Submitted:", { categoryType, message });

        setFormSubmitted(true);

        setCategoryType("");
        setMessage("");

        setTimeout(() => {
            setFormSubmitted(false);
        }, 5000);
    };
    return (
        <div className="font-jakarta pt-6 pb-6">
            <p>
                You are welcome to provide feedback on this website. Please
                consider reading{" "}
                <Link
                    href="/about-site"
                    target="_blank"
                    className="text-[#800080] underline "
                >
                    About the Site
                </Link>{" "}
                before filling this form.
            </p>
            <form
                action=""
                method="post"
                className="pt-6"
                onSubmit={handleSubmit}
            >
                <label
                    htmlFor="name"
                    className="md:text-lg font-bold text-gray-700"
                >
                    Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full px-4 py-2 my-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#800080] focus:outline-none"
                    placeholder="Enter your name"
                    required
                />
                <label
                    htmlFor="email"
                    className="md:text-lg font-bold text-gray-700"
                >
                    Email <span className="text-red-500">*</span>
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="block w-full px-4 py-2 my-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#800080] focus:outline-none"
                    placeholder="Enter your email"
                    required
                />
                <div className="text-sm text-gray-500 my-2">
                    Your Email Id is required. It will not be shown to anyone
                    else.
                </div>
                <label
                    htmlFor="category"
                    className="md:text-lg font-bold text-gray-700"
                >
                    Choose a Type <span className="text-red-500">*</span>
                </label>
                <select
                    id="category"
                    name="category"
                    value={categoryType}
                    onChange={handleChange}
                    required
                    className="block w-full px-3 py-2 my-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#800080] focus:outline-none"
                >
                    <option value="" disabled>
                        Select an option
                    </option>
                    <option value="general_feedback">General Feedback</option>
                    <option value="error_report">Error Report</option>
                    <option value="omission_report">Omission Report</option>
                    <option value="ideas_suggestions">
                        Ideas and Suggestions
                    </option>
                    <option value="volunteer">Volunteer</option>
                </select>
                <label
                    htmlFor="message"
                    className="md:text-lg font-bold text-gray-700"
                >
                    Message <span className="text-red-500">*</span>
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={message}
                    onChange={handleMessageChange}
                    rows="4"
                    className="block w-full px-4 py-2 border my-2 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#800080] focus:outline-none"
                    placeholder="Write your feedback message here"
                    required
                ></textarea>

                <button
                    type="submit"
                    className="w-full mt-4 px-4 py-2 bg-[#800080] text-white font-bold rounded-md hover:bg-[#631d63] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Submit Feedback
                </button>
            </form>

            {formSubmitted && (
                <div className="mt-4 text-center text-green-600 font-bold">
                    <p>
                        Thank you for your feedback! Your message has been
                        submitted.
                    </p>
                </div>
            )}
        </div>
    );
}
