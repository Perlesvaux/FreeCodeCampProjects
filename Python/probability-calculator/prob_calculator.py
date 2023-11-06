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

        self.reserve = copy.copy(self.contents)

    # def draw(self, items_drawn):
    #     result = []
    #     pseudo_hat = copy.copy(self.contents)
    #     # random.shuffle(pseudo_hat)
    #     if items_drawn > len(pseudo_hat): items_drawn=len(pseudo_hat)
    #     for x in range(items_drawn):
    #         selection = random.choice(pseudo_hat)
    #         result.append(selection)
    #         pseudo_hat.remove(selection)
    #     return result

    def draw(self, items_drawn):
        result = []
        if items_drawn > len(self.contents) or len(self.contents)==0: return self.reserve
        pseudo_hat = self.contents
        # if items_drawn > len(pseudo_hat): items_drawn=len(pseudo_hat)
        for x in range(items_drawn):
            selection = random.choice(pseudo_hat)
            result.append(selection)
            pseudo_hat.remove(selection)
        return result


def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
    expected = []
    for x in expected_balls:
        for i in range(expected_balls[x]):
            expected.append(x)
    # print(expected)
    # print(hat.reserve)

    expected_hand=set(expected)
    success = 0
    for x in range(num_experiments):
        pseudo_hat=copy.deepcopy(hat)
        drawn = pseudo_hat.draw(num_balls_drawn)
        hand = set(drawn)
        # hand = set(hat.draw(num_balls_drawn))
        # print(f"{hand} should be {expected_hand}")
        print(f"{hand} -> {expected_hand} | {drawn}")
        if  expected_hand.issubset(hand):
            success+=1


    print(f"{success} -> {num_experiments}")
    print(len(hat.contents))
    return ( num_experiments/success )






