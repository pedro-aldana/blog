# Generated by Django 3.2.16 on 2023-07-31 14:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0002_post_author'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='url',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]
