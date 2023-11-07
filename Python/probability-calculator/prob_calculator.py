import copy
import random
# Consider using the modules imported above.

class Hat:
    def __init__(self, **args):
        self.keys=args
        self.contents = []
        for x in args:
            for i in range(args[x]):
                self.contents.append(x)


    def draw(self, items_drawn):
        result = []
        if items_drawn > len(self.contents) or len(self.contents)==0: return self.contents
        for x in range(items_drawn):
            selection = random.choice(self.contents)
            result.append(selection)
            self.contents.remove(selection)
        return result


def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
    successes = 0
    expected_single_colors = tuple(color for color in expected_balls)

    for _ in range(num_experiments):
        copy_hat = copy.deepcopy(hat)
        drawn_balls = copy_hat.draw(num_balls_drawn)
        num_fulfilled_colors = 0

        for color in expected_single_colors:

          if drawn_balls.count(color) >= expected_balls[color]:
              num_fulfilled_colors += 1


          if num_fulfilled_colors == len(expected_single_colors):
              successes += 1

    probability = successes / num_experiments
    return probability




