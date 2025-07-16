export default function Hero(props) {

  function getRecipe(event) {
    event.preventDefault()
    const formData = new FormData(event.target)

    props.getRecipe(formData)

    event.target.reset()
  }

  return (
    <section className="hero">
      <div className="intro">
        <h1 className="intro-heading">Discover Authentic Nigerian Flavours</h1>
        <p className="intro-description">
          From jollof rice to egusi soup, learn how to cook traditional Nigerian
          dishes with step by step guidance from Chef Naija
        </p>
      </div>
      <form onSubmit={getRecipe} className="form">
        <input
          type="text"
          name="delicacy"
          placeholder="What are we cooking today..."
          className="form-input"
        />
        {props.loading ? (
          < button className="form-button" disabled>Cooking... 🔥</button>
        ) : (
        < button className="form-button">Get Recipe 👨🏾‍🍳</button>
        )}
      </form>
    </section>
  );
}
