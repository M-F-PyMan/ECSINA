def security_headers(get_response):
    def middleware(request):
        response = get_response(request)
        response['X-Frame-Options'] = 'DENY'
        response['X-Content-Type-Options'] = 'nosniff'
        response['Referrer-Policy'] = 'strict-origin-when-cross-origin'
        response['Strict-Transport-Security'] = 'max-age=63072000; includeSubDomains'
        return response
    return middleware
