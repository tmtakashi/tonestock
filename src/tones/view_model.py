class ToneMapper:
    def __init__(self, obj):
        self.obj = obj

    def as_dict(self):
        return {
            "pk": self.obj.pk,
            "author": self.obj.author.profile.username,
            "name": self.obj.info['name']
        }
