from django.urls import path
from base.views import users_views as views


urlpatterns = [
    path("", views.getUsers, name="users"),
    path(
        "login",
        views.MyTokenObtainPairView.as_view(),
        name="token_obtain_pair",
    ),
    path("register", views.registerUser, name="register"),
    path("profile", views.getUserProfile, name="user_profile"),
    path("profile/update", views.updateUser, name="user_profile_update"),
    path("<int:pk>", views.getUserById, name="user"),
    path("delete/<int:pk>", views.deleteUser, name="delete_user"),
    path("update/<int:pk>", views.updateUserById, name="update_user"),
]