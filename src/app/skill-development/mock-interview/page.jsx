"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";
import axios from "axios";

export default function MockInterviewPage() {
  const [animate, setAnimate] = useState(false);
  // const [currentQuestion, setCurrentQuestion] = useState(0)
  // const [isRecording, setIsRecording] = useState(false)
  //const [timer, setTimer] = useState(0)
  const [feedback, setFeedback] = useState(null);
  const timerRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [jobRole, setJobRole] = useState("");

  // const questions = [
  //   {
  //     id: 1,
  //     text: "Tell me about a time when you had to deal with a difficult situation with a colleague or team member.",
  //     category: "Behavioral",
  //     difficulty: "Medium",
  //   },
  //   {
  //     id: 2,
  //     text: "Describe a project where you had to use your problem-solving skills to overcome a challenge.",
  //     category: "Behavioral",
  //     difficulty: "Medium",
  //   },
  //   {
  //     id: 3,
  //     text: "How do you handle working under pressure and meeting tight deadlines?",
  //     category: "Behavioral",
  //     difficulty: "Easy",
  //   },
  //   {
  //     id: 4,
  //     text: "What is your approach to learning new technologies or skills in a rapidly changing industry?",
  //     category: "Technical",
  //     difficulty: "Medium",
  //   },
  //   {
  //     id: 5,
  //     text: "Explain the concept of RESTful APIs and their importance in modern web development.",
  //     category: "Technical",
  //     difficulty: "Hard",
  //   },
  // ]

  const sendMessage = async () => {
    if (!userInput.trim() || !jobRole.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: userInput }]);

    try {
      const response = await axios.post("http://upgrade-profile-new-production.up.railway.app/chat", {
        message: userInput,
        job_role: jobRole,
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.data.response },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "An error occurred. Please try again." },
      ]);
    }

    setUserInput("");
  };

  const mockFeedback = {
    scores: {
      clarity: 0.8,
      relevance: 0.7,
      structure: 0.6,
      overall: 0.7,
    },
    feedback: [
      "Good job providing a clear example with context",
      "You could improve the structure by using the STAR method more explicitly",
      "Try to be more concise in your responses",
      "Your response was relevant to the question asked",
    ],
    strengths: ["Clear communication", "Good examples", "Relevant content"],
    improvements: [
      "Structure responses better",
      "Be more concise",
      "Maintain better eye contact",
    ],
  };

  useEffect(() => {
    setAnimate(true);
  }, []);

  const startRecording = () => {
    setIsRecording(true);
    setTimer(0);
    timerRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    // After 20 seconds, stop recording automatically and show feedback
    setTimeout(() => {
      stopRecording();
    }, 20000);
  };

  const stopRecording = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsRecording(false);
    setFeedback(mockFeedback);
  };

  const nextQuestion = () => {
    setCurrentQuestion((prev) => (prev + 1) % questions.length);
    setFeedback(null);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleFeedbackClick = () => {
    // Simulate feedback generation
    setFeedback(mockFeedback);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={`${styles.title} ${animate ? styles.animateTitle : ""}`}>
          AI-Powered Mock Interview
        </h1>
        <p
          className={`${styles.subtitle} ${animate ? styles.animateSubtitle : ""
            }`}
        >
          Practice answering common interview questions and receive instant AI
          feedback
        </p>
      </div>

      <div className={styles.content}>
        {/* <div className={`${styles.questionCard} ${animate ? styles.animateCard : ""}`}>
          <div className={styles.questionHeader}>
            <div className={styles.questionNumber}>
              Question {currentQuestion + 1} of {questions.length}
            </div>
            <div className={styles.questionTags}>
              <span className={styles.categoryTag}>{questions[currentQuestion].category}</span>
              <span
                className={`${styles.difficultyTag} ${styles[questions[currentQuestion].difficulty.toLowerCase()]}`}
              >
                {questions[currentQuestion].difficulty}
              </span>
            </div>
          </div>

          <div className={styles.questionText}>{questions[currentQuestion].text}</div>

          <div className={styles.recordingSection}>
            {!isRecording && !feedback ? (
              <button className={styles.startButton} onClick={startRecording}>
                Start Response
              </button>
            ) : isRecording ? (
              <div className={styles.recordingControls}>
                <div className={styles.timer}>
                  <div className={styles.timerIcon}></div>
                  <div className={styles.timerText}>{formatTime(timer)}</div>
                </div>
                <button className={styles.stopButton} onClick={stopRecording}>
                  Stop Recording
                </button>
              </div>
            ) : null}
          </div> */}
        {/* 
          {isRecording && (
            <div className={styles.recordingIndicator}>
              <div className={styles.recordingPulse}></div>
              <div className={styles.recordingMessage}>Recording your response...</div>
            </div>
          )}
        </div> */}
        <div className={styles.mockContainer}>
          <h1 className={styles.mockTitle}>AI Interview Simulator</h1>

          <input
            type="text"
            placeholder="Enter job role (e.g., Software Engineer)"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            className={styles.mockInput}
          />

          <div className={styles.mockChatbox}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${styles.mockMessage} ${msg.role === "user" ? styles.mockUser : styles.mockAssistant
                  }`}
              >
                {msg.content}
              </div>
            ))}
          </div>

          <div className={styles.mockInputRow}>
            <input
              type="text"
              placeholder="Type your response..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className={`${styles.mockInput} ${styles.flexGrow}`}
            />
            <button onClick={sendMessage} className={styles.mockSendButton}>
              Send
            </button>
            <button
              onClick={handleFeedbackClick}
              className={styles.mockFeedbackButton}
            >
              Feedback
            </button>
          </div>
        </div>

        {feedback && (
          <div
            className={`${styles.feedbackCard} ${animate ? styles.animateFeedback : ""
              }`}
          >
            <h2 className={styles.feedbackTitle}>Performance Analysis</h2>

            <div className={styles.scoreSection}>
              <div className={styles.scoreItem}>
                <div className={styles.scoreLabel}>Clarity</div>
                <div className={styles.scoreBar}>
                  <div
                    className={styles.scoreProgress}
                    style={{ width: `${feedback.scores.clarity * 100}%` }}
                  ></div>
                </div>
                <div className={styles.scoreValue}>
                  {(feedback.scores.clarity * 10).toFixed(1)}
                </div>
              </div>
              <div className={styles.scoreItem}>
                <div className={styles.scoreLabel}>Relevance</div>
                <div className={styles.scoreBar}>
                  <div
                    className={styles.scoreProgress}
                    style={{ width: `${feedback.scores.relevance * 100}%` }}
                  ></div>
                </div>
                <div className={styles.scoreValue}>
                  {(feedback.scores.relevance * 10).toFixed(1)}
                </div>
              </div>
              <div className={styles.scoreItem}>
                <div className={styles.scoreLabel}>Structure</div>
                <div className={styles.scoreBar}>
                  <div
                    className={styles.scoreProgress}
                    style={{ width: `${feedback.scores.structure * 100}%` }}
                  ></div>
                </div>
                <div className={styles.scoreValue}>
                  {(feedback.scores.structure * 10).toFixed(1)}
                </div>
              </div>
              <div className={`${styles.scoreItem} ${styles.overallScore}`}>
                <div className={styles.scoreLabel}>Overall</div>
                <div className={styles.scoreBar}>
                  <div
                    className={`${styles.scoreProgress} ${styles.overallProgress}`}
                    style={{ width: `${feedback.scores.overall * 100}%` }}
                  ></div>
                </div>
                <div className={styles.scoreValue}>
                  {(feedback.scores.overall * 10).toFixed(1)}
                </div>
              </div>
            </div>

            <div className={styles.feedbackDetails}>
              <div className={styles.feedbackColumn}>
                <h3 className={styles.columnTitle}>Strengths</h3>
                <ul className={styles.feedbackList}>
                  {feedback.strengths.map((item, index) => (
                    <li key={index} className={styles.feedbackItem}>
                      <span className={styles.strengthIcon}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.feedbackColumn}>
                <h3 className={styles.columnTitle}>Areas to Improve</h3>
                <ul className={styles.feedbackList}>
                  {feedback.improvements.map((item, index) => (
                    <li key={index} className={styles.feedbackItem}>
                      <span className={styles.improvementIcon}>⤴</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.feedbackActions}>
              <button className={styles.primaryButton} onClick={nextQuestion}>
                Next Question
              </button>
              <button className={styles.secondaryButton}>Save Feedback</button>
            </div>
          </div>
        )}
      </div>

      <div
        className={`${styles.interviewTips} ${animate ? styles.animateTips : ""
          }`}
      >
        <h2 className={styles.tipsTitle}>Interview Tips</h2>
        <div className={styles.tipsList}>
          <div className={styles.tipItem}>
            <div className={styles.tipIcon}>💡</div>
            <div className={styles.tipContent}>
              <h3 className={styles.tipHeading}>Use the STAR Method</h3>
              <p className={styles.tipText}>
                Structure your answers using Situation, Task, Action, and Result
                to provide clear and comprehensive responses.
              </p>
            </div>
          </div>
          <div className={styles.tipItem}>
            <div className={styles.tipIcon}>🎯</div>
            <div className={styles.tipContent}>
              <h3 className={styles.tipHeading}>Be Specific</h3>
              <p className={styles.tipText}>
                Use specific examples from your experience rather than general
                statements.
              </p>
            </div>
          </div>
          <div className={styles.tipItem}>
            <div className={styles.tipIcon}>⏱️</div>
            <div className={styles.tipContent}>
              <h3 className={styles.tipHeading}>Keep It Concise</h3>
              <p className={styles.tipText}>
                Aim to keep your responses under 2 minutes. Be clear and avoid
                unnecessary details.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.practiceHistory}>
        <h2 className={styles.historyTitle}>Your Recent Practice Sessions</h2>
        <div className={styles.historyList}>
          <div className={styles.historyItem}>
            <div className={styles.historyDate}>May 15, 2023</div>
            <div className={styles.historyContent}>
              <div className={styles.historyCategory}>Technical Interview</div>
              <div className={styles.historyScore}>7.5/10</div>
            </div>
            <button className={styles.historyButton}>Review</button>
          </div>
          <div className={styles.historyItem}>
            <div className={styles.historyDate}>May 10, 2023</div>
            <div className={styles.historyContent}>
              <div className={styles.historyCategory}>Behavioral Interview</div>
              <div className={styles.historyScore}>8.2/10</div>
            </div>
            <button className={styles.historyButton}>Review</button>
          </div>
          <div className={styles.historyItem}>
            <div className={styles.historyDate}>May 5, 2023</div>
            <div className={styles.historyContent}>
              <div className={styles.historyCategory}>Case Study Interview</div>
              <div className={styles.historyScore}>6.8/10</div>
            </div>
            <button className={styles.historyButton}>Review</button>
          </div>
        </div>
      </div>
    </div>
  );
}
