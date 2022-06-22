from rest_framework import filters


class MyTaskFilter(filters.BaseFilterBackend):

    def filter_queryset(self, request, queryset, view):
        return queryset.filter(user=request.user)
