"use client";
import React, { useEffect, useState } from "react";
import { AiFillDashboard } from "react-icons/ai";
import { BiHome } from "react-icons/bi";
import { MdCarRental, MdDirectionsCar, MdLocalShipping, MdOutlinePlayLesson, MdToday } from "react-icons/md";
import { FaClock, FaDollarSign, FaFile, FaFileAlt, FaGraduationCap, FaHistory, FaStar } from "react-icons/fa";
import ChartUser from "@/app/components/ChartUser";
import { collection, getDocs, query, where, getDoc, doc, getAggregateFromServer, sum, Timestamp } from "firebase/firestore";
import { db } from "@/app/firebase";
import { v4 as uuidv4 } from "uuid";
import Loader from "@/app/components/loader";
import toast from "react-hot-toast";
import { Chip, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { LuView } from "react-icons/lu";
import Link from "next/link";

export default function UserPage() {
    const [todayLessons, setTodayLessons] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [userId, setUserId] = useState(null);
    const [userData, setUserData] = useState(null);
    const [hoursCompleted, setHoursCompleted] = useState(0);
    const [hoursScheduled, setHoursScheduled] = useState(0);
    const [hoursToday, setHoursToday] = useState(0);

    // Fetch userId from localStorage
    useEffect(() => {
        if (typeof window !== "undefined") {
            const Id = localStorage.getItem("IdUser");
            if (Id) {
                setUserId(Id);
            }
        }
    }, []);
    function addTimes(time1, time2) {
        // Split the times into hours and minutes
        let [hours1, minutes1] = time1.split(':').map(Number);
        let [hours2, minutes2] = time2.split(':').map(Number);
        
        // Add the minutes and handle overflow
        let totalMinutes = minutes1 + minutes2;
        let extraHours = Math.floor(totalMinutes / 60);
        let finalMinutes = totalMinutes % 60;
        
        // Add the hours and handle overflow
        let totalHours = hours1 + hours2 + extraHours;
        let finalHours = totalHours % 24; // In case of overflow past 24 hours
        
        // Return the result in "HH:MM" format
        return `${String(finalHours).padStart(2, '0')}:${String(finalMinutes).padStart(2, '0')}`;
      }
    // Fetch payments and calculate total price
    useEffect(() => {
        const fetchLessons = async () => {
            if (!userId) {
                setError("User ID not found in local storage.");
                setLoading(false);
                return;
            }

            try {
                const lessonsRef = collection(db, "lessons");
                const q = query(lessonsRef, where("driver_id", "==", userId));
                const querySnapshot = await getDocs(q);
                let localHoursCompleted = "00:00";
                let localHoursScheduled = "00:00";
                let localHoursToday = "00:00";
                const currentDate = new Date();
                const todayLessonsData = []
                for (let i = 0; i <  querySnapshot.docs.length; i++) {
                    const doc =  querySnapshot.docs[i].data();
                    if (doc.status === "completed") {
                        localHoursCompleted = addTimes(localHoursCompleted, doc.time);
                    } else if (doc.status === "soon") {
                        localHoursScheduled = addTimes(localHoursScheduled, doc.time);
                    }
                    const exampleTimestamp = new Timestamp(doc.date.seconds, 0); 
                    const date = exampleTimestamp.toDate();
                    if (date.getDate() == currentDate.getDate()){
                        localHoursToday = addTimes(localHoursToday, doc.time)
                        todayLessonsData.push(doc)
                    }
                }
                setHoursCompleted(localHoursCompleted)
                setHoursScheduled(localHoursScheduled)
                setHoursToday(localHoursToday)
                
                const lessonsData = querySnapshot.docs.map((doc) => ({
                    id: uuidv4(),
                    ...doc.data(),
                }));

                setLessons(lessonsData);
                setTodayLessons(todayLessonsData);
            } catch (err) {
                setError("Failed to fetch payments.");
            } finally {
                setLoading(false);
            }
        };
        const fetchUserData = async () => {
            try {
                const userRef = doc(db, "users", userId);
                const userSnapshot = await getDoc(userRef);
                if (userSnapshot.exists()) {
                    const user = userSnapshot.data();
                    setUserData(user);                                   
                    const coll = collection(db, 'payments');   
                    const snapshot = await getAggregateFromServer(coll, {
                        totalAmount: sum('amount')
                    });   
                    setTotalPrice(snapshot.data().totalAmount);
                } else {
                    console.log("No such user document!");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchLessons();
            fetchUserData();
        }
    }, [userId]);

    const formatTimestamp = (timestamp) => {        
        if (!timestamp) {
            return "Invalid Date"; // Handle null or undefined
        }
        const exampleTimestamp = new Timestamp(timestamp.seconds, 0); 
        const date = exampleTimestamp.toDate();
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    };

    if (loading) return <Loader />;
    if (error) {
        toast.error(error);
        return null;
    }

    return (
        <div className="User py-6">
            <div className="overview">
                {/* Dashboard Header */}
                <div className="title flex items-center mb-12">
                    <BiHome className="h-9 w-9 bg-primary rounded-lg text-blue-600 flex items-center justify-center text-xl" />
                    <span className="text text-2xl font-bold ml-2 text-blue-600">
                        Dashboard
                    </span>
                </div>

                {/* Summary Boxes */}
                <div className="boxes grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[
                        {
                            color: "bg-gradient-to-r from-yellow-300 to-yellow-500",
                            icon: <FaStar className="text-white text-4xl" />,
                            label: "Rating",
                            value: (userData?.rate?.reduce((acc, val) => acc + Number(val), 0) /  userData?.rate?.length).toFixed(1) ?? '0'
                        },
                        {
                            color: "bg-gradient-to-r from-blue-400 to-blue-600",
                            icon: <FaClock className="text-white text-4xl" />,
                            label: "Hours Completed",
                            value: hoursCompleted
                        },
                        {
                            color: "bg-gradient-to-r from-teal-400 to-teal-600",
                            icon: <MdDirectionsCar className="text-white text-4xl" />,
                            label: "Hours Scheduled",
                            value: hoursScheduled
                        },
                        {
                            color: "bg-gradient-to-r from-purple-300 to-purple-500",
                            icon: <MdToday className="text-white text-4xl" />,
                            label: "Today open hours",
                            value: hoursToday
                        },
                        {
                            color: "bg-gradient-to-r from-pink-400 to-pink-600",
                            icon: <FaGraduationCap className="text-white text-4xl" />,
                            label: "Total Lessons",
                            value: lessons.length
                        },
                        {
                            color: "bg-gradient-to-r from-green-400 to-green-600",
                            icon: <FaDollarSign className="text-white text-4xl" />,
                            label: "Earned Money",
                            value: totalPrice
                        },
                    ].map((box, index) => (
                        <div
                            key={index}
                            className={`${box.color} rounded-lg flex flex-col items-center p-6 transition-all duration-200 hover:scale-105 hover:shadow-2xl`}
                        >
                            {box.icon}
                            <span className="text-lg font-semibold text-white mt-2">{box.label}</span>
                            <span className="text-3xl font-bold text-white mt-2">{box.value}</span>
                        </div>
                    ))}
                </div>

                {/* User Activity Section */}
                <div className="users pt-4">
                    <div className="title flex items-center mb-8">
                        <AiFillDashboard className="h-9 w-9 bg-primary rounded-lg text-blue-600 flex items-center justify-center text-xl" />
                        <span className="text text-2xl font-medium ml-2 text-blue-600">
                            User Activity
                        </span>
                    </div>
                    <div className="chart w-full max-w-full">
                        <ChartUser userType="driver" />
                    </div>
                </div>

                {/* Today Lessons Section */}
                <div className="users pt-4">
                    <div className="title flex items-center mb-8">
                        <MdToday className="h-9 w-9 bg-primary rounded-lg text-blue-600 flex items-center justify-center text-xl" />
                        <span className="text text-2xl font-medium ml-2 text-blue-600">
                            Today Lesson
                        </span>
                    </div>
                    <div className="chart w-full max-w-full">
                    <TableContainer
                        elevation={3}
                        sx={{
                            mt: 3,
                            overflowX: 'auto',
                            width: '100%',
                            maxWidth: { xs: '100%', sm: '600px', md: '800px', lg: '100%' },
                            mx: 'auto'
                        }}
                    >
                        <Table sx={{ minWidth: 650 }} aria-label="lessons table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>#</strong></TableCell>
                                    <TableCell><strong>Date</strong></TableCell>
                                    <TableCell><strong>Time</strong></TableCell>
                                    <TableCell><strong>Status</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {todayLessons.map((lesson,index) => (
                                    <TableRow key={lesson.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{formatTimestamp(lesson.date)}</TableCell>
                                        <TableCell>{lesson.time || "N/A"}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={lesson.status}
                                                color={
                                                    lesson.status === "Accepted"
                                                        ? "success"
                                                        : lesson.status === "Rejected"
                                                            ? "error"
                                                            : lesson.status === "pending"
                                                                ? "warning"
                                                                : "default"
                                                }
                                                variant="outlined"
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
