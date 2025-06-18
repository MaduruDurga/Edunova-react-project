from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import firebase_admin
from firebase_admin import credentials 
from firebase_admin import auth as firebase_auth
cred = credentials.Certificate("C:/Users/HP/OneDrive/Desktop/pythonFullstack/backend/project/firebasesdk.json") 
firebase_admin.initialize_app(cred)


@csrf_exempt
def loginview(request):
    if request.method == "POST":
        try:
            # Get Authorization header
            auth_header = request.headers.get('Authorization')
            if not auth_header or not auth_header.startswith('Bearer '):
                return JsonResponse({"err": "Authorization header missing or invalid"}, status=400)

            id_token = auth_header.split(' ')[1]

            # Verify Firebase token
            decoded_token = firebase_auth.verify_id_token(id_token)
            uid = decoded_token['uid']
            email = decoded_token.get('email')

            # Check if user exists in your DB, create if not
            from .models import Student
            user, created = Student.objects.get_or_create(email=email, defaults={
                'username': email.split('@')[0],  # default username from email prefix
                'password': ''  # no password because auth is via Firebase
            })

            return JsonResponse({"succ": "Login successful", "name": user.username, "uid": uid}, status=200)

        except firebase_admin.exceptions.FirebaseError as e:
            return JsonResponse({"err": "Invalid token", "details": str(e)}, status=401)
        except Exception as e:
            return JsonResponse({"err": "Server error: " + str(e)}, status=500)
    else:
        return JsonResponse({"err": "Invalid request method"}, status=405)
