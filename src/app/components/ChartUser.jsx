"use client";
import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { db } from '@/app/firebase';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { Chart as ChartJS, BarElement, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Tooltip, Legend, Title, PointElement);

export default function ChartUser({userType= 'user'}) {

    const [userId, setUserId] = useState(null);
    const [lessons, setLessons] = useState([]);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUserId = localStorage.getItem("IdUser");
            if (storedUserId) {
                setUserId(storedUserId);
            }
        }
    }, []);


    const fetchUserLessons = async () => {
        try {
            const lessonsRef = collection(db, "lessons");
            const q = query(
                lessonsRef,
                where(userType == "user" ? "user_id" : "driver_id", "==", userId),
            );
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const lessonsData = querySnapshot.docs.map(doc => doc.data());
                setLessons(lessonsData)
                return lessonsData;
            } else {
                console.log("No lessons found for this user within the specified date range.");
                return [];
            }
        } catch (error) {
            console.error("Error fetching user lessons:", error);
        }
    };

    const getTotalHoursPerDay = (lessons) => {
        const hoursPerDay = {};

        lessons.forEach((lesson) => {
            const lessonDate = new Date(lesson.date.seconds * 1000);
            const dayKey = lessonDate.toLocaleDateString();

            const lessonHours = lesson.time ? parseInt(lesson.time.split(":")[0], 10) : 0;

            if (!hoursPerDay[dayKey]) {
                hoursPerDay[dayKey] = 0;
            }
            hoursPerDay[dayKey] += lessonHours;
        });

        return hoursPerDay;
    };
    useEffect(() => {
        const fetchData = async () => {
            const lessonsData = await fetchUserLessons(userId);
            const hoursPerDay = getTotalHoursPerDay(lessonsData);
            const chartData = getChartData(hoursPerDay);
            setChartData(chartData);
        };

        fetchData();
    }, [userId]);

    const getChartData = (hoursPerDay) => {
        const labels = [];
        const data = [];
        const today = new Date();
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const formattedDate = date.toLocaleDateString(); 

            labels.push(formattedDate);
            data.push(hoursPerDay[formattedDate] || 0)
        }

        return {
            labels,
            datasets: [
                {
                    label: 'Hours Completed',
                    data,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                },
            ],
        };
    };


    const totalLessons = lessons.length;
    const completedLessons = lessons.filter((lesson) => lesson.status != 'completed').length;

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

    const barOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true, text: 'Driving Lesson Progress'
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
            title: {
                display: true, text: 'Lesson Hours Over the Next 7 Days'
            },
            tooltip: {
                callbacks: {
                    label: (context) => `Hours Completed": ${context.raw} Hrs`,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Hours Completed",
                },
            }
        }
    }



    return (
        <div className="ChartUser w-full overflow-hidden">
            <div className="grid grid-cols-12 gap-6 mb-4">
                <div className="lg:col-span-6 col-span-12 bg-white shadow-md rounded-lg overflow-hidden">
                    <Bar data={barData} options={barOptions} />
                    {/* <div className="mt-4 text-center text-gray-700">
                        Completed {completedLessons} out of {totalLessons} lessons ({((completedLessons / totalLessons) * 100).toFixed(2)}%)
                    </div> */}
                </div>

                <div className="lg:col-span-6 col-span-12 bg-white shadow-md rounded-lg overflow-hidden">
                    {chartData ? (
                        <Line data={chartData} options={lineOptions} />
                    ) : (
                        <p>Loading data...</p>
                    )}
                    {/* <div className="my-4 text-center text-gray-700">
                        This graph shows the improvement in skill level based on completed lessons.
                    </div> */}
                </div>
            </div>
        </div>
    );
}
