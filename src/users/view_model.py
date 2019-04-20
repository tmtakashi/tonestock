import base64


class ProfileMapper:
    def __init__(self, obj):
        self.obj = obj

    def as_dict(self):
        return {
            "pk": self.obj.pk,
            "username": self.obj.username,
            "image_url": self.obj.image.url,
        }
