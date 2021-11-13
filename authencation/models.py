from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.utils import timezone

# Create your models here.
class Users(AbstractUser):
    username_validator = UnicodeUsernameValidator()

    username = models.CharField(
        _('username'),
        max_length=40,
        unique=True,
        help_text=_('Required. 40 characters or fewer. Letters, digits and @/./+/-/_ only.'),
        validators=[username_validator],
        error_messages={
            'unique': _("A user with that username already exists."),
        },
    )
    first_name = None
    last_name = None

    password = models.CharField(max_length=100)
    nickname = models.CharField(_('Nickname'), max_length=100, unique=True)
    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)

    def __str__(seft):
        return seft.username
