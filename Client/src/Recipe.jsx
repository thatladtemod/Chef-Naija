import ReactMarkdown from "react-markdown"

export default function Recipe(props) {
    return (
      <section className="recipe">
        <div className="recipe-container">
          <ReactMarkdown>{props.recipe}</ReactMarkdown>
        </div>
      </section>
    );
}