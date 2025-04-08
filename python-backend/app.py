from flask import Flask, request, jsonify
from flask_cors import CORS
from scraper.linkedin_scraper import scrape_linkedin_profile

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/generate-cv', methods=['POST'])
def generate_cv():
    data = request.get_json()
    linkedin_url = data.get('linkedin_url')

    if not linkedin_url:
        return jsonify({'error': 'LinkedIn URL is required'}), 400

    try:
        profile_data = scrape_linkedin_profile(linkedin_url)
        return jsonify({'cv_data': profile_data})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
