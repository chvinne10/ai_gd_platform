from django.db import models
from django.conf import settings

class DiscussionSession(models.Model):
    # Links to the User table
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    topic = models.TextField()
    transcript = models.TextField(null=True, blank=True)
    behavior_score = models.IntegerField(default=0)
    grammar_score = models.IntegerField(default=0)
    # Stores the path to the PDF generated at the end
    report_file = models.FileField(upload_to='reports/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - {self.topic[:20]}"