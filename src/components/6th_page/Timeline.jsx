import React from "react";
import "./Timeline.css";
import { FaDoorOpen, FaCommentDots, FaMusic, FaAward, FaUtensils, FaBolt } from "react-icons/fa";

const timelineData = [
  {
    time: "1:30 PM",
    title: "GATES OPEN",
    desc: "Doors unlock, welcome drinks and initial greetings.",
    icon: <FaDoorOpen />,
  },
  {
    time: "2:00 PM",
    title: "WELCOME CEREMONY",
    desc: "Opening address and introductions to the night.",
    icon: <FaCommentDots />,
  },
  {
    time: "2:30 PM",
    title: "CULTURAL PERFORMANCES",
    desc: "Batch performances and acts by the students.",
    icon: <FaMusic />,
  },
  {
    time: "3:30 PM",
    title: "AWARDS",
    desc: "Recognitions, memories, and award distribution.",
    icon: <FaAward />,
  },
  {
    time: "4:30 PM",
    title: "LUNCH",
    desc: "Feast under the neon lights with your friends.",
    icon: <FaUtensils />,
  },
  {
    time: "5:30 PM",
    title: "DJ NIGHT",
    desc: "Dance the night away and say your goodbyes.",
    icon: <FaBolt />,
  },
];

const Timeline = () => {
  return (
    <div className="timeline-wrapper">

      {/* Heading */}
      <div className="timeline-header">
        <h1>
          THE AFTERNOON'S <span>JOURNEY</span>
        </h1>
        <p>
          A timeline of events from the first welcome to the final dance.
        </p>
      </div>

      {/* Timeline */}
      <div className="timeline">
        {timelineData.map((item, index) => (
          <div
            key={index}
            className={`timeline-item ${
              index % 2 === 0 ? "left" : "right"
            }`}
          >
            <div className="timeline-card">
              <span className="time">{item.time}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>

            <div className="timeline-icon">
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="timeline-footer">
        ARRIVAL RECOMMENDED 15 MINS EARLY
      </div>
    </div>
  );
};

export default Timeline;