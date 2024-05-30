import { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Shepherd from "shepherd.js";
import "shepherd.js/dist/css/shepherd.css";

function MainSection() {
  const [publicFigure, setPublicFigure] = useState("kp oli");
  const [newsText, setNewsText] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sentimentResult, setSentimentResult] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const tour = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        classes: "shepherd-theme-arrows",
        scrollTo: true,
        cancelIcon: {
          enabled: true,
        },
        canClickTarget: false,
      },
    });

    // Add steps to the tour
    const steps = [
      {
        id: "intro",
        text: `
        <div class="text-center">
          <h2 class="text-2xl font-bold mb-2">Welcome to Sentiment Analysis</h2>
          <p class="mb-4">Let's explore the features of this page.</p>
        </div>
      `,
        attachTo: {
          element: ".header",
          on: "bottom",
        },
        buttons: [
          {
            text: "Next",
            action: tour.next,
          },
        ],
      },
      {
        id: "input",
        text: `
        <div class="text-center">
          <h2 class="text-xl font-bold mb-2">Enter a Keyword</h2>
          <p class="mb-4">Type a keyword to analyze sentiment.</p>
        </div>
      `,
        attachTo: {
          element: "#keyword",
          on: "top",
        },
        buttons: [
          {
            text: "Next",
            action: tour.next,
          },
        ],
      },
      {
        id: "submit",
        text: `
        <div class="text-center">
          <h2 class="text-xl font-bold mb-2">Submit</h2>
          <p class="mb-4">Click this button to see the result.</p>
        </div>
      `,
        attachTo: {
          element: "button[type='submit']",
          on: "top",
        },
        buttons: [
          {
            text: "Next",
            action: tour.next,
          },
        ],
      },
      {
        id: "result",
        text: `
        <div class="text-center">
          <h2 class="text-xl font-bold mb-2">Sentiment Result</h2>
          <p class="mb-4">Here you can see the sentiment analysis result.</p>
        </div>
      `,
        attachTo: {
          element: ".result",
          on: "top",
        },
        buttons: [
          {
            text: "Next",
            action: tour.next,
          },
        ],
      },
      {
        id: "charts",
        text: `
        <div class="text-center">
          <h2 class="text-xl font-bold mb-2">Visual Charts</h2>
          <p class="mb-4">View the sentiment data in Bar and Pie charts.</p>
        </div>
      `,
        attachTo: {
          element: ".charts",
          on: "top",
        },
        buttons: [
          {
            text: "Next",
            action: tour.next,
          },
        ],
      },
      {
        id: "news-categories",
        text: `
        <div class="text-center">
          <h2 class="text-xl font-bold mb-2">News Categories</h2>
          <p class="mb-4">Filter news based on sentiment categories.</p>
        </div>
      `,
        attachTo: {
          element: ".news-categories",
          on: "top",
        },
        buttons: [
          {
            text: "Finish",
            action: tour.complete,
          },
        ],
      },
    ];

    // Add steps to the tour
    steps.forEach((step) => {
      tour.addStep(step);
    });

    // Start the tour
    tour.start();

    return () => {
      // Clean up the tour when the component unmounts
      tour.complete();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setKeyword("");

    // api
    try {
      const response = await fetch("http://localhost:3000/api/v1/model", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          keyword,
        }),
      });
      console.log("here");
      const data = await response.json();
      console.log(data);
      if (Object.keys(data).length === 0) {
        console.warn("Empty response from the backend.");
        // Handle the case when the backend returns an empty response
        // For example, you can set a message or keep the existing data
      } else {
        setSentimentResult(data.Sentiment);
        setNewsText(data.Title);
      }
    } catch (error) {
      console.error("Error analyzing sentiment:", error);
    }
  };

  // Calculate sentiment data
  const calculateSentimentData = () => {
    return [
      {
        name: "Negative",
        value: sentimentResult
          ? Object.values(sentimentResult).filter(
              (score) => score > 0 && score <= 0.55
            ).length
          : 0,
      },
      {
        name: "Neutral",
        value: sentimentResult
          ? Object.values(sentimentResult).filter(
              (score) => score > 0.55 && score <= 0.8
            ).length
          : 0,
      },
      {
        name: "Positive",
        value: sentimentResult
          ? Object.values(sentimentResult).filter((score) => score > 0.8).length
          : 0,
      },
    ];
  };

  // Prepare data for PieChart and BarChart
  const sentimentData = calculateSentimentData();

  // Colors for PieChart and BarChart
  const COLORS = ["#FF5733", "#82ca9d", "#4299E1"];

  const categorizeNews = () => {
    const categorizedNews = {
      positive: [],
      negative: [],
      neutral: [],
    };
    Object.entries(newsText).forEach(([index, title]) => {
      const sentimentScore = sentimentResult[index];
      if (sentimentScore <= 0.55) {
        categorizedNews.negative.push({ index, title });
      } else if (sentimentScore > 0.55 && sentimentScore <= 0.8) {
        categorizedNews.neutral.push({ index, title });
      } else {
        categorizedNews.positive.push({ index, title });
      }
    });

    return categorizedNews;
  };

  // Filtered news based on selected category
  const filteredNews =
    selectedCategory === "all" ? newsText : categorizeNews()[selectedCategory];

  // Function to get background color based on category
  const getCategoryColor = (category) => {
    switch (category) {
      case "positive":
        return "#82ca9d"; // Green
      case "neutral":
        return "#FFD700"; // Yellow
      case "negative":
        return "#FF5733"; // Red
      default:
        return "#FFFFFF"; // White
    }
  };

  //input part
  return (
    <div className="flex flex-col">
      <Header className="header" />
      <div className="mx-32 mt-10 min-h-screen">
        <div className="bg-white">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            Sentiment Analysis
          </h1>
          <span className="text-gray-400">
            What's the sentiment of the media coverage on public figure?
          </span>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="keyword">
                Enter a Keyword
              </label>
              <input
                type="text"
                id="keyword"
                name="keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g., government uml rsp"
                style={{
                  maxWidth: "450px",
                  height: "3.5rem",
                }}
                className="w-full border rounded-2xl px-3 py-2 outline-none"
              />
            </div>
            <button
              type="submit"
              style={{
                maxWidth: "450px",
              }}
              className="w-full bg-blue-600 text-white py-2 rounded-2xl hover:bg-green-600"
            >
              See Result
            </button>
          </form>

          {sentimentResult && (
            <div className="mt-16 result">
              <h2 className="text-4xl font-bold mb-4 text-gray-800">Result</h2>
              <ul>
                {Object.values(sentimentResult).map((score, index) => {
                  let sentiment;
                  if (score < 0) {
                    sentiment = "Negative";
                  } else if (score >= 0 && score <= 0.5) {
                    sentiment = "Neutral";
                  } else {
                    sentiment = "Positive";
                  }
                })}
              </ul>
              {/* output result part */}
              <div className=" flex ">
                <table>
                  <thead>
                    <tr>
                      <th
                        className="bg-red-500 p-4 rounded-tl-3xl rounded-tr-3xl text-center"
                        style={{ width: "150px" }}
                      >
                        Negative
                      </th>
                      <th
                        className="bg-yellow-500 p-4 rounded-tl-3xl rounded-tr-3xl  text-center"
                        style={{ width: "150px" }}
                      >
                        Neutral
                      </th>
                      <th
                        className="bg-blue-500 p-4 rounded-tl-3xl rounded-tr-3xl text-center"
                        style={{ width: "150px" }}
                      >
                        Positive
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="bg-red-300 p-4 text-center">
                        {sentimentData[0].value}
                      </td>
                      <td className="bg-yellow-300 p-4 text-center">
                        {sentimentData[1].value}
                      </td>
                      <td className="bg-blue-300 p-4 text-center">
                        {sentimentData[2].value}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Bard Chart */}
              <div className="flex mt-12">
                <div
                  className="mt-12"
                  style={{ width: "80%", padding: "10px" }}
                >
                  <h1 className="text-4xl font-bold mb-4 text-gray-800 ml-60">
                    Bar Chart
                  </h1>
                  <BarChart width={600} height={250} data={sentimentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </div>

                {/* pi Chart  */}
                <div
                  className="mt-12"
                  style={{ width: "80%", padding: "10px" }}
                >
                  <h1 className="text-4xl font-bold mb-4 text-gray-800 ml-52">
                    Pie Chart
                  </h1>
                  <PieChart width={600} height={250}>
                    <Pie
                      data={sentimentData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius="100%"
                      fill="#8884d8"
                      label
                    >
                      {sentimentData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </div>
              </div>
            </div>
          )}
          <div>
            <h1 className="text-4xl font-bold mb-4 text-gray-800 text-center mt-32">
              Would you like to see heading ??
            </h1>
          </div>
          <div className="mt-8 justify-center flex space-x-8 gap-11">
            {/* Buttons for sentiment categories */}
            <button
              id="positiveButton"
              onClick={() => setSelectedCategory("positive")}
              className="text-xl font-bold px-4 py-2 rounded-lg bg-green-500 text-white focus:outline-none hover:bg-green-600 text-gree"
            >
              Positive News
            </button>
            <button
              onClick={() => setSelectedCategory("neutral")}
              className="text-xl font-bold px-4 py-2 rounded-lg bg-yellow-500 text-white focus:outline-none hover:bg-yellow-600"
            >
              Neutral News
            </button>
            <button
              onClick={() => setSelectedCategory("negative")}
              className="text-xl font-bold px-4 py-2 rounded-lg bg-red-500 text-white focus:outline-none hover:bg-red-600"
            >
              Negative News
            </button>
          </div>

          {filteredNews && (
            <div className="mt-4 border border-gray-200 rounded p-4 justify-center">
              {/* Display filtered news articles */}
              <ul>
                {filteredNews.map((article, index) => (
                  <li
                    key={index}
                    className="mb-2"
                    style={{
                      backgroundColor: getCategoryColor(selectedCategory),
                      padding: "8px",
                      borderRadius: "5px",
                    }}
                  >
                    <span className="font-bold">{index + 1}:</span>{" "}
                    {article.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MainSection;
