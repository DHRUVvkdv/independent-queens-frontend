import requests
users = [
  {
    "email": "emma.robinson@example.com",
    "password": "Dhruv@12",
    "first_name": "Emma",
    "last_name": "Robinson",
    "age": 27,
    "profession": "AI Specialist",
    "skills": ["Machine Learning Engineering", "Data Science", "Python Development"],
    "interests": ["AI Research", "Technology", "Innovation", "Data Analysis"],
    "university": "Tech Valley University"
  },
  {
    "email": "sophia.martinez@example.com",
 "password": "Dhruv@12",
    "first_name": "Sophia",
    "last_name": "Martinez",
    "age": 30,
    "profession": "Creative Lead",
    "skills": ["UI/UX Design", "Graphic Design", "User Research"],
    "interests": ["Design", "Art", "Technology", "Innovation"],
    "university": "Metro University"
  },
  {
    "email": "aisha.patel@example.com",
 "password": "Dhruv@12",
    "first_name": "Aisha",
    "last_name": "Patel",
    "age": 28,
    "profession": "Data Scientist",
    "skills": ["Data Science", "Health Informatics", "Data Visualization"],
    "interests": ["Healthcare", "Technology", "Public Health", "Data Analysis"],
    "university": "Global Health Institute"
  },
  {
    "email": "maya.chen@example.com",
 "password": "Dhruv@12",
    "first_name": "Maya",
    "last_name": "Chen",
    "age": 32,
    "profession": "Business Consultant",
    "skills": ["Business Strategy", "Project Management", "Operations Optimization"],
    "interests": ["Entrepreneurship", "Business Growth", "Startups", "Innovation"],
    "university": "West Coast Business School"
  },
  {
    "email": "olivia.thompson@example.com",
 "password": "Dhruv@12",
    "first_name": "Olivia",
    "last_name": "Thompson",
    "age": 34,
    "profession": "STEM Educator",
    "skills": ["STEM Education", "Curriculum Development", "Instructional Design"],
    "interests": ["Education", "STEM", "Innovation", "Technology"],
    "university": "National University of Education"
  },
  {
    "email": "isabella.ramirez@example.com",
 "password": "Dhruv@12",
    "first_name": "Isabella",
    "last_name": "Ramirez",
    "age": 29,
    "profession": "Financial Consultant",
    "skills": ["Financial Planning", "Investment Management", "Corporate Finance"],
    "interests": ["Finance", "Investments", "Wealth Management", "Startup Growth"],
    "university": "International Business School"
  },
  {
    "email": "aria.johnson@example.com",
 "password": "Dhruv@12",
    "first_name": "Aria",
    "last_name": "Johnson",
    "age": 31,
    "profession": "Multimedia Producer",
    "skills": ["Content Creation", "Video Editing", "Digital Marketing"],
    "interests": ["Media Production", "Storytelling", "Marketing", "Video Editing"],
    "university": "California Arts Academy"
  },
  {
    "email": "fatima.ali@example.com",
 "password": "Dhruv@12",
    "first_name": "Fatima",
    "last_name": "Ali",
    "age": 28,
    "profession": "Legal Consultant",
    "skills": ["Corporate Law", "Intellectual Property", "Legal Research"],
    "interests": ["Law", "Corporate Strategy", "Policy Analysis", "Mediation"],
    "university": "Harvard Law School"
  },
  {
    "email": "charlotte.nguyen@example.com",
 "password": "Dhruv@12",
    "first_name": "Charlotte",
    "last_name": "Nguyen",
    "age": 35,
    "profession": "Art Curator",
    "skills": ["Art Curation", "Art History Research", "Digital Art Creation"],
    "interests": ["Art", "Exhibitions", "History", "Cultural Events"],
    "university": "University of Arts and Culture"
  },
  {
    "email": "amara.singh@example.com",
 "password": "Dhruv@12",
    "first_name": "Amara",
    "last_name": "Singh",
    "age": 34,
    "profession": "Healthcare Administrator",
    "skills": ["Healthcare Management", "Health Informatics", "Clinical Data Analysis"],
    "interests": ["Healthcare Policy", "Patient Care", "Operations Management"],
    "university": "Global Health Institute"
  },
  {
    "email": "nina.choi@example.com",
 "password": "Dhruv@12",
    "first_name": "Nina",
    "last_name": "Choi",
    "age": 29,
    "profession": "Mechanical Engineer",
    "skills": ["Renewable Energy Systems", "Mechanical Design", "Product Lifecycle Management"],
    "interests": ["Engineering", "Sustainability", "Renewable Energy", "Innovation"],
    "university": "Tech University"
  },
  {
    "email": "eva.wilson@example.com",
 "password": "Dhruv@12",
    "first_name": "Eva",
    "last_name": "Wilson",
    "age": 33,
    "profession": "Instructional Designer",
    "skills": ["Instructional Design", "Online Learning Facilitation", "Curriculum Development"],
    "interests": ["Education", "E-Learning", "Technology Integration", "Professional Development"],
    "university": "National University"
  },
  {
    "email": "sophia.wang@example.com",
 "password": "Dhruv@12",
    "first_name": "Sophia",
    "last_name": "Wang",
    "age": 30,
    "profession": "Fashion Designer",
    "skills": ["Fashion Design", "Product Design", "Sustainable Practices"],
    "interests": ["Design", "Fashion", "Sustainability", "Entrepreneurship"],
    "university": "International Design Institute"
  },
  {
    "email": "layla.kim@example.com",
 "password": "Dhruv@12",
    "first_name": "Layla",
    "last_name": "Kim",
    "age": 27,
    "profession": "Public Relations Expert",
    "skills": ["Public Relations", "Media Strategy", "Brand Storytelling"],
    "interests": ["Media", "Marketing", "Public Speaking", "Brand Development"],
    "university": "Media University"
  },
  {
    "email": "zara.ahmed@example.com",
    "password": "Dhruv@12",
    "first_name": "Zara",
    "last_name": "Ahmed",
    "age": 31,
    "profession": "Blockchain Developer",
    "skills": ["Blockchain Development", "Smart Contracts", "Cybersecurity Analysis"],
    "interests": ["Blockchain", "Finance", "Technology", "Innovation"],
    "university": "Blockchain Technology Institute"
  }
]


def add_users():
    headers = {
        "X-API-Key": "dvrocks",
        "Content-Type": "application/json"
    }
    for user in users:
        try:
            response = requests.post("https://t76o3w4uot5gt3ebqio6u4b7jm0nvwfg.lambda-url.us-east-1.on.aws/api/v1/auth/signup", json=user, headers=headers)
            response.raise_for_status()  # Raise an exception for HTTP errors
            print(f"Successfully added user: {user['email']}")
        except requests.exceptions.RequestException as e:
            print(f"Failed to add user: {user['email']}\nError: {e}")

add_users()