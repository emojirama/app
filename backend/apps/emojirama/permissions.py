from rest_framework import permissions


class EmojiramaPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        if view.action == "list_emojiramas":
            return True

        if view.action == "get":
            return True

        return True

    # def has_permission(self, request, view):
    #     if view.action == 'list':
    #         return request.user.is_authenticated() and request.user.is_admin
    #     elif view.action == 'create':
    #         return True
    #     elif view.action in ['retrieve', 'update', 'partial_update', 'destroy']:
    #         return True
    #     else:
    #         return False

    def has_object_permission(self, request, view, obj):
        # Deny actions on objects if the user is not authenticated

        if view.action == "delete":
            return obj.owner == request.user

        if view.action == "get":
            return True

        if view.action == "save":
            return True

        return False
        # if not request.user.is_authenticated():
        #     return False

        # if view.action == "retrieve":
        #     return obj == request.user or request.user.is_admin
        # elif view.action in ["update", "partial_update"]:
        #     return obj == request.user or request.user.is_admin
        # elif view.action == "destroy":
        #     return request.user.is_admin
        # else:
        #     return False
