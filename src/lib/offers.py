import requests

# Define your API endpoint and API key
API_URL = "https://t76o3w4uot5gt3ebqio6u4b7jm0nvwfg.lambda-url.us-east-1.on.aws/api/v1/offers"
API_KEY = "your_api_key_here"

offers = [
    {
        "email": "mary@gmail.com",
        "title": "Full Stack Web Development Course",
        "detail": "Get a one-hour consultation on Typescript.",
        "skill": "Full Stack Web Development",
        "pointCost": 4100,
        "duration": 120
    },
     {
        "email": "mary@gmail.com",
        "title": "Cooking Course",
        "detail": "Hello Queens! Come here for your all inclusive chocolate making!",
        "skill": "Cooking",
        "pointCost": 1100,
        "duration": 90
    },
]

# Offer data with emails instead of userId
_offers = [
    {
        "email": "emma.robinson@example.com",
        "title": "AI Model Training Consultation",
        "detail": "Get a one-hour consultation on training AI models with Python and TensorFlow.",
        "skill": "Machine Learning Engineering",
        "pointCost": 300,
        "duration": 60
    },
    {
        "email": "sophia.martinez@example.com",
        "title": "UX Design Review",
        "detail": "I'll provide a comprehensive UX design review for your website or application.",
        "skill": "UI/UX Design",
        "pointCost": 250,
        "duration": 45
    },
    {
        "email": "aisha.patel@example.com",
        "title": "Healthcare Data Analysis",
        "detail": "Get insights into your healthcare data with a custom analysis report.",
        "skill": "Data Science",
        "pointCost": 400,
        "duration": 90
    },
    {
        "email": "maya.chen@example.com",
        "title": "Startup Growth Strategy Session",
        "detail": "Discuss strategies to scale and grow your startup in a competitive market.",
        "skill": "Business Strategy",
        "pointCost": 500,
        "duration": 60
    },
    {
        "email": "olivia.thompson@example.com",
        "title": "STEM Lesson Planning",
        "detail": "I'll help you design a STEM-focused lesson plan for middle or high school students.",
        "skill": "Curriculum Development",
        "pointCost": 200,
        "duration": 45
    },
    {
        "email": "sophia.martinez@example.com",
        "title": "Custom Logo Design",
        "detail": "Create a unique, high-quality logo for your brand or business.",
        "skill": "Graphic Design",
        "pointCost": 350,
        "duration": 120
    },
    {
        "email": "emma.robinson@example.com",
        "title": "Cloud Infrastructure Setup",
        "detail": "Assistance with setting up cloud infrastructure on AWS or Azure.",
        "skill": "Cloud Architecture",
        "pointCost": 450,
        "duration": 120
    },
    {
        "email": "aisha.patel@example.com",
        "title": "Data Visualization Report",
        "detail": "I'll create detailed visualizations from your raw data using Tableau or Power BI.",
        "skill": "Data Visualization",
        "pointCost": 300,
        "duration": 60
    },
    {
        "email": "olivia.thompson@example.com",
        "title": "Online STEM Workshop",
        "detail": "Host an online interactive workshop focusing on STEM education for students.",
        "skill": "STEM Education",
        "pointCost": 600,
        "duration": 90
    },
    {
        "email": "maya.chen@example.com",
        "title": "Leadership Development Coaching",
        "detail": "One-on-one coaching session to improve your leadership and team management skills.",
        "skill": "Leadership Development",
        "pointCost": 550,
        "duration": 75
    },
    {
        "email": "isabella.ramirez@example.com",
        "title": "Startup Financial Planning",
        "detail": "A one-hour session on creating financial strategies and investment plans for startups.",
        "skill": "Financial Planning",
        "pointCost": 400,
        "duration": 60
    },
    {
        "email": "aria.johnson@example.com",
        "title": "Video Editing Workshop",
        "detail": "Learn advanced video editing techniques to improve your content creation.",
        "skill": "Video Editing",
        "pointCost": 300,
        "duration": 90
    },
    {
        "email": "fatima.ali@example.com",
        "title": "Intellectual Property Consultation",
        "detail": "Get expert advice on protecting your intellectual property through legal strategies.",
        "skill": "Intellectual Property",
        "pointCost": 500,
        "duration": 60
    },
    {
        "email": "charlotte.nguyen@example.com",
        "title": "Art History Insights",
        "detail": "Join a discussion on key movements and trends in global art history.",
        "skill": "Art History Research",
        "pointCost": 250,
        "duration": 75
    },
    {
        "email": "amara.singh@example.com",
        "title": "Healthcare Operations Consulting",
        "detail": "A consultation session to optimize operations in clinical or hospital settings.",
        "skill": "Healthcare Management",
        "pointCost": 550,
        "duration": 90
    },
    {
        "email": "nina.choi@example.com",
        "title": "Sustainable Energy Design",
        "detail": "An engineering workshop focused on renewable energy system design and integration.",
        "skill": "Renewable Energy Systems",
        "pointCost": 600,
        "duration": 120
    },
    {
        "email": "eva.wilson@example.com",
        "title": "Online Course Development",
        "detail": "Assistance with designing an engaging and interactive online course.",
        "skill": "Instructional Design",
        "pointCost": 350,
        "duration": 90
    },
    {
        "email": "sophia.wang@example.com",
        "title": "Sustainable Fashion Strategy",
        "detail": "Learn how to implement sustainable practices in fashion design and production.",
        "skill": "Sustainable Practices",
        "pointCost": 400,
        "duration": 60
    },
    {
        "email": "layla.kim@example.com",
        "title": "Public Relations Strategy Session",
        "detail": "Develop a custom public relations strategy to enhance your brand's media presence.",
        "skill": "Public Relations",
        "pointCost": 450,
        "duration": 60
    },
    {
        "email": "zara.ahmed@example.com",
        "title": "Blockchain Smart Contracts Workshop",
        "detail": "A hands-on workshop to help you create and deploy smart contracts on the blockchain.",
        "skill": "Smart Contracts",
        "pointCost": 500,
        "duration": 120
    }
]

# Function to create offers via POST request
def create_offers():
    headers = {
        "X-API-Key": "dvrocks",
        "Content-Type": "application/json"
    }

    for offer in offers:
        try:
            response = requests.post(API_URL, json=offer, headers=headers)
            response.raise_for_status()
            print(f"Successfully created offer: {offer['title']} by {offer['email']}")
        except requests.exceptions.RequestException as e:
            print(f"Failed to create offer: {offer['title']} by {offer['email']}\nError: {e}")

# Run the function
if __name__ == "__main__":
    create_offers()
