# Generated by Django 3.2.9 on 2021-11-21 10:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('image', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='image',
            name='title',
            field=models.CharField(max_length=255, null=True, unique=True),
        ),
    ]