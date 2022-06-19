from django.core.exceptions import ValidationError
from datetime import datetime


def plan_comp_date_validator(value: datetime) -> None:
    print(value, 'and', datetime.now())
    if value <= datetime.now():
        raise ValidationError('planned completion date must be later, than task created date.')
