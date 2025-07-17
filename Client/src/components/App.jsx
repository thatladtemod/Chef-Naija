import Header from "./Header";
import Hero from "./Hero";
import Footer from "./Footer";
import Recipe from "./Recipe";
import { useState } from "react";

export default function App() {
  const [recipe, setRecipe] = useState("Your recipe will appear here!");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  async function getRecipe(formData) {
    const delicacy = formData.get("delicacy");
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_CHEF_NAIJA}/api/recipe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ food: delicacy }),
        }
      );

      console.log(response);

      const data = await response.json();

      // Update state to show the result
      if (data.recipe) {
        setRecipe(data.recipe);
      } else {
        setRecipe(data.error);
      }
    } catch (error) {
      if (error) {
        setRecipe(`Sorry, something went wrong.`);
      }
    } finally {
      setLoading(false);
      setShow(false);
    }
  }
  return (
    <>
      <div className="wrapper">
        <Header />
        <main>
          <Hero getRecipe={getRecipe} loading={loading} show={show} />
          <Recipe recipe={recipe} loading={loading} />
        </main>
        <Footer />
      </div>
    </>
  );
}
