"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

const RETRY_COUNT = 3; // Number of retry attempts
const RETRY_DELAY = 3000; // Delay between retries in milliseconds (3 seconds in this example)

export default function TopicsList() {
  const [topics, setTopics] = useState([]);
  const [retryAttempt, setRetryAttempt] = useState(0);

  useEffect(() => {
    const getTopics = async () => {
      try {
        console.log("base_url:", process.env.BASE_URL);
        const res = await fetch(`${process.env.BASE_URL}/api/topics`, {
          cache: "no-store",
        });

        if (!res.ok) {
          console.log("res", res);
          throw new Error("Failed to fetch topics");
        }

        const data = await res.json();
        setTopics(data.topics);
        setRetryAttempt(0); // Reset retry attempt counter on successful fetch
      } catch (error) {
        console.log("Error loading topics: ", error);
        if (retryAttempt < RETRY_COUNT - 1) {
          // Retry if retryAttempt is less than the maximum retry count
          setTimeout(() => {
            setRetryAttempt(retryAttempt + 1);
          }, RETRY_DELAY);
        } else {
          console.log("Maximum retry attempts reached");
        }
      }
    };

    getTopics(); // Call the function to fetch topics when the component mounts or updates
  }, [retryAttempt]); // Include retryAttempt in the dependency array to trigger retries

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
        </div>
      ))}
    </>
  );
}
