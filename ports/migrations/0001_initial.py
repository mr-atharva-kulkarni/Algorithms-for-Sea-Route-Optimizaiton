# Generated by Django 3.0.6 on 2020-06-11 22:55

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='NavalPort',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('world_port_index', models.IntegerField()),
                ('main_port_name', models.CharField(max_length=100)),
                ('wpi_country', models.CharField(max_length=100)),
                ('region', models.CharField(max_length=100)),
                ('lat', models.FloatField()),
                ('lon', models.FloatField()),
            ],
        ),
    ]
