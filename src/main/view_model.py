class GearMapper:
    def __init__(self, obj):
        self.obj = obj

    def as_dict(self):
        return {
            "name": self.obj.name,
            "brand": self.obj.brand,
            "type": self.obj.type
        }
