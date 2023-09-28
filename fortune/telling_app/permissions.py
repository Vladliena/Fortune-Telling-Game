from rest_framework import permissions

# class IsAuthenticatedUser(permissions.BasePermission):
#     def has_permission(self,request,view): 
#         if request.method in ['GET', 'POST']:
#             return True
        
#     def has_object_permission(self, request, view, obj):
#         if request.method == 'DELETE':
#          return True