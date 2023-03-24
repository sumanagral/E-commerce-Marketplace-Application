from django.conf import settings
from django.core.exceptions import PermissionDenied
from google.oauth2 import id_token
from google.auth.transport.requests import Request


class JWTValidateMiddleware:

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request, *args, **kwargs):
        try:
            auth_header = request.headers.get('Authorization')
            if auth_header:
                try:
                    auth_token = auth_header.split(" ")[1]
                except IndexError:
                    raise PermissionDenied()
            else:
                auth_token = ''
            if auth_token != "":
                # Specify the CLIENT_ID of the app that accesses the backend:
                info = id_token.verify_oauth2_token(auth_token, Request(),settings.CLIENT_ID)
                request.user_id = info['sub']
                request.user_name = info['name']
        except ValueError as e:
            # Invalid token
            print(e)
            pass
        return self.get_response(request)
