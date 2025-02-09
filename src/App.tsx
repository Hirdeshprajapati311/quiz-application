import { useEffect, useState } from "react";
import Quiz from "./Quiz"
import { Question } from "./utility/types";
import "./index.scss";





const App: React.FC = () => {

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch("https://api.allorigins.win/raw?url=https://api.jsonserve.com/Uw5CrX");

        if (!response.ok) throw new Error('Failed to fetch the quiz data!..');

        const data = await response.json();
        console.log("Fetched data:", data);
        setQuestions(data.questions || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
  
      } finally {
        setLoading(false);
      }
    };
    fetchQuizData();
  }, []);
  
  if (loading) return <div> Loading quiz...</div>;
  if (error) return <div> {error} </div>;


  return <Quiz questions={questions}></Quiz>
}

export default App;
