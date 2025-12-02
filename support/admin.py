from django.contrib import admin
from .models import Ticket, TicketReply, UserQuestion

admin.site.register(Ticket)
admin.site.register(TicketReply)
admin.site.register(UserQuestion)
