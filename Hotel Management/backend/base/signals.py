from django.db.models.signals import pre_save
from django.contrib.auth.models import User

def updateUser(sender, instance, **kwargs):
    user = instance
    if user.email != '':
        user.username = user.email
    print('SIgnal Triggered')

'''
When the user model is saved pre-saved(before it is saved)
go ahead and fire updateUser function
'''
pre_save.connect(updateUser ,sender=User)