class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def set_width(self, size):
        self.width = size

    def set_height(self, size):
        self.height = size

    def get_area(self):
        return self.width * self.height

    def get_perimeter(self):
        return 2 * self.width + 2 * self.height

    def get_diagonal(self):
        return (self.width ** 2 + self.height ** 2) ** .5

    def get_picture(self):
        if self.width>50: return "Too big for picture."
        return ("*"*self.width + "\n")*self.height

    def get_amount_inside(self, rectangle):
        return self.get_area()//rectangle.get_area()

    def __str__(self):
        return f"Rectangle(width={self.width}, height={self.height})"






class Square (Rectangle):
    def __init__(self, side):
        super().__init__(side, side)

    def set_side(self, size):
        self.width  = size
        self.height = size

    def __str__(self):
        return f"Square(side={self.width})"

