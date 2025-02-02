import requests

users_to_update = [
    {
        "email": "emma.robinson@example.com",
        "updates": {
            "phone_number": "+12025550123",
            "bio": "AI specialist developing innovative machine learning models.",
            "coins": 50000,
            "location": "Seattle, WA",
            "profile_image_path": "/emma.png"
        }
    },
    {
        "email": "sophia.martinez@example.com",
        "updates": {
            "phone_number": "+12125550345",
            "bio": "Creative lead focused on user-centric digital experiences.",
            "coins": 45000,
            "location": "New York, NY",
            "profile_image_path": "/sophia.png"
        }
    },
    {
        "email": "aisha.patel@example.com",
        "updates": {
            "phone_number": "+12225550456",
            "bio": "Healthcare data scientist optimizing patient care through data-driven solutions.",
            "coins": 42000,
            "location": "Chicago, IL",
            "profile_image_path": "/aisha.png"
        }
    },
    {
        "email": "maya.chen@example.com",
        "updates": {
            "phone_number": "+13335550678",
            "bio": "Business consultant empowering startups to scale and thrive.",
            "coins": 53000,
            "location": "Los Angeles, CA",
            "profile_image_path": "/maya.png"
        }
    },
    {
        "email": "olivia.thompson@example.com",
        "updates": {
            "phone_number": "+14445550789",
            "bio": "STEM educator promoting hands-on, innovative learning for future leaders.",
            "coins": 41000,
            "location": "Boston, MA",
            "profile_image_path": "/olivia.png"
        }
    },
    {
        "email": "isabella.ramirez@example.com",
        "updates": {
            "phone_number": "+15555550910",
            "bio": "Expert in financial planning and investment strategies for startups.",
            "coins": 47000,
            "location": "Miami, FL",
            "profile_image_path": "/isabella.png"
        }
    },
    {
        "email": "aria.johnson@example.com",
        "updates": {
            "phone_number": "+12125551234",
            "bio": "Creative multimedia producer with a passion for brand storytelling.",
            "coins": 38000,
            "location": "San Diego, CA",
            "profile_image_path": "/aria.png"
        }
    },
    {
        "email": "fatima.ali@example.com",
        "updates": {
            "phone_number": "+12225551345",
            "bio": "Legal consultant specializing in intellectual property and corporate law.",
            "coins": 46000,
            "location": "Cambridge, MA",
            "profile_image_path": "/fatima.png"
        }
    },
    {
        "email": "charlotte.nguyen@example.com",
        "updates": {
            "phone_number": "+13335551456",
            "bio": "Art curator passionate about promoting local and international artists.",
            "coins": 49000,
            "location": "San Francisco, CA",
            "profile_image_path": "/charlotte.png"
        }
    },
    {
        "email": "amara.singh@example.com",
        "updates": {
            "phone_number": "+14445551567",
            "bio": "Healthcare administrator ensuring smooth and efficient clinical operations.",
            "coins": 51000,
            "location": "Dallas, TX",
            "profile_image_path": "/amara.png"
        }
    },
    {
        "email": "nina.choi@example.com",
        "updates": {
            "phone_number": "+15555551678",
            "bio": "Mechanical engineer focused on renewable energy systems and sustainability.",
            "coins": 42000,
            "location": "Austin, TX",
            "profile_image_path": "/nina.png"
        }
    },
    {
        "email": "eva.wilson@example.com",
        "updates": {
            "phone_number": "+16665551789",
            "bio": "Instructional designer creating immersive online learning experiences.",
            "coins": 46000,
            "location": "Phoenix, AZ",
            "profile_image_path": "/eva.png"
        }
    },
    {
        "email": "sophia.wang@example.com",
        "updates": {
            "phone_number": "+17775551890",
            "bio": "Fashion designer specializing in sustainable and ethical fashion practices.",
            "coins": 53000,
            "location": "New York, NY",
            "profile_image_path": "/sophiawang.png"
        }
    },
    {
        "email": "layla.kim@example.com",
        "updates": {
            "phone_number": "+18885551901",
            "bio": "Public relations expert helping brands enhance their media presence.",
            "coins": 39000,
            "location": "Atlanta, GA",
            "profile_image_path": "/layla.png"
        }
    },
    {
        "email": "zara.ahmed@example.com",
        "updates": {
            "phone_number": "+19995552012",
            "bio": "Blockchain developer working on decentralized finance (DeFi) solutions.",
            "coins": 48000,
            "location": "Denver, CO",
            "profile_image_path": "/zara.png"
        }
    }
]
def update_users():
    headers = {
        "X-API-Key": "dvrocks",
        "Content-Type": "application/json"
    }
    for user in users_to_update:
        try:
            response = requests.patch(f"https://t76o3w4uot5gt3ebqio6u4b7jm0nvwfg.lambda-url.us-east-1.on.aws/api/v1/users/{user['email']}", json=user["updates"], headers=headers)
            response.raise_for_status()  # Raise an exception for HTTP errors
            print(f"Successfully updated user: {user['email']}")
        except requests.exceptions.RequestException as e:
            print(f"Failed to add user: {user['email']}\nError: {e}")

update_users()