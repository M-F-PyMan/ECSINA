from django.contrib import admin
from .models import Ticket, TicketReply

admin.site.register(Ticket)
admin.site.register(TicketReply)
