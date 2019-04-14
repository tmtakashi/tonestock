class GearMapper:
    def __init__(self, obj):
        self.obj = obj

    def as_dict(self):
        return {
            "pk": self.obj.pk,
            "name": self.obj.name,
            "brand": self.obj.brand,
            "type": self.obj.type
        }
