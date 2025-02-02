import requests
users = [
  {
    "age": 27,
    "bio": "AI specialist developing innovative machine learning models.",
    "canvas_token": "canvas_token_abc123",
    "coins": 21240,
    "email": "emma.robinson@example.com",
    "first_name": "Emma",
    "interests": ["AI Research", "Technology", "Innovation", "Data Analysis"],
    "last_name": "Robinson",
    "location": "Seattle, WA",
    "phone_number": "+12025550123",
    "profession": "AI Specialist",
    "profile_image_path": "users/profiles/emma.png",
    "skills": ["Machine Learning Engineering", "Data Science", "Python Development"],
    "university": "Tech Valley University"
  },
  {
    "age": 30,
    "bio": "Creative lead focused on user-centric digital experiences.",
    "canvas_token": "canvas_token_xyz789",
    "coins": 18560,
    "email": "sophia.martinez@example.com",
    "first_name": "Sophia",
    "interests": ["Design", "Art", "Technology", "Innovation"],
    "last_name": "Martinez",
    "location": "New York, NY",
    "phone_number": "+12125550345",
    "profession": "Creative Lead",
    "profile_image_path": "users/profiles/sophia.png",
    "skills": ["UI/UX Design", "Graphic Design", "User Research"],
    "university": "Metro University"
  },
  {
    "age": 28,
    "bio": "Healthcare data scientist optimizing patient care through data-driven solutions.",
    "canvas_token": "canvas_token_def456",
    "coins": 20830,
    "email": "aisha.patel@example.com",
    "first_name": "Aisha",
    "interests": ["Healthcare", "Technology", "Public Health", "Data Analysis"],
    "last_name": "Patel",
    "location": "Chicago, IL",
    "phone_number": "+12225550456",
    "profession": "Data Scientist",
    "profile_image_path": "users/profiles/aisha.png",
    "skills": ["Data Science", "Health Informatics", "Data Visualization"],
    "university": "Global Health Institute"
  },
  {
    "age": 32,
    "bio": "Business consultant empowering startups to scale and thrive.",
    "canvas_token": "canvas_token_ghi123",
    "coins": 19420,
    "email": "maya.chen@example.com",
    "first_name": "Maya",
    "interests": ["Entrepreneurship", "Business Growth", "Startups", "Innovation"],
    "last_name": "Chen",
    "location": "Los Angeles, CA",
    "phone_number": "+13335550678",
    "profession": "Business Consultant",
    "profile_image_path": "users/profiles/maya.png",
    "skills": ["Business Strategy", "Project Management", "Operations Optimization"],
    "university": "West Coast Business School"
  },
  {
    "age": 34,
    "bio": "STEM educator promoting hands-on, innovative learning for future leaders.",
    "canvas_token": "canvas_token_jkl456",
    "coins": 17860,
    "email": "olivia.thompson@example.com",
    "first_name": "Olivia",
    "interests": ["Education", "STEM", "Innovation", "Technology"],
    "last_name": "Thompson",
    "location": "Boston, MA",
    "phone_number": "+14445550789",
    "profession": "STEM Educator",
    "profile_image_path": "users/profiles/olivia.png",
    "skills": ["STEM Education", "Curriculum Development", "Instructional Design"],
    "university": "National University of Education"
  },
  {
    "age": 29,
    "bio": "Expert in financial planning and investment strategies for startups.",
    "canvas_token": "canvas_token_mno789",
    "coins": 22030,
    "email": "isabella.ramirez@example.com",
    "first_name": "Isabella",
    "interests": ["Finance", "Investments", "Wealth Management", "Startup Growth"],
    "last_name": "Ramirez",
    "location": "Miami, FL",
    "phone_number": "+15555550910",
    "profession": "Financial Consultant",
    "profile_image_path": "users/profiles/isabella.png",
    "skills": ["Financial Planning", "Investment Management", "Corporate Finance"],
    "university": "International Business School"
  },
  {
    "age": 31,
    "bio": "Creative multimedia producer with a passion for brand storytelling.",
    "canvas_token": "canvas_token_123xyz",
    "coins": 18950,
    "email": "aria.johnson@example.com",
    "first_name": "Aria",
    "interests": ["Media Production", "Storytelling", "Marketing", "Video Editing"],
    "last_name": "Johnson",
    "location": "San Diego, CA",
    "phone_number": "+12125551234",
    "profession": "Multimedia Producer",
    "profile_image_path": "users/profiles/aria.png",
    "skills": ["Content Creation", "Video Editing", "Digital Marketing"],
    "university": "California Arts Academy"
  },
  {
    "age": 28,
    "bio": "Legal consultant specializing in intellectual property and corporate law.",
    "canvas_token": "canvas_token_456abc",
    "coins": 17040,
    "email": "fatima.ali@example.com",
    "first_name": "Fatima",
    "interests": ["Law", "Corporate Strategy", "Policy Analysis", "Mediation"],
    "last_name": "Ali",
    "location": "Cambridge, MA",
    "phone_number": "+12225551345",
    "profession": "Legal Consultant",
    "profile_image_path": "users/profiles/fatima.png",
    "skills": ["Corporate Law", "Intellectual Property", "Legal Research"],
    "university": "Harvard Law School"
  }
]

def add_users():
    headers = {
        "X-API-Key": "dvrocks",
        "Content-Type": "application/json"
    }
    for user in users:
        try:
            response = requests.post("https://t76o3w4uot5gt3ebqio6u4b7jm0nvwfg.lambda-url.us-east-1.on.aws/api/v1/users", json=user, headers=headers)
            response.raise_for_status()  # Raise an exception for HTTP errors
            print(f"Successfully added user: {user['email']}")
        except requests.exceptions.RequestException as e:
            print(f"Failed to add user: {user['email']}\nError: {e}")

add_users()