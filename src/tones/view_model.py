class ToneMapper:
    def __init__(self, obj):
        self.obj = obj

    def as_dict(self):
        return {
            "pk": self.obj.pk,
            "author": self.obj.author.profile.username,
            "name": self.obj.info['name']
        }


class CommentMapper:
    def __init__(self, obj):
        self.obj = obj

    def as_dict(self):
        return {
            "username": self.obj.profile.username,
            "text": self.obj.text,
            "pk": self.obj.pk
        }
