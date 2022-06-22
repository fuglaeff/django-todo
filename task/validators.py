from django.core.exceptions import ValidationError
from datetime import datetime


def plan_comp_date_validator(value: datetime) -> None:
    clean_dt = value.replace(tzinfo=None)
    if clean_dt <= datetime.now():
        raise ValidationError('planned completion date must be later, than task created date.')
