import { Box, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { useDispatch } from "react-redux";

import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes
} from "react-router-dom";

import { setCredentials } from "./store/authSlice";

import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import ActivityDetail from "./components/ActivityDetail";

import "./App.css";


// ==========================================
// ACTIVITIES PAGE
// ==========================================

const ActivitiesPage = () => {

  return (
    <Box className="activities-page">

      <ActivityForm
        onActivityAdded={() => window.location.reload()}
      />

      <ActivityList />

    </Box>
  );
};


// ==========================================
// LOGIN PAGE
// ==========================================

const LoginPage = ({ logIn }) => {

  const [showAI, setShowAI] = useState(false);

  const [question, setQuestion] = useState("");

  const [response, setResponse] = useState("");

  const [loading, setLoading] = useState(false);


  // ==========================================
  // ASK NEXORA AI
  // ==========================================

  const askNexoraAI = async () => {
  if (!question.trim()) {
    return;
  }

  setLoading(true);
  setResponse("");

  // AI thinking effect
  setTimeout(() => {
    const q = question.toLowerCase();

    let answer = "";

    if (q.includes("running") || q.includes("run")) {
      answer =
        "Running is a great workout. Try to maintain a steady pace, warm up for 5–10 minutes before running, and increase your distance gradually. Also keep yourself hydrated.";
    } 
    else if (q.includes("weight") || q.includes("lose")) {
      answer =
        "For healthy weight loss, focus on regular exercise, strength training, enough sleep, and a balanced diet. Avoid extreme dieting and try to stay consistent.";
    } 
    else if (q.includes("muscle") || q.includes("gym")) {
      answer =
        "To build muscle, focus on strength training with progressive overload. Include enough protein in your diet, take proper rest, and stay consistent with your workouts.";
    } 
    else if (q.includes("diet") || q.includes("food")) {
      answer =
        "A balanced fitness diet should include protein, vegetables, fruits, whole grains, healthy fats, and enough water. Your exact diet should match your fitness goal.";
    } 
    else if (q.includes("exercise") || q.includes("workout")) {
      answer =
        "A good workout routine should include a warm-up, strength or cardio exercises, and a cool-down. Start with a routine that matches your current fitness level and increase the intensity gradually.";
    } 
    else if (q.includes("calorie")) {
      answer =
        "Calories are the energy your body gets from food. Your calorie needs depend on factors such as age, body size, activity level, and fitness goals.";
    } 
    else {
      answer =
        `I understand your question: "${question}". For better fitness results, stay consistent with your workouts, maintain a balanced diet, get enough sleep, and track your progress regularly.`;
    }

    setResponse(answer);
    setLoading(false);
  }, 1000);
};


  return (

    <div className="login-page">

      {/* ================================= */}
      {/* BACKGROUND EFFECTS */}
      {/* ================================= */}

      <div className="orb orb-one"></div>

      <div className="orb orb-two"></div>

      <div className="orb orb-three"></div>


      <div className="background-grid"></div>


      {/* ================================= */}
      {/* NAVBAR */}
      {/* ================================= */}

      <header className="navbar">

        <div className="logo">

          <div className="logo-mark">
            N
          </div>

          <span>
            NEXORA
          </span>

        </div>


        <div className="navbar-status">

          <span className="status-dot"></span>

          AI FITNESS PLATFORM

        </div>

      </header>


      {/* ================================= */}
      {/* HERO */}
      {/* ================================= */}

      <main className="hero">


        {/* ================================= */}
        {/* LEFT SIDE */}
        {/* ================================= */}

        <section className="hero-left">


          <div className="eyebrow">

            <span className="eyebrow-line"></span>

            SMART FITNESS • AI POWERED

          </div>


          <h1>

            Train

            <span>
              {" "}Smarter.
            </span>

            <br />

            Become

            <span>
              {" "}Stronger.
            </span>

          </h1>


          <p className="hero-description">

            Your intelligent fitness companion.
            Track workouts, analyze performance and
            get personalized AI recommendations
            designed around your progress.

          </p>


          {/* ================================= */}
          {/* LOGIN BUTTON */}
          {/* ================================= */}

          <Button
            className="nexora-login-button"
            onClick={() => logIn()}
          >

            <span>
              LOGIN TO NEXORA
            </span>

            <span className="button-arrow">
              →
            </span>

          </Button>


          <div className="login-note">

            <span>
              🔒
            </span>

            Secure authentication with Keycloak

          </div>


          {/* ================================= */}
          {/* MINI FEATURES */}
          {/* ================================= */}

          <div className="mini-features">

            <div>

              <strong>
                AI
              </strong>

              <span>
                Insights
              </span>

            </div>


            <div>

              <strong>
                24/7
              </strong>

              <span>
                Tracking
              </span>

            </div>


            <div>

              <strong>
                100%
              </strong>

              <span>
                Personalized
              </span>

            </div>

          </div>


        </section>


        {/* ================================= */}
        {/* RIGHT VISUAL */}
        {/* ================================= */}

        <section className="hero-right">


          {/* ================================= */}
          {/* DASHBOARD CARD */}
          {/* ================================= */}

          <div className="dashboard-card">


            {/* HEADER */}

            <div className="dashboard-header">

              <div>

                <span className="small-label">
                  TODAY'S ACTIVITY
                </span>

                <h3>
                  Performance
                </h3>

              </div>


              <div className="live-badge">

                <span></span>

                LIVE

              </div>

            </div>


            {/* PERFORMANCE */}

            <div className="performance">


              <div className="score-circle">

                <div>

                  <strong>
                    84
                  </strong>

                  <small>
                    SCORE
                  </small>

                </div>

              </div>


              <div className="performance-text">

                <span>
                  Great progress
                </span>

                <strong>
                  +18.4%
                </strong>

                <small>
                  compared to last week
                </small>

              </div>

            </div>


            {/* WEEKLY ACTIVITY */}

            <div className="activity-section">

              <div className="activity-title">

                <span>
                  Weekly activity
                </span>

                <span>
                  5 / 7 days
                </span>

              </div>


              <div className="bars">

                <div className="bar day-one">
                  <span></span>
                  <small>M</small>
                </div>

                <div className="bar day-two">
                  <span></span>
                  <small>T</small>
                </div>

                <div className="bar day-three">
                  <span></span>
                  <small>W</small>
                </div>

                <div className="bar day-four">
                  <span></span>
                  <small>T</small>
                </div>

                <div className="bar day-five">
                  <span></span>
                  <small>F</small>
                </div>

                <div className="bar day-six">
                  <span></span>
                  <small>S</small>
                </div>

                <div className="bar day-seven">
                  <span></span>
                  <small>S</small>
                </div>

              </div>

            </div>


            {/* STATS */}

            <div className="dashboard-stats">

              <div>

                <span>
                  CALORIES
                </span>

                <strong>
                  2,480
                </strong>

                <small>
                  kcal
                </small>

              </div>


              <div>

                <span>
                  DISTANCE
                </span>

                <strong>
                  24.6
                </strong>

                <small>
                  km
                </small>

              </div>


              <div>

                <span>
                  WORKOUT
                </span>

                <strong>
                  5.2
                </strong>

                <small>
                  hrs
                </small>

              </div>

            </div>

          </div>


          {/* ================================= */}
          {/* NEXORA AI BUTTON */}
          {/* ================================= */}

          <button
            className="ai-card"
            onClick={() => setShowAI(true)}
          >

            <div className="ai-icon">

              ✦

            </div>


            <div className="ai-content">

              <span className="ai-title">
                NEXORA AI
              </span>

              <strong className="ai-subtitle">
                New recommendation
              </strong>

            </div>


            <div className="ai-arrow">

              →

            </div>

          </button>


          {/* ================================= */}
          {/* DECORATIVE CIRCLE */}
          {/* ================================= */}

          <div className="visual-circle">

            <div className="circle-inner"></div>

          </div>


        </section>

      </main>


      {/* ================================= */}
      {/* FOOTER */}
      {/* ================================= */}

      <footer className="footer">

        <span>
          NEXORA
        </span>

        <span>
          © 2026
        </span>

        <span>
          Track • Analyze • Improve
        </span>

      </footer>


      {/* ================================= */}
      {/* NEXORA AI MODAL */}
      {/* ================================= */}

      {showAI && (

        <div
          className="ai-modal-overlay"
          onClick={() => setShowAI(false)}
        >

          <div
            className="ai-modal"
            onClick={(e) => e.stopPropagation()}
          >


            {/* MODAL HEADER */}

            <div className="ai-modal-header">

              <div className="modal-ai-icon">
                ✦
              </div>

              <div>

                <span>
                  NEXORA AI
                </span>

                <h2>
                  Get a new recommendation
                </h2>

              </div>


              <button
                className="close-ai"
                onClick={() => setShowAI(false)}
              >
                ×
              </button>

            </div>


            {/* QUESTION */}

            <div className="ai-input-section">

              <label>
                Ask NEXORA AI anything about fitness
              </label>


              <textarea
                value={question}
                onChange={(e) =>
                  setQuestion(e.target.value)
                }
                placeholder="Example: How can I improve my running performance?"
                rows={4}
              />

            </div>


            {/* ASK BUTTON */}

            <button
              className="ask-ai-button"
              onClick={askNexoraAI}
              disabled={loading}
            >

              {loading
                ? "NEXORA AI IS THINKING..."
                : "ASK NEXORA AI"
              }

              {!loading && (
                <span>
                  →
                </span>
              )}

            </button>


            {/* RESPONSE */}

            {response && (

              <div className="ai-response">

                <div className="response-header">

                  <span>
                    ✦
                  </span>

                  <strong>
                    NEXORA AI
                  </strong>

                </div>


                <p>
                  {response}
                </p>

              </div>

            )}

          </div>

        </div>

      )}

    </div>
  );
};


// ==========================================
// MAIN APP
// ==========================================

function App() {

  const {
    token,
    tokenData,
    logIn,
    logOut
  } = useContext(AuthContext);


  const dispatch = useDispatch();


  useEffect(() => {

    if (token) {

      dispatch(
        setCredentials({
          token,
          user: tokenData
        })
      );


      localStorage.setItem(
        "token",
        token
      );

    }

  }, [token, tokenData, dispatch]);


  return (

    <Router>

      {!token ? (

        <LoginPage
          logIn={logIn}
        />

      ) : (

        <div className="app-container">


          {/* LOGOUT */}

          <div className="logout-container">

            <Button
              variant="contained"
              onClick={logOut}
            >
              LOGOUT
            </Button>

          </div>


          {/* ROUTES */}

          <Routes>


            <Route
              path="/activities"
              element={
                <ActivitiesPage />
              }
            />


            <Route
              path="/activities/:id"
              element={
                <ActivityDetail />
              }
            />


            <Route
              path="/"
              element={
                <Navigate
                  to="/activities"
                  replace
                />
              }
            />


          </Routes>

        </div>

      )}

    </Router>
  );
}


export default App;