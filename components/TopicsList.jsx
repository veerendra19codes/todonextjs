'use client'

import React, { useState, useEffect } from "react";
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

export default function TopicsList() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const getTopics = async () => {
      try {

        const res = await fetch(`${process.env.BASE_URL}/api/topics`, {
          cache: "no-store",
        });


        if (!res.ok) {
          console.log("res", res)
          throw new Error("Failed to fetch topics");
        }

        const data = await res.json();
        setTopics(data.topics);
      } catch (error) {
        console.log("Error loading topics: ", error);
      }
    };

    getTopics(); // Call the function to fetch topics when the component mounts or updates
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <>
      {topics.map((t) => (
        <div
          key={t._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">{t.title}</h2>
            <div>{t.description}</div>
          </div>

          <div className="flex gap-2">
            <RemoveBtn id={t._id} />
            <Link href={`/editTopic/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div >
      ))
      }
    </>
  );
}