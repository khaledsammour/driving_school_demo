"use client";
import { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, LineElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Tooltip, Legend, PointElement);

export default function ChartUser() {
    const totalLessons = 20;
    const completedLessons = 12;

    const barData = {
        labels: ["Completed", "Remaining"],
        datasets: [
            {
                label: "Lessons",
                data: [completedLessons, totalLessons - completedLessons],
                backgroundColor: ["#4CAF50", "#FF6384"],
            },
        ],
    };

    const skillLevelData = {
        labels: Array.from({ length: totalLessons }, (_, i) => `Lesson ${i + 1}`),
        datasets: [
            {
                label: "Skill Level",
                data: Array.from({ length: totalLessons }, (_, i) => (i < completedLessons ? (i + 1) * 5 : null)),
                borderColor: "#36A2EB",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                tension: 0.3,
                pointBackgroundColor: "#36A2EB",
                fill: true,
            },
        ],
    };

    const barOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.label}: ${context.raw} lessons`,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: totalLessons,
                title: {
                    display: true,
                    text: "Number of Lessons",
                },
            },
        },
    };

    const lineOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
            tooltip: {
                callbacks: {
                    label: (context) => `Skill Level: ${context.raw}%`,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                title: {
                    display: true,
                    text: "Skill Level (%)",
                },
            },
            x: {
                title: {
                    display: true,
                    text: "Lessons",
                },
            },
        },
    };

    return (
        <div className="ChartUser w-full overflow-hidden">
            <div className="p-2 flex flex-col gap-3 md:flex-row items-center justify-center">
                <div className="w-full md:w-1/2 p-4 bg-white shadow-lg rounded-lg overflow-hidden">
                    <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Driving Lesson Progress</h2>
                    <div className="w-full h-[300px] md:h-[400px]">
                        <Bar data={barData} options={barOptions} />
                    </div>
                    <div className="mt-4 text-center text-gray-700">
                        <p>
                            Completed {completedLessons} out of {totalLessons} lessons ({((completedLessons / totalLessons) * 100).toFixed(2)}%)
                        </p>
                    </div>
                </div>

                <div className="w-full md:w-1/2 p-4 bg-white shadow-lg rounded-lg overflow-hidden">
                    <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Skill Level Progress</h2>
                    <div className="w-full h-[300px] md:h-[400px]">
                        <Line data={skillLevelData} options={lineOptions} />
                    </div>
                    <div className="mt-4 text-center text-gray-700">
                        <p>
                            This graph shows the improvement in skill level based on completed lessons.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
