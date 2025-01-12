from flask import Flask, request, jsonify, render_template
import mysql.connector
from datetime import datetime

app = Flask(__name__)

# Database configuration
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="mishtimattu",
    database="CommunityPage"
)
cursor = db.cursor(dictionary=True)

# Route: Submit a new complaint
@app.route('/complaint', methods=['POST'])
def submit_complaint():
    try:
        # Log raw request data
        print("Raw Request Data:", request.data)
        
        # Ensure JSON parsing is handled
        data = request.get_json(force=True, silent=True)
        if not data:
            print("Error: Missing or invalid JSON payload")
            return jsonify({'error': 'Invalid or missing JSON in request'}), 400

        # Debug: Print parsed JSON
        print("Parsed JSON Data:", data)

        # Extract and validate fields
        required_fields = ['title', 'description', 'category', 'location', 'latitude', 'longitude', 'photo_url', 'userID']
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            print(f"Missing fields: {missing_fields}")
            return jsonify({'error': f'Missing required fields: {", ".join(missing_fields)}'}), 400

        title = data['title']
        description = data['description']
        category = data['category']
        location = data['location']
        latitude = data['latitude']
        longitude = data['longitude']
        photo_url = data['photo_url']
        userID = data['userID']

        # Insert into database
        query = """
            INSERT INTO Complaints (title, description, category, location, latitude, longitude, photo_url, userID)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """
        values = (title, description, category, location, latitude, longitude, photo_url, userID)
        cursor.execute(query, values)
        db.commit()

        return jsonify({'message': 'Complaint submitted successfully!'}), 201

    except Exception as e:
        print("Error:", str(e))  # Log for debugging
        return jsonify({'error': str(e)}), 500

# Route: Get all complaints
@app.route('/complaints', methods=['GET'])
def get_complaints():
    cursor.execute("SELECT * FROM Complaints ORDER BY date_reported DESC")
    complaints = cursor.fetchall()
    return jsonify(complaints)

# Route: Upvote/Downvote a complaint
@app.route('/complaint/vote', methods=['POST'])
def vote_complaint():
    try:
        # Log raw request data
        print("Raw Request Data:", request.data)

        # Parse JSON data from the request
        data = request.get_json(force=True, silent=True)
        if not data:
            print("Error: Invalid or missing JSON payload")
            return jsonify({'error': 'Invalid or missing JSON payload'}), 400

        # Debug: Log parsed JSON
        print("Parsed JSON Data:", data)

        # Validate required fields
        required_fields = ['complaintID', 'vote_type']
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            print(f"Missing fields: {missing_fields}")
            return jsonify({'error': f'Missing required fields: {", ".join(missing_fields)}'}), 400

        # Extract data
        complaintID = data['complaintID']
        vote_type = data['vote_type']  # 'upvote' or 'downvote'

        # Update database
        if vote_type == 'upvote':
            query = "UPDATE Complaints SET upvotes = upvotes + 1 WHERE complaintID = %s"
        elif vote_type == 'downvote':
            query = "UPDATE Complaints SET downvotes = downvotes + 1 WHERE complaintID = %s"
        else:
            print("Error: Invalid vote type")
            return jsonify({'error': 'Invalid vote type!'}), 400

        # Execute the query
        cursor.execute(query, (complaintID,))
        db.commit()

        return jsonify({'message': 'Vote recorded successfully!'}), 200

    except Exception as e:
        print("Error:", str(e))  # Log for debugging
        return jsonify({'error': str(e)}), 500

# Route: Post a comment on a complaint
@app.route('/complaint/comment', methods=['POST'])
def add_comment():
    data = request.json
    complaintID = data['complaintID']
    userID = data['userID']
    comment_text = data['comment_text']

    query = "INSERT INTO Comments (complaintID, userID, comment_text) VALUES (%s, %s, %s)"
    values = (complaintID, userID, comment_text)
    cursor.execute(query, values)
    db.commit()

    return jsonify({'message': 'Comment added successfully!'})

# Route: Fetch comments for a complaint
@app.route('/complaint/<int:complaintID>/comments', methods=['GET'])
def get_comments(complaintID):
    try:
        # Updated query without ORDER BY clause
        query = "SELECT * FROM Comments WHERE complaintID = %s"
        cursor.execute(query, (complaintID,))
        comments = cursor.fetchall()
        return jsonify(comments)
    except Exception as e:
        print(f"Error fetching comments: {e}")
        return jsonify({'error': 'Failed to fetch comments', 'details': str(e)}), 500


# Route: Get announcements
@app.route('/announcements', methods=['GET'])
def get_announcements():
    cursor.execute("SELECT * FROM Announcements ORDER BY created_at DESC")
    announcements = cursor.fetchall()
    return jsonify(announcements)

# Route: Get issues for the user (previously reported)
@app.route('/user/<int:userID>/issues', methods=['GET'])
def get_user_issues(userID):
    query = "SELECT * FROM Complaints WHERE userID = %s ORDER BY date_reported DESC"
    cursor.execute(query, (userID,))
    issues = cursor.fetchall()
    return jsonify(issues)
@app.route('/dbtest')
def test_db():
    try:
        cursor.execute("SELECT DATABASE()")
        db_name = cursor.fetchone()
        return f"Connected to the database: {db_name['DATABASE()']}"
    except Exception as e:
        return f"Database connection error: {str(e)}"
if __name__ == '_main_':
    app.run(debug=True)
