import ReactMarkdown from "react-markdown";

export default function Recipe(props) {
  return (
    <section className="recipe">
      <div className="recipe-container">
        {props.loading ? (
          <p>
            Your recipe is cooking
            <span className="loading"></span>
          </p>
        ) : (
          <ReactMarkdown>{props.recipe}</ReactMarkdown>
        )}
      </div>
    </section>
  );
}
