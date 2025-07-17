from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import  load_dotenv
import os
import cohere

app = Flask(__name__)
CORS(app)  # Allow requests from React frontend

load_dotenv()

chef_naija_api = os.getenv("CHEF_NAIJA_API_KEY")

ai = cohere.Client(chef_naija_api)

@app.route("/api/recipe", methods=["POST"])
def get_recipe():
    try:
        data = request.get_json()
        food_name = data.get("food", "").strip()

        if not food_name:
            return jsonify({"error": "Food name is required"}), 400

        # 💡 Call OpenAI to generate a recipe
        prompt = f"You are Chef-Naija, a warm and experienced Nigerian cooking assistant. I want to cook a Nigerian dish: {food_name}.\
            Respond in a clear and friendly tone, like you're teaching family or a neighbor. \
            First, determine if the dish name refers to a valid, safe, and edible Nigerian meal. If it is a proper Nigerian dish, follow the structure below: \
            1. Dish Name : Confirm the name of the dish (include regional name variations if any). \
            2. Ingredients List : Provide all commonly used ingredients, with accurate local names (e.g., crayfish, uziza, palm oil). Use bullet points. \
            3. Step-by-Step Instructions : Explain how to prepare the dish in simple, numbered steps. Use relatable Nigerian kitchen language and techniques (e.g., “fry until it bleeds oil”, “pound the yam”, “add maggi”).\
            4. Helpful Tips : Share tips for making the dish taste better, common mistakes to avoid, or regional versions (e.g., Yoruba, Igbo, Efik styles). \
            5. Serving Suggestions : Optionally recommend what to serve the dish with (e.g., Amala, Eba, rice, zobo, moi-moi). \
            If the user input is not a recognizable Nigerian dish (e.g., a chemical, joke, or non-food term like “crude oil” or “gasoline”), reply kindly and say: \
            'I couldn't find a Nigerian meal by that name'\
            Always maintain a cheerful and encouraging Nigerian tone. End your response with a friendly sign-off like: \
            - 'Enjoy your chow with family and padi dem' \
            - 'Omo, this food go too sweet!' \
            Return your response in markdown so it is easier to render on a web page."

        response = ai.generate(
            model="command-r-plus", 
            prompt = prompt,
            temperature=0.7
        )

        generated_recipe = response.generations[0].text.strip()

        return jsonify({"recipe": generated_recipe})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
