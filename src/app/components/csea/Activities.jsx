import React from "react";

export default function Activities({ activitiesDetails }) {
    return (
        <div className="activities-container md:text-lg pt-6 font-jakarta pb-6">
            Some of the past activities:
            {activitiesDetails.map((yearData) => (
                <div key={yearData.year} className="year-section">
                    <h2 className="year-title font-bold text-[#800080]">
                        {yearData.year}
                    </h2>
                    <ul className="events-list list-disc pl-6">
                        {yearData.events.map((event, index) => (
                            <li key={index} className="event-item pb-2">
                                <h3 className="event-name font-bold">
                                    {event.name}
                                </h3>
                                <p className="event-description">
                                    {event.description}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
