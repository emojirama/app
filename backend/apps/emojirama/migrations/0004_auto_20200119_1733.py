# Generated by Django 2.2 on 2020-01-19 17:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('emojirama', '0003_auto_20200118_2116'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='emojirama',
            options={'ordering': ('-created_on',)},
        ),
    ]
