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
        prompt = f"You are a friendly cooking assistant and I want you to give me a detailed, authentic Nigerian recipe for {food_name}. \
            Include ingredients and step-by-step instructions.Format your response in markdown to make it easier to render to a web page."

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
