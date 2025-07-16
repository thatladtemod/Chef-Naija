export default function Hero(props) {

  return (
    <section className="hero">
      <div className="intro">
        <h1 className="intro-heading">Discover Authentic Nigerian Flavours</h1>
        <p className="intro-description">
          From jollof rice to egusi soup, learn how to cook traditional Nigerian
          dishes with step by step guidance from Chef Naija
        </p>
      </div>
      <form action={props.getRecipe} className="form">
        <input
          type="text"
          name="delicacy"
          placeholder="What are we cooking today..."
          className="form-input"
        />
        <button className="form-button">Get Recipe</button>
      </form>
    </section>
  );
}
