from django.contrib import admin
from .models import Ticket, TicketReply, UserQuestion,About,AboutFeature

admin.site.register(Ticket)
admin.site.register(TicketReply)
admin.site.register(UserQuestion)
admin.site.register(AboutFeature)
admin.site.register(About)
