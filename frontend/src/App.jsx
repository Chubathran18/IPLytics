import { useState } from "react";
import axios from "axios";

import cskLogo from "./images/csk.png";
import miLogo from "./images/mi.png";
import rcbLogo from "./images/rcb.png";
import kkrLogo from "./images/kkr.png";
import rrLogo from "./images/rr.png";
import pbksLogo from "./images/pbks.png";
import dcLogo from "./images/dc.png";
import srhLogo from "./images/srh.png";
import lsgLogo from "./images/lsg.png";
import gtLogo from "./images/gt.png";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function App() {

  // ====================================
  // STATES
  // ====================================

  const [battingTeam, setBattingTeam] = useState("");
  const [bowlingTeam, setBowlingTeam] = useState("");
  const [venue, setVenue] = useState("");
  const [tossWinner, setTossWinner] = useState("");
  const [tossDecision, setTossDecision] = useState("");

  const [prediction, setPrediction] = useState("");

  const [winProbability, setWinProbability] = useState(0);

  const [loading, setLoading] = useState(false);

  // ====================================
  // TEAMS
  // ====================================

  const teams = [
    "Chennai Super Kings",
    "Mumbai Indians",
    "Royal Challengers Bengaluru",
    "Kolkata Knight Riders",
    "Rajasthan Royals",
    "Punjab Kings",
    "Delhi Capitals",
    "Sunrisers Hyderabad",
    "Lucknow Super Giants",
    "Gujarat Titans"
  ];

  // ====================================
  // TEAM LOGOS
  // ====================================

  const teamLogos = {
    "Chennai Super Kings": cskLogo,
    "Mumbai Indians": miLogo,
    "Royal Challengers Bengaluru": rcbLogo,
    "Kolkata Knight Riders": kkrLogo,
    "Rajasthan Royals": rrLogo,
    "Punjab Kings": pbksLogo,
    "Delhi Capitals": dcLogo,
    "Sunrisers Hyderabad": srhLogo,
    "Lucknow Super Giants": lsgLogo,
    "Gujarat Titans": gtLogo
  };

  // ====================================
  // VENUES
  // ====================================

  const momentumData = [
  {
    team: "GT",
    momentum: 92
  },
  {
    team: "CSK",
    momentum: 88
  },
  {
    team: "RCB",
    momentum: 82
  },
  {
    team: "MI",
    momentum: 79
  },
  {
    team: "RR",
    momentum: 75
  }
];

  const venues = [
    "Wankhede Stadium",
    "M Chinnaswamy Stadium",
    "Eden Gardens",
    "MA Chidambaram Stadium",
    "Narendra Modi Stadium"
  ];

  // ====================================
  // PREDICT FUNCTION
  // ====================================

  const predictWinner = async () => {

    try {

      setLoading(true);

      setPrediction("");

      setWinProbability(0);

      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        {
          batting_team: battingTeam.trim(),
          bowling_team: bowlingTeam.trim(),
          venue: venue.trim(),
          toss_winner: tossWinner.trim(),
          toss_decision: tossDecision.trim()
        }
      );

      setTimeout(() => {

        setPrediction(
          response.data.predicted_winner
        );

        setWinProbability(
          response.data.win_probability
        );

        setLoading(false);

      }, 2500);

    } catch (error) {

      console.log(error);

      setLoading(false);

      alert("Prediction Failed");
    }
  };

  // ====================================
  // UI
  // ====================================

  return (

    <div className="min-h-screen bg-[#060816] text-white flex items-center justify-center px-6 py-6 relative overflow-x-hidden">

      {/* Background Glow */}

      <div className="absolute w-[400px] h-[400px] bg-orange-500/20 blur-[120px] rounded-full top-[-120px] left-[-120px]" />

      <div className="absolute w-[400px] h-[400px] bg-blue-500/20 blur-[120px] rounded-full bottom-[-120px] right-[-120px]" />

      {/* Main Container */}

      <div className="relative z-10 w-full max-w-5xl py-6">

        {/* Header */}

        <div className="text-center mb-8">

          <h1 className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-orange-400 via-white to-blue-500 bg-clip-text text-transparent">

            IPLytics

          </h1>

          <p className="mt-3 text-gray-400 text-lg font-medium">

            AI-Powered IPL 2026 Prediction Intelligence Platform

          </p>

        </div>

        {/* Matchup Hero */}

        {
          battingTeam && bowlingTeam && (

            <div className="mb-8 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[32px] p-6 shadow-2xl">

              <div className="flex items-center justify-center gap-10 flex-wrap">

                {/* Batting Team */}

                <div className="flex flex-col items-center">

                  <img
                    src={teamLogos[battingTeam]}
                    alt={battingTeam}
                    className="w-28 h-28 object-contain drop-shadow-[0_0_25px_rgba(255,165,0,0.5)]"
                  />

                  <p className="mt-3 font-bold text-lg text-center">

                    {battingTeam}

                  </p>

                </div>

                {/* VS */}

                <div className="text-3xl md:text-3xl md:text-5xl font-black bg-gradient-to-r from-orange-400 to-blue-500 bg-clip-text text-transparent">

                  VS

                </div>

                {/* Bowling Team */}

                <div className="flex flex-col items-center">

                  <img
                    src={teamLogos[bowlingTeam]}
                    alt={bowlingTeam}
                    className="w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-[0_0_25px_rgba(59,130,246,0.5)]"
                  />

                  <p className="mt-3 font-bold text-lg text-center">

                    {bowlingTeam}

                  </p>

                </div>

              </div>

            </div>
          )
        }

        {/* Main Card */}

        <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[32px] shadow-2xl p-5 md:p-7">

          {/* Grid */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Batting Team */}

            <div>

              <label className="block mb-2 text-orange-400 font-semibold text-base">

                Batting Team

              </label>

              <select
                value={battingTeam}
                onChange={(e) => setBattingTeam(e.target.value)}
                className="w-full bg-[#0f172a] border border-gray-700 text-white p-4 rounded-2xl outline-none focus:border-orange-400 transition-all duration-300"
              >

                <option className="bg-[#0f172a]" value="">
                  Select Team
                </option>

                {
                  teams.map((team) => (
                    <option
                      key={team}
                      value={team}
                      className="bg-[#0f172a]"
                    >
                      {team}
                    </option>
                  ))
                }

              </select>

            </div>

            {/* Bowling Team */}

            <div>

              <label className="block mb-2 text-blue-400 font-semibold text-base">

                Bowling Team

              </label>

              <select
                value={bowlingTeam}
                onChange={(e) => setBowlingTeam(e.target.value)}
                className="w-full bg-[#0f172a] border border-gray-700 text-white p-4 rounded-2xl outline-none focus:border-blue-400 transition-all duration-300"
              >

                <option className="bg-[#0f172a]" value="">
                  Select Team
                </option>

                {
                  teams.map((team) => (
                    <option
                      key={team}
                      value={team}
                      className="bg-[#0f172a]"
                    >
                      {team}
                    </option>
                  ))
                }

              </select>

            </div>

            {/* Venue */}

            <div>

              <label className="block mb-2 text-orange-400 font-semibold text-base">

                Venue

              </label>

              <select
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="w-full bg-[#0f172a] border border-gray-700 text-white p-4 rounded-2xl outline-none focus:border-orange-400 transition-all duration-300"
              >

                <option className="bg-[#0f172a]" value="">
                  Select Venue
                </option>

                {
                  venues.map((venue) => (
                    <option
                      key={venue}
                      value={venue}
                      className="bg-[#0f172a]"
                    >
                      {venue}
                    </option>
                  ))
                }

              </select>

            </div>

            {/* Toss Winner */}

            <div>

              <label className="block mb-2 text-blue-400 font-semibold text-base">

                Toss Winner

              </label>

              <select
                value={tossWinner}
                onChange={(e) => setTossWinner(e.target.value)}
                className="w-full bg-[#0f172a] border border-gray-700 text-white p-4 rounded-2xl outline-none focus:border-blue-400 transition-all duration-300"
              >

                <option className="bg-[#0f172a]" value="">
                  Select Toss Winner
                </option>

                {
                  teams.map((team) => (
                    <option
                      key={team}
                      value={team}
                      className="bg-[#0f172a]"
                    >
                      {team}
                    </option>
                  ))
                }

              </select>

            </div>

            {/* Toss Decision */}

            <div className="md:col-span-2">

              <label className="block mb-2 text-orange-400 font-semibold text-base">

                Toss Decision

              </label>

              <select
                value={tossDecision}
                onChange={(e) => setTossDecision(e.target.value)}
                className="w-full bg-[#0f172a] border border-gray-700 text-white p-4 rounded-2xl outline-none focus:border-orange-400 transition-all duration-300"
              >

                <option className="bg-[#0f172a]" value="">
                  Select Decision
                </option>

                <option className="bg-[#0f172a]" value="bat">
                  Bat First
                </option>

                <option className="bg-[#0f172a]" value="field">
                  Field First
                </option>

              </select>

            </div>

          </div>

          {/* Predict Button */}

          <div className="flex justify-center mt-8">

            <button
              onClick={predictWinner}
              className="px-8 md:px-12 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-blue-600 font-bold text-lg tracking-wide shadow-lg shadow-orange-500/20 hover:scale-105 hover:shadow-orange-500/40 transition-all duration-300"
            >

              Predict Winner 🚀

            </button>

          </div>

          {/* AI Loading */}

          {
            loading && (

              <div className="mt-8 bg-white/5 border border-white/10 rounded-3xl p-8 text-center animate-pulse">

                <div className="flex justify-center mb-5">

                  <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>

                </div>

                <h2 className="text-2xl font-bold text-orange-400">

                  Analyzing Match Intelligence...

                </h2>

                <p className="mt-3 text-gray-400">

                  Processing team momentum, player form and venue analytics

                </p>

              </div>
            )
          }

          {/* Prediction Result */}

          {
            prediction && !loading && (

              <div className="mt-8 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-400/20 rounded-3xl p-8 text-center shadow-2xl shadow-green-500/10">

                <h2 className="text-xl text-green-400 font-bold uppercase tracking-widest mb-4">

                  Predicted Winner

                </h2>

                <p className="text-3xl md:text-5xl font-black">

                  {prediction}

                </p>

                {/* Probability */}

                <div className="mt-8">

                  <div className="flex justify-between text-sm text-gray-300 mb-2">

                    <span>AI Confidence</span>

                    <span>{winProbability}%</span>

                  </div>

                  <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden">

                    <div
                      className="h-full bg-gradient-to-r from-orange-400 to-blue-500 rounded-full transition-all duration-[2500ms]"
                      style={{
                        width: `${winProbability}%`
                      }}
                    />

                  </div>

                </div>

                <p className="mt-6 text-gray-400 text-lg">

                  AI Prediction Engine Completed Match Analysis Successfully

                </p>

              </div>

            )
          }

        </div>
        {/* ==================================== */}
{/* ANALYTICS DASHBOARD */}
{/* ==================================== */}

<div className="mt-10">

  {/* Dashboard Heading */}

  <div className="mb-6">

    <h2 className="text-4xl md:text-4xl font-black bg-gradient-to-r from-orange-400 to-blue-500 bg-clip-text text-transparent">

      Analytics Dashboard

    </h2>

    <p className="text-gray-400 mt-2">

      AI-powered team intelligence and momentum analytics

    </p>

  </div>

  {/* Dashboard Grid */}



  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

    {/* Top Ranked Team */}

    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-xl hover:scale-[1.02] transition-all duration-300">

      <p className="text-orange-400 text-sm uppercase tracking-widest font-bold">

        Top Ranked Team

      </p>

      <h3 className="mt-4 text-3xl font-black">

        Gujarat Titans

      </h3>

      <p className="mt-3 text-gray-400">

        Highest NTPI score based on historical dominance and recent momentum.

      </p>

    </div>

    

    {/* Momentum Leader */}

    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-xl hover:scale-[1.02] transition-all duration-300">

      <p className="text-blue-400 text-sm uppercase tracking-widest font-bold">

        Momentum Leader

      </p>

      <h3 className="mt-4 text-3xl font-black">

        Chennai Super Kings

      </h3>

      <p className="mt-3 text-gray-400">

        Strong recent player form and batting consistency indicators.

      </p>

    </div>

    {/* AI Insight */}

    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-xl hover:scale-[1.02] transition-all duration-300">

      <p className="text-green-400 text-sm uppercase tracking-widest font-bold">

        AI Insight

      </p>

      <h3 className="mt-4 text-3xl font-black">

        Venue Impact

      </h3>

      <p className="mt-3 text-gray-400">

        Teams batting first at spin-friendly venues show stronger win probability patterns.

      </p>

    </div>

  </div>

</div>
{/* Momentum Chart */}

<div className="mt-10 bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl">

  <div className="mb-6">

    <h3 className="text-3xl font-black bg-gradient-to-r from-orange-400 to-blue-500 bg-clip-text text-transparent">

      Team Momentum Analytics

    </h3>

    <p className="text-gray-400 mt-2">

      AI-generated momentum intelligence based on recent form and team consistency

    </p>

  </div>

  {/* Chart */}

  <div className="w-full h-[250px] md:h-[350px]">

    <ResponsiveContainer width="100%" height="100%">

      <BarChart data={momentumData}>

        <XAxis
          dataKey="team"
          stroke="#9CA3AF"
        />

        <YAxis
          stroke="#9CA3AF"
        />

        <Tooltip
          contentStyle={{
            backgroundColor: "#0f172a",
            border: "none",
            borderRadius: "16px",
            color: "white"
          }}
        />

        <Bar
          dataKey="momentum"
          radius={[12, 12, 0, 0]}
          fill="url(#colorGradient)"
        />

        {/* Gradient */}

        <defs>

          <linearGradient
            id="colorGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >

            <stop
              offset="0%"
              stopColor="#fb923c"
            />

            <stop
              offset="100%"
              stopColor="#3b82f6"
            />

          </linearGradient>

        </defs>

      </BarChart>

    </ResponsiveContainer>

  </div>

</div>

      </div>

    </div>
  );
}

export default App;